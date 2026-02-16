import express from "express";
import { upload } from "../middlewares/upload.js";
import { getBannerImageLink } from "../controllers/uploadsController.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = express.Router();

router
  .route("/banner")
  .post(requireRole("ADMIN"), upload.single("image"), getBannerImageLink);

export default router;
