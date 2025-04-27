import multer from "multer";
import path from "path";
import fs from "fs/promises";
import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");

try {
  await fs.access(tempDir);
} catch {
  await fs.mkdir(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now();
    const userId = req.user?.id || "anon";
    const filename = `${userId}_${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif"];

const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(HttpError(400, `.${ext} is not an allowed file type`));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
