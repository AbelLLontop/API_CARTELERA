import axios from "axios";
import { load } from "cheerio";


const domain = "https://lacartelera.pe";

const getlistchains = async () => {
  const { data } = await axios.get(`${domain}/cines`);
  const $ = load(data);
  const cines = $(".container .row:nth-child(3) > .col-12")
    .toArray()
    .map((cine) => {
      const image = $(cine).find("img").attr("src");
      const name = $(cine).find("a").attr("href")?.split("/").pop();
      const listCines = {
        id: name,
        image,
        name,
      };
      return listCines;
    });
    return cines;
};

const getDetailchains = async (chainId: string) => {
  const { data } = await axios.get(`${domain}/cine/${chainId}`);
  const $ = load(data);
  const cinemasLocation = $(
    "section.section-cartelera.pb-5.pt-3 > div > div:nth-child(4) > div.col-12.col-sm-12.col-md-8 > .row .col-sm-6"
  )
    .toArray()
    .map((cede) => {
      const title = $(cede).find(".card-title").text();
      const location = $(cede).find(".card-text").text();
      const cinemaId = $(cede).find("a").attr("href")?.split("/").pop();
      const listCedes = { cinemaId, title, location };
      return listCedes;
    });

  const billboard = $(
    "body > section.section-cartelera.pb-5.pt-3 > div > div:nth-child(4) > div.col-12.col-sm-12.col-md-4 > div > div"
  )
    .toArray()
    .map((movie) => {
      const image = $(movie).find("img").attr("src");
      const title = $(movie).find(".card-title").text();
      const duration = $(movie)
        .find("p.card-text")
        .text()
        .split(":")
        .pop()
        ?.trim();

      return { image, title, duration };
    });

  const chain = {
    chain: $("h1.h2").text(),
    description: $(
      "body > section.section-cartelera.pb-5.pt-3 > div > p"
    ).text(),
    cinemasLocation,
    billboard,
  };

  return chain;
};

const getDetailCinema = async (cinemaId: string) => {
  const { data } = await axios.get(`${domain}/cine/${cinemaId}`);
  const $ = load(data);
  const title = $(
    "body > section.section-cartelera.pb-5.pt-3 > div > div:nth-child(4) > div > h1"
  ).text();
  const location = $(
    "body > section.section-cartelera.pb-5.pt-3 > div > div:nth-child(4) > div > p"
  ).text();
  const movies = $(
    "body > section.section-cartelera.pb-5.pt-3 > div > div.row.mt-4 > div"
  )
    .toArray()
    .map((movie) => {
      const image = $(movie).find("img").attr("src");
      const title = $(movie)
        .find("a.text-body")
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim();
      const movieId = $(movie)
        .find("a.text-body")
        .attr("href")
        ?.split("/")
        .pop();
      const hours = $(movie)
        .find(".border.rounded.px-2.py-1.mr-2.mb-2")
        .toArray()
        .map((hour) => {
          return $(hour).text();
        });
      const info = $(movie)
        .find(".card-text>.text-muted")
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
        .split(":");
      const gender = info[1].split(".")[0];
      const duration = info[info.length - 1].trim();

      return { movieId, image, title, hours, gender, duration };
    });

  const inforCinema = {
    title,
    location,
    movies,
  };
  return inforCinema;
};

const getDetailMovie = async (movieId: string) => {
  const { data } = await axios.get(
    `${domain}/pelicula/${movieId}`
  );
  const $ = load(data);
  const htmlDataMovie = $(
    "body > section.section-banner-movie > div.banner-pelicual.py-3 > div > div > div.col-12.col-lg-5.text-white"
  );
  const title = $(htmlDataMovie).find("h1").text();
  const poster = $('body > section.section-banner-movie > div.fondo-container-pelicula').attr('style')?.split('(')[1].slice(0,-1);
  const statePublic = $(htmlDataMovie).find("p.text-white-50 > small").text();
  const resume = $(htmlDataMovie).find("p:nth-child(6) > small").text();
  const category = $(htmlDataMovie)
    .find("div.row > div:nth-child(1) > p:nth-child(1) > small")
    .text();
  const releaseData = $(htmlDataMovie)
    .find("div.row > div:nth-child(2) > p:nth-child(1) > small")
    .text();
  const director = $(htmlDataMovie)
    .find("div.row > div:nth-child(2) > p:nth-child(2) > small")
    .text();
  const duration = $(htmlDataMovie)
    .find("div.row > div:nth-child(1) > p:nth-child(2) > small")
    .text();
  const actors = $(htmlDataMovie)
    .find("div.row > div.col-12 > p > small")
    .text();
  const trailer = $(
    "body > section.section-banner-movie > div.banner-pelicual.py-3 > div > div > div.col-12.col-lg-7.align-self-center.d-none.d-sm-block > div > iframe"
  ).attr("src");
  const schedulesForCinema = $(
    "body > section:nth-child(3) > div > div > div > div.bloque-cine"
  )
    .toArray()
    .map((movie) => {
      const title = $(movie)
        .find("a")
        .first()
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
        .trim();
      const listCinemas = $(movie)
        .find("tr")
        .toArray()
        .map((row) => {
          const name = $(row).find("a").text();
          const cinemaId = $(row).find("a").attr("href")?.split("/").pop();
          const hours = $(row)
            .find("span")
            .toArray()
            .map((hour) => {
              return $(hour).text();
            });
          return { cinemaId, name, hours };
        });
      return { title, listCinemas };
    });

  const infoMovie = {
    title,
    poster,
    statePublic,
    resume,
    category,
    releaseData,
    director,
    duration,
    actors,
    trailer,
    schedulesForCinema,
  };
  return infoMovie;
};

const getListNextReleases = async () => {
  const { data } = await axios.get(`${domain}/proximos-estrenos`);
  const $ = load(data);
  const nextReleases = $(
    "body > section.section-cartelera.pb-5.pt-3 > div > div.row.row-cols-1.row-cols-md-3 > div > div"
  )
    .toArray()
    .map((movie) => {
      const movieId = $(movie).find("a").attr("href")?.split("/").pop();
      const image = $(movie).find("img").attr("src");
      const name = $(movie).find(".card-title").text();
      const date = $(movie).find(".card-text.text-muted").text().trim();
      return { movieId, image, name, date };
    });
  return nextReleases;
};

const getListbillboard = async () => {
  const { data } = await axios.get(`${domain}/cartelera`);
  const $ = load(data);
  const billboard = $(
    "body > section.section-cartelera.pb-5.pt-3 > div > div.row.row-cols-1.row-cols-md-3 > div > div"
  )
    .toArray()
    .map((movie) => {
      const movieId = $(movie).find("a").attr("href")?.split("/").pop();
      const image = $(movie).find("img").attr("src");
      const name = $(movie).find(".card-title").text();
      const date = $(movie).find(".card-text.text-muted").text().trim();
      return { movieId, image, name, date };
    });
  return billboard;
};

const searchMovie = async (movieName: string) => {
  const { data } = await axios.get(`${domain}/b/${movieName}`);
  const $ = load(data);
  const movies = $("body > section.pb-5.pt-3 > div > div.py-2 > div")
    .toArray()
    .map((movie) => {
      const movieId = $(movie).find("a").first().attr("href")?.split("/").pop();
      const image = $(movie).find("img").attr("src");
      const name = $(movie).find("h3").text();
      const resume = $(movie).find("p").text();
      return { movieId, image, name, resume };
    });
  return movies;
};


export const serviceScrapper = {
  getlistchains,
  getDetailchains,
  getDetailCinema,
  getDetailMovie,
  getListNextReleases,
  getListbillboard,
  searchMovie,
}