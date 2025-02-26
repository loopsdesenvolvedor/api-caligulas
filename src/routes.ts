import { Router } from "express";
import multer from "multer";
import uploadConfig from "./lib/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";

const upload = multer(uploadConfig.upload("./uploads"));
// Exemplo para video e imagem - usa se upload.fields([
// { name: "image", maxCount: 1 },
// { name: "video", maxCount: 1 }
//  ])

const routes = Router();

routes.post(
  "/users",
  upload.single("avatar"),
  new CreateUserController().handle
);

export default routes;
