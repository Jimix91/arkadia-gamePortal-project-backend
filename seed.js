const mongoose = require("mongoose");
const Game = require("./models/Games.model");
require("dotenv").config();

const gamesData = [
  {
    title: "The Legend of Zelda: Breath of the Wild",
    developer: "Nintendo",
    year: 2017,
    platforms: ["Switch"],
    description: "Un juego de aventura épico en mundo abierto donde podrás explorar, resolver acertijos y enfrentarte a desafíos legendarios.",
    image: "https://placehold.co/300x400?text=Zelda+BoTW&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Elden Ring",
    developer: "FromSoftware",
    year: 2022,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Un RPG de acción desafiante con un mundo abierto vasto lleno de secretos y enemigos formidables.",
    image: "https://placehold.co/300x400?text=Elden+Ring&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Cyberpunk 2077",
    developer: "CD Projekt Red",
    year: 2020,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Un juego de rol de acción futurista ambientado en la megaciudad de Night City.",
    image: "https://placehold.co/300x400?text=Cyberpunk+2077&bg=ffcc00&textbg=050609"
  },
  {
    title: "Baldur's Gate 3",
    developer: "Larian Studios",
    year: 2023,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un RPG épico basado en Dungeons & Dragons con historias ramificadas y decisiones que importan.",
    image: "https://placehold.co/300x400?text=Baldurs+Gate+3&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Final Fantasy XVI",
    developer: "Square Enix",
    year: 2023,
    platforms: ["PS5"],
    description: "Un JRPG épico con sistemas de combate dinámicos y una historia cinematográfica espectacular.",
    image: "https://placehold.co/300x400?text=Final+Fantasy+XVI&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Starfield",
    developer: "Bethesda",
    year: 2023,
    platforms: ["Xbox", "PC"],
    description: "Un RPG de exploración espacial con una galaxia vasta para descubrir y cientos de planetas.",
    image: "https://placehold.co/300x400?text=Starfield&bg=ffcc00&textbg=050609"
  },
  {
    title: "Hogwarts Legacy",
    developer: "Avalanche Software",
    year: 2023,
    platforms: ["PS5", "PS4", "Xbox", "PC", "Switch"],
    description: "Un RPG inmersivo ambientado en el mundo de Harry Potter donde vives tu propia historia en Hogwarts.",
    image: "https://placehold.co/300x400?text=Hogwarts+Legacy&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Spider-Man 2",
    developer: "Insomniac Games",
    year: 2023,
    platforms: ["PS5"],
    description: "Un juego de acción superheroico con mecánicas de swinging innovadoras en Nueva York.",
    image: "https://placehold.co/300x400?text=Spider-Man+2&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Alan Wake 2",
    developer: "Remedy Entertainment",
    year: 2023,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un thriller psicológico con una narrativa ramificada y atmósfera oscura.",
    image: "https://placehold.co/300x400?text=Alan+Wake+2&bg=ffcc00&textbg=050609"
  },
  {
    title: "Armored Core VI",
    developer: "FromSoftware",
    year: 2023,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Un juego de acción de robots gigantes con mecánicas de combate profundas.",
    image: "https://placehold.co/300x400?text=Armored+Core+VI&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Tekken 8",
    developer: "Bandai Namco",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un juego de lucha competitivo con un sistema de combate refinado y personajes únicos.",
    image: "https://placehold.co/300x400?text=Tekken+8&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Street Fighter 6",
    developer: "Capcom",
    year: 2023,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "El regreso de la icónica serie de luchas con nuevos personajes y mecánicas.",
    image: "https://placehold.co/300x400?text=Street+Fighter+6&bg=ffcc00&textbg=050609"
  },
  {
    title: "Persona 5 Royal",
    developer: "Atlus",
    year: 2019,
    platforms: ["PS4", "PC", "Switch", "Xbox"],
    description: "Un JRPG con elementos de simulación social y combates por turnos envolventes.",
    image: "https://placehold.co/300x400?text=Persona+5+Royal&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Hades",
    developer: "Supergiant Games",
    year: 2020,
    platforms: ["Switch", "PS4", "Xbox", "PC"],
    description: "Un roguelike rápido y adictivo con arte visual impresionante y narración adaptativa.",
    image: "https://placehold.co/300x400?text=Hades&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Hollow Knight: Silksong",
    developer: "Team Cherry",
    year: 2024,
    platforms: ["Switch", "PC"],
    description: "Un metroidvania desafiante con exploración intrincada y combates intensos.",
    image: "https://placehold.co/300x400?text=Hollow+Knight+Silksong&bg=ffcc00&textbg=050609"
  },
  {
    title: "Outer Wilds",
    developer: "Mobius Digital",
    year: 2019,
    platforms: ["PS4", "Xbox", "PC", "Switch"],
    description: "Un juego de exploración y puzzle donde desentrañas los secretos de un sistema solar condenado.",
    image: "https://placehold.co/300x400?text=Outer+Wilds&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Dune: Part Two Game",
    developer: "Funcom",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Una adaptación estratégica del universo de Dune con política, combate y diplomacia.",
    image: "https://placehold.co/300x400?text=Dune+Game&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Like a Dragon: Infinite Wealth",
    developer: "Ryu Ga Gotoku Studio",
    year: 2024,
    platforms: ["PS5", "PS4", "Xbox"],
    description: "Un juego de acción con drama japonés, minijuegos y una narrativa absurda y cautivadora.",
    image: "https://placehold.co/300x400?text=Like+a+Dragon&bg=ffcc00&textbg=050609"
  },
  {
    title: "Final Fantasy VII Rebirth",
    developer: "Square Enix",
    year: 2024,
    platforms: ["PS5"],
    description: "La conclusión de la trilogía remake de FF7 con una escala épica sin precedentes.",
    image: "https://placehold.co/300x400?text=FF7+Rebirth&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Dragon Age: The Veilguard",
    developer: "BioWare",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un RPG de acción con personajes memorables y decisiones que moldean el destino.",
    image: "https://placehold.co/300x400?text=Dragon+Age+Veilguard&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Metaphor: ReFantazio",
    developer: "Atlus",
    year: 2024,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Un JRPG espiritual sucesor de Persona con un sistema de combate innovador.",
    image: "https://placehold.co/300x400?text=Metaphor+ReFantazio&bg=ffcc00&textbg=050609"
  },
  {
    title: "Helldivers 2",
    developer: "Arrowhead Game Studios",
    year: 2024,
    platforms: ["PS5", "PC"],
    description: "Un shooter cooperativo frenético donde luchas contra alienígenas en misiones procedurales.",
    image: "https://placehold.co/300x400?text=Helldivers+2&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Silent Hill 2 Remake",
    developer: "Bloober Team",
    year: 2024,
    platforms: ["PS5", "PC"],
    description: "Un remake del clásico juego de horror psicológico con gráficos modernos.",
    image: "https://placehold.co/300x400?text=Silent+Hill+2&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Indiana Jones and the Great Circle",
    developer: "MachineGames",
    year: 2024,
    platforms: ["Xbox", "PC"],
    description: "Una aventura de acción inmersiva en primera persona como Indiana Jones.",
    image: "https://placehold.co/300x400?text=Indiana+Jones&bg=ffcc00&textbg=050609"
  },
  {
    title: "Stalker 2",
    developer: "GSC Game World",
    year: 2024,
    platforms: ["Xbox", "PC"],
    description: "Un shooter de exploración inmersivo en la Zona de Chernóbil con físicas avanzadas.",
    image: "https://placehold.co/300x400?text=Stalker+2&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Black Myth: Wukong",
    developer: "Game Science",
    year: 2024,
    platforms: ["PS5", "PC"],
    description: "Un souls-like basado en la novela clásica con combates acelerados y visuales espectaculares.",
    image: "https://placehold.co/300x400?text=Black+Myth+Wukong&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Final Fantasy X-2.5",
    developer: "Square Enix",
    year: 2023,
    platforms: ["PS4", "Xbox", "PC"],
    description: "Un RPG clásico remasterizado con un sistema de cambio de clase único.",
    image: "https://placehold.co/300x400?text=FFX&bg=ffcc00&textbg=050609"
  },
  {
    title: "Palworld",
    developer: "Pocketpair",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC", "Switch"],
    description: "Un juego de supervivencia y recolección con criaturas donde construyes tu imperio.",
    image: "https://placehold.co/300x400?text=Palworld&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Unicorn Overlord",
    developer: "Vanillaware",
    year: 2024,
    platforms: ["Switch", "PS5"],
    description: "Una estrategia táctica con arte 2D hermoso y un juego profundo de batallas.",
    image: "https://placehold.co/300x400?text=Unicorn+Overlord&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Prince of Persia: The Lost Crown",
    developer: "Ubisoft Montreal",
    year: 2024,
    platforms: ["Switch", "PS5", "Xbox", "PC"],
    description: "Un metroidvania de acción con parkour fluido y combates cinematográficos.",
    image: "https://placehold.co/300x400?text=Prince+of+Persia&bg=ffcc00&textbg=050609"
  },
  {
    title: "Tekken 8 (Arcade Quest)",
    developer: "Bandai Namco",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "El modo campaña del juego de lucha definitivo con una narrativa cómica.",
    image: "https://placehold.co/300x400?text=Tekken+8+Arcade&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Senua's Saga: Hellblade II",
    developer: "Ninja Theory",
    year: 2024,
    platforms: ["Xbox", "PC"],
    description: "Una aventura de acción con narrativa profunda y diseño de sonido inmersivo.",
    image: "https://placehold.co/300x400?text=Hellblade+II&bg=ffcc00&textbg=050609"
  },
  {
    title: "Dragon's Dogma 2",
    developer: "Capcom",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un RPG de acción con sistemas de magia profundos y exploración vasta.",
    image: "https://placehold.co/300x400?text=Dragons+Dogma+2&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Dave the Diver",
    developer: "Nexon",
    year: 2022,
    platforms: ["PC", "Switch", "Mobile"],
    description: "Un puzzle y aventura casual con una narrativa encantadora sobre buceo.",
    image: "https://placehold.co/300x400?text=Dave+Diver&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Blasphemous 2",
    developer: "The Game Kitchen",
    year: 2023,
    platforms: ["PS5", "PS4", "Xbox", "PC", "Switch"],
    description: "Un metroidvania 2D desafiante con arte gótico impresionante.",
    image: "https://placehold.co/300x400?text=Blasphemous+2&bg=ffcc00&textbg=050609"
  },
  {
    title: "Subnautica 2",
    developer: "Unknown Worlds",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Una aventura de supervivencia submarina con exploración y construcción.",
    image: "https://placehold.co/300x400?text=Subnautica+2&bg=4fd1ff&textbg=050609"
  },
  {
    title: "The Callisto Protocol",
    developer: "Striking Distance",
    year: 2022,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Un survival horror intenso con combate directo y atmósfera claustrofóbica.",
    image: "https://placehold.co/300x400?text=Callisto+Protocol&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Oshi no Ko (Game)",
    developer: "Square Enix",
    year: 2024,
    platforms: ["Switch", "PS4"],
    description: "Un visual novel interactivo basado en el manga de ídol.",
    image: "https://placehold.co/300x400?text=Oshi+no+Ko&bg=ffcc00&textbg=050609"
  },
  {
    title: "Metaphor: ReFantazio - DLC",
    developer: "Atlus",
    year: 2024,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Contenido adicional para el juego de rol épico con nuevos personajes.",
    image: "https://placehold.co/300x400?text=Metaphor+DLC&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Star Wars Outlaws",
    developer: "Massive Entertainment",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un juego de acción aventura ambientado en el universo de Star Wars.",
    image: "https://placehold.co/300x400?text=Star+Wars+Outlaws&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Kena: Bridge of Spirits",
    developer: "Ember Lab",
    year: 2021,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Una aventura de acción con arte visual hermoso y mecánicas de combate intuitivas.",
    image: "https://placehold.co/300x400?text=Kena&bg=ffcc00&textbg=050609"
  },
  {
    title: "Viewfinder",
    developer: "Sad Owl Studios",
    year: 2023,
    platforms: ["PS5", "Xbox", "PC", "Switch"],
    description: "Un puzzle game con mecánicas de fotografía que manipulan la realidad.",
    image: "https://placehold.co/300x400?text=Viewfinder&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Salt and Sacrifice",
    developer: "Ska Studios",
    year: 2022,
    platforms: ["PS5", "PS4", "PC", "Switch"],
    description: "Un roguelike tipo Monster Hunter con combates contra criaturas titánicas.",
    image: "https://placehold.co/300x400?text=Salt+Sacrifice&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Like a Dragon Gaiden: The Man Who Erased His Name",
    developer: "Ryu Ga Gotoku Studio",
    year: 2023,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Un spin-off de la serie con una historia de redención intensa.",
    image: "https://placehold.co/300x400?text=Yakuza+Gaiden&bg=ffcc00&textbg=050609"
  },
  {
    title: "The Thaumaturge",
    developer: "Fool's Theory",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un RPG de acción paranormal con sistemas de magia rituales.",
    image: "https://placehold.co/300x400?text=Thaumaturge&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Enotria: The Last Song",
    developer: "Jyamma Games",
    year: 2024,
    platforms: ["PS5", "Xbox", "PC"],
    description: "Un souls-like con arte estético italiano y mecánicas innovadoras.",
    image: "https://placehold.co/300x400?text=Enotria&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Ultros",
    developer: "Hadoque",
    year: 2024,
    platforms: ["PS5", "Switch", "PC"],
    description: "Un metroidvania onírico con arte visual surrealista y música electrónica.",
    image: "https://placehold.co/300x400?text=Ultros&bg=ffcc00&textbg=050609"
  },
  {
    title: "Chained Echoes",
    developer: "Matthias Linda",
    year: 2023,
    platforms: ["PS4", "Xbox", "PC", "Switch"],
    description: "Un JRPG retro con un sistema de combate profundo y una narrativa épica.",
    image: "https://placehold.co/300x400?text=Chained+Echoes&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Trails of Cold Steel IV",
    developer: "Falcom",
    year: 2021,
    platforms: ["PS4", "PS5", "Xbox", "PC", "Switch"],
    description: "Una aventura JRPG con una historia conectada a franquicias anteriores.",
    image: "https://placehold.co/300x400?text=Cold+Steel+IV&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Persona 3 Reload",
    developer: "Atlus",
    year: 2024,
    platforms: ["PS5", "PS4", "Xbox", "PC"],
    description: "Un remake del clásico JRPG Persona 3 con gráficos modernos.",
    image: "https://placehold.co/300x400?text=Persona+3+Reload&bg=ffcc00&textbg=050609"
  },
  {
    title: "A Space for the Unbound",
    developer: "Mojiken Studio",
    year: 2023,
    platforms: ["PS4", "Xbox", "PC", "Switch"],
    description: "Una aventura indie narrativa ambientada en Indonesia con mecánicas de puzzles.",
    image: "https://placehold.co/300x400?text=Space+Unbound&bg=4fd1ff&textbg=050609"
  },
  {
    title: "Dredge",
    developer: "Team17",
    year: 2023,
    platforms: ["PS5", "PS4", "Xbox", "PC", "Switch"],
    description: "Un juego de horror y pesca con una atmósfera inquietante.",
    image: "https://placehold.co/300x400?text=Dredge&bg=ff4fd8&textbg=050609"
  },
  {
    title: "Tchia",
    developer: "Accidental Queens",
    year: 2023,
    platforms: ["PS5", "PS4", "PC"],
    description: "Una aventura narrativa exploratoria con mecánicas de posesión espiritual.",
    image: "https://placehold.co/300x400?text=Tchia&bg=ffcc00&textbg=050609"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");

    // Limpiar colección existente (opcional)
    await Game.deleteMany({});
    console.log("Colección de juegos limpiada");

    // Insertar juegos
    await Game.insertMany(gamesData);
    console.log(`✅ ${gamesData.length} juegos insertados exitosamente`);

    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al popular la BD:", error);
    process.exit(1);
  }
};

seedDatabase();
