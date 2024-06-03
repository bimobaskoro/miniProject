import { Request } from "express";
import multer from "multer";
import { join } from "path";
import fs from "fs";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fileName: string) => void;

export const uploader = (prefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, "../public/imagesEvent");
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

  return multer({ storage });
};

export const uploaderSeat = (prefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, "../public/imagesSeat");
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

  return multer({ storage });
};
