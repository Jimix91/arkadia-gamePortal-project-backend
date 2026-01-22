const mongoose = require("mongoose");
const Game = require("./models/Games.model");
const Review = require("./models/Reviews.model");
const User = require("./models/User.model");
require("dotenv").config();

const reviewTexts = [
  "Increíble experiencia, totalmente recomendado. Los gráficos son espectaculares.",
  "Juego adictivo con una narrativa envolvente. Me pasé toda la noche jugando.",
  "Fantástico, superó mis expectativas. Definitivamente uno de los mejores.",
  "Excelente jugabilidad y narrativa. Vale cada peso invertido.",
  "Impresionante en todos los aspectos. Obra maestra del gaming.",
  "Muy entretenido, aunque tiene algunos bugs menores. Aún así, 5 estrellas.",
  "Narrativa profunda con personajes memorables. Emocionante de principio a fin.",
  "Gameplay fluido y desafiante. Perfecto para fans del género.",
  "Un imprescindible en cualquier colección de juegos. Altamente recomendado.",
  "Aventura épica que no te puedes perder. Fantástico.",
  "Gráficos hermosos y mecánicas innovadoras. Simplemente magnífico.",
  "Experiencia inmersiva que te transporta a otro mundo.",
  "Obra de arte interactiva. Definitivamente merece la máxima puntuación.",
  "Juego cautivador con replay value infinito. Adictivo.",
  "Masterpiece. Cada detalle está cuidado perfectamente.",
];

const seedReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");

    // Obtener o crear un usuario demo para las reviews
    let demoUser = await User.findOne({ email: "demo@arkadia.com" });
    if (!demoUser) {
      // Si no existe, buscar cualquier usuario existente
      demoUser = await User.findOne({});
      if (!demoUser) {
        console.error("❌ No hay usuarios en la base de datos. Crea al menos un usuario primero.");
        process.exit(1);
      }
      console.log(`Usando usuario existente: ${demoUser.name} (${demoUser.email})`);
    }

    // Obtener los primeros 10 juegos
    const games = await Game.find().limit(10);
    console.log(`Encontrados ${games.length} juegos para agregar reviews`);

    let totalReviewsAdded = 0;

    // Para cada juego, crear 2-4 reviews aleatorias
    for (const game of games) {
      const numReviews = Math.floor(Math.random() * 3) + 2; // 2-4 reviews por juego
      const ratings = [];

      for (let i = 0; i < numReviews; i++) {
        const rating = 5; // 5 estrellas
        ratings.push(rating);

        const randomText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];

        await Review.create({
          content: randomText,
          rating: rating,
          author: demoUser._id,
          game: game._id
        });
      }

      // Calcular el promedio de ratings
      const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      await Game.findByIdAndUpdate(game._id, { averageRating: averageRating });

      totalReviewsAdded += numReviews;
      console.log(`✅ ${numReviews} reviews añadidas a "${game.title}" (promedio: ${averageRating.toFixed(1)})`);
    }

    console.log(`\n✅ Total: ${totalReviewsAdded} reviews insertadas exitosamente`);

    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al agregar reviews:", error);
    process.exit(1);
  }
};

seedReviews();
