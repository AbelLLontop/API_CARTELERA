import { Request, Response } from "express";
import { serviceScrapper } from "@services/Scrapper/index";

export class APIController {
  getlistchains = async (req: Request, res: Response) => {
    const data = await serviceScrapper.getlistchains();
    res.json(data);
  };
  getDetailchains = async (req: Request, res: Response) => {
    try {
      const { chainId } = req.params;
      const data = await serviceScrapper.getDetailchains(chainId);
      res.json(data);
    } catch (e) {
      console.log("error");
      res.status(401).send({ message: "Error" });
    }
  };
  getDetailCinema = async (req: Request, res: Response) => {
    try {
      const { cinemaId } = req.params;
      const data = await serviceScrapper.getDetailCinema(cinemaId);
      res.json(data);
    } catch (e) {
      console.log("error");
      res.status(401).send({ message: "Error" });
    }
  };
  getDetailMovie = async (req: Request, res: Response) => {
    try {
      const { movieId } = req.params;
      const data = await serviceScrapper.getDetailMovie(movieId);
      res.json(data);
    } catch (e) {
      console.log("error");
      res.status(401).send({ message: "Error" });
    }
  };
  getListNextReleases = async (req: Request, res: Response) => {
    try {
      const data = await serviceScrapper.getListNextReleases();
      res.json(data);
    } catch (e) {
      console.log("error");
      res.status(401).send({ message: "Error" });
    }
  };
  getListbillboard = async (req: Request, res: Response) => {
    try {
      const data = await serviceScrapper.getListbillboard();
      res.json(data);
    } catch (e) {
      console.log("error");
      res.status(401).send({ message: "Error" });
    }
  };
  searchMovie = async (req: Request, res: Response) => {
    try {
      const { movieName } = req.params;
      const data = await serviceScrapper.searchMovie(movieName);
      res.json(data);
    } catch (e) {
      console.log("error");
      res.status(401).send({ message: "Error" });
    }
  };
}
