import multer from "multer";
import { randomBytes } from "crypto";
import { resolve } from "path";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (req, file, cb) => {
          const fileHash = randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    };
  },
};
