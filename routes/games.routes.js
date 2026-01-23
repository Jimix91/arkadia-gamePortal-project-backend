const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isAdmin } = require("../middleware/admin.middleware");
const Game = require("../models/Games.model");
const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar multer para memoria (no disco)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos de imagen"));
    }
  },
});

// Función helper para subir a Cloudinary
const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "arkadia-games",
        public_id: filename.replace(/\.[^.]+$/, ""),
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

// Helper para parsear plataformas
const parsePlatforms = (platformsRaw) => {
  if (!platformsRaw) return [];
  if (Array.isArray(platformsRaw)) return platformsRaw;

  try {
    const parsed = JSON.parse(platformsRaw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // Ignorar
  }

  return String(platformsRaw)
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
};


router.get("/games", (req, res, next) => {
  const { platform } = req.query;
  
  Game.find()
    .then((games) => {
      if (!platform) {
        res.json(games);
        return;
      }
      
      // Filtrar case-insensitive en memoria
      const filtered = games.filter((game) =>
        game.platforms.some((p) => p.toLowerCase() === platform.toLowerCase())
      );
      res.json(filtered);
    })
    .catch((err) => {
      console.log("Error getting games", err);
      res.status(500).json({ error: "Error getting games" });
    });
});

router.post("/games", isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const platforms = parsePlatforms(req.body.platforms);
    let image = req.body.image || "";

    // Si hay archivo, subirlo a Cloudinary
    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    }

    const newGame = { title, description, platforms, image };

    const gameFromDB = await Game.create(newGame);
    res.status(201).json(gameFromDB);
  } catch (err) {
    console.log("Error create new Game", err);
    res.status(500).json({ error: "Error create new Game" });
  }
});


router.get("/games/:gameId", (req, res, next) => {
  const { gameId } = req.params;

  Game.findById(gameId)
    .then((gameFromDB) => {
      res.json(gameFromDB);
    })
    .catch((err) => {
      console.log("Error getting game ID from DB", err);
      res.status(500).json({ error: "Error getting game ID from DB" });
    });
});


router.put("/games/:gameId", isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { title, description } = req.body;
    const platforms = parsePlatforms(req.body.platforms);
    let image = req.body.image || "";

    // Si hay archivo, subirlo a Cloudinary
    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    }

    const newGame = { title, description, platforms, image };

    const gameFromDB = await Game.findByIdAndUpdate(gameId, newGame, { new: true });
    res.json(gameFromDB);
  } catch (err) {
    console.log("Error updating game ID from DB", err);
    res.status(500).json({ error: "Error updating game ID from DB" });
  }
});


router.delete("/games/:gameId", isAdmin, (req, res, next) => {
  const { gameId } = req.params;

  Game.findByIdAndDelete(gameId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("Error deleting game ID from DB", err);
      res.status(500).json({ error: "Error deleting game ID from DB" });
    });
});

module.exports = router;