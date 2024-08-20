import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { format } from "date-fns";

export const EventLogger = (message: string, filename: string) => {
  const rootPath = path.join(__dirname, "..", "logs");
  const exists = fs.existsSync(rootPath);
  if (!exists) {
    fs.mkdirSync(path.join(__dirname, "..", "logs"));
  }
  const datetime = format(new Date(), "yyyy-MM-dd H:m:i:ss");
  const newmessage = `[${datetime}] ${message}\n`;
  const filepath = path.join(rootPath, `${filename}.md`);
  fs.writeFileSync(filepath, newmessage, { flag: "a" });
};

export const Logger = async (req: Request, _: Response, next: NextFunction) => {
  const url = req.url;
  const origin = req.headers.origin;
  const method = req.method;
  const message = `Method: ${method} Origin: ${origin} Path: ${url}`;
  EventLogger(message, "reqlog");
  next();
};
