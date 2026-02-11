import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event_images",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});
