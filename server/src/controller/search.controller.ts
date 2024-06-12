import { NextFunction, Request, Response } from "express";
import searchService from "../service/search.service";

export class SearchController {
  async Search(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await searchService.Search(req);
      res.send({
        message: "Search Title Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SearchController();
