import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { join } from "path";
import fs from "fs";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fileName: string) => void;

const maxSize = 1048576;

const multerConfig: multer.Options = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (file.mimetype.split("/")[0] != "image") {
      return cb(new Error("file type is not image"));
    }

    const fileSize = parseInt(req.headers["content-length"] || "");

    if (fileSize > maxSize) {
      return cb(new Error("max size 1mb"));
    }
    return cb(null, true);
  },
  limits: {
    fileSize: maxSize, //1mb
  },
};

export const uploader = (prefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, "../public/imagesEventpost");
  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback
    ) => {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      // Check if the directory exists, if not create it
      fs.mkdir(destination, { recursive: true }, (err) => {
        if (err) {
          return cb(err, destination);
        }
        cb(null, destination);
      });
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback
    ) => {
      const originalNameParts = file.originalname.split(".");
      const fileExtension = originalNameParts[originalNameParts.length - 1];
      const newFileName = prefix + Date.now() + "." + fileExtension;

      cb(null, newFileName);
    },
  });

  return multer({ storage, ...multerConfig });
};

export const uploaderSeat = (prefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, "../public/imagesSeatpost");
  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback
    ) => {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      // Check if the directory exists, if not create it
      fs.mkdir(destination, { recursive: true }, (err) => {
        if (err) {
          return cb(err, destination);
        }
        cb(null, destination);
      });
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback
    ) => {
      const originalNameParts = file.originalname.split(".");
      const fileExtension = originalNameParts[originalNameParts.length - 1];
      const newFileName = prefix + Date.now() + "." + fileExtension;

      cb(null, newFileName);
    },
  });

  return multer({ storage, ...multerConfig });
};

export const blobUploader = () =>
  multer({
    ...multerConfig,
  });
