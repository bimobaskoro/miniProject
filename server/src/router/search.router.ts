import { Router } from "express";
import searchController from "../controller/search.controller";

class SearchRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.intializedRoutes();
  }

  intializedRoutes() {
    this.router.get("/", searchController.Search);
  }
  getRouter() {
    return this.router;
  }
}

export default new SearchRouter();
