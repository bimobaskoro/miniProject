import { Request } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

class SearchService {
  async Search(req: Request) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    if (!title) {
      throw new Error("Title parameter is required");
    }

    try {
      return await prisma.event.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });
    } catch (error) {
      throw new Error("cant get title");
    }
  }
}

export default new SearchService();
