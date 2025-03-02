import { Router } from "express";
import multer from "multer";
import uploadConfig from "./lib/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticate } from "./middlewares/isAuthenticate";
import { RecoverPasswordUserController } from "./controllers/user/RecoverPasswordUserController";
import { ResetPasswordUserController } from "./controllers/user/ResetPasswordUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

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

routes.post("/session", new AuthUserController().handle);
routes.get("/me", isAuthenticate, new DetailUserController().handle);
routes.post("/recover-password", new RecoverPasswordUserController().handle);
routes.put("/reset-password/:token", new ResetPasswordUserController().handle);
routes.delete("/delete", isAuthenticate, new DeleteUserController().handle);

routes.post(
  "/category/create",
  isAuthenticate,
  new CreateCategoryController().handle
);

export default routes;
