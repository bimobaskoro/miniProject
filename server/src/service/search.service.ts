import { Request } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

class SearchService {
  async Search(req: Request) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

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
