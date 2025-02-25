import { Router } from "express";
import multer from "multer";
import uploadConfig from "./lib/multer";

const upload = multer(uploadConfig.upload("./uploads"));
// Exemplo para video e imagem - usa se upload.fields([
// { name: "image", maxCount: 1 },
// { name: "video", maxCount: 1 }
//  ])

const routes = Router();

export default routes;
