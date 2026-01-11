// import { prisma } from "./../db/prisma.js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "info", "warn"]
      : ["error"],
});

const main = async (req, res) => {
  const moviesArr = [
    {
      title: "Gladiator",
      overview:
        "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.",
      releaseYear: 2000,
      geners: ["Action", "Drama", "Adventure"],
      runtime: 155,
      posterUrl: "https://example.com/posters/gladiator.jpg",
      createdBy: "74d374c0-eee0-46e6-ae00-289f37d99d48",
    },
    {
      title: "Fight Club",
      overview:
        "An insomniac office worker forms an underground fight club that spirals out of control.",
      releaseYear: 1999,
      geners: ["Drama", "Thriller"],
      runtime: 139,
      posterUrl: "https://example.com/posters/fight-club.jpg",
      createdBy: "d4f1bb15-a5ec-4cdd-88a2-da02e36281c2",
    },
    {
      title: "Forrest Gump",
      overview:
        "The life journey of a kind-hearted man who unintentionally influences major historical events.",
      releaseYear: 1994,
      geners: ["Drama", "Romance"],
      runtime: 142,
      posterUrl: "https://example.com/posters/forrest-gump.jpg",
      createdBy: "74d374c0-eee0-46e6-ae00-289f37d99d48",
    },
    {
      title: "The Shawshank Redemption",
      overview:
        "Two imprisoned men bond over years, finding redemption through acts of decency.",
      releaseYear: 1994,
      geners: ["Drama"],
      runtime: 142,
      posterUrl: "https://example.com/posters/shawshank.jpg",
      createdBy: "d4f1bb15-a5ec-4cdd-88a2-da02e36281c2",
    },
    {
      title: "The Godfather",
      overview:
        "The aging patriarch of a powerful crime family transfers control to his reluctant son.",
      releaseYear: 1972,
      geners: ["Crime", "Drama"],
      runtime: 175,
      posterUrl: "https://example.com/posters/godfather.jpg",
      createdBy: "74d374c0-eee0-46e6-ae00-289f37d99d48",
    },
    {
      title: "Whiplash",
      overview:
        "A young drummer pushes himself to the limit under a ruthless music instructor.",
      releaseYear: 2014,
      geners: ["Drama", "Music"],
      runtime: 106,
      posterUrl: "https://example.com/posters/whiplash.jpg",
      createdBy: "d4f1bb15-a5ec-4cdd-88a2-da02e36281c2",
    },
    {
      title: "Joker",
      overview:
        "A mentally troubled comedian descends into madness and becomes a symbol of chaos.",
      releaseYear: 2019,
      geners: ["Crime", "Drama", "Thriller"],
      runtime: 122,
      posterUrl: "https://example.com/posters/joker.jpg",
      createdBy: "74d374c0-eee0-46e6-ae00-289f37d99d48",
    },
    {
      title: "The Prestige",
      overview:
        "Two rival magicians engage in a dangerous battle of deception and obsession.",
      releaseYear: 2006,
      geners: ["Drama", "Mystery", "Sci-Fi"],
      runtime: 130,
      posterUrl: "https://example.com/posters/prestige.jpg",
      createdBy: "d4f1bb15-a5ec-4cdd-88a2-da02e36281c2",
    },
    {
      title: "Avatar",
      overview:
        "A paraplegic marine is sent to Pandora and becomes torn between two worlds.",
      releaseYear: 2009,
      geners: ["Sci-Fi", "Adventure", "Fantasy"],
      runtime: 162,
      posterUrl: "https://example.com/posters/avatar.jpg",
      createdBy: "74d374c0-eee0-46e6-ae00-289f37d99d48",
    },
    {
      title: "Mad Max: Fury Road",
      overview:
        "In a post-apocalyptic wasteland, a drifter helps rebels escape a tyrant.",
      releaseYear: 2015,
      geners: ["Action", "Adventure", "Sci-Fi"],
      runtime: 120,
      posterUrl: "https://example.com/posters/mad-max.jpg",
      createdBy: "d4f1bb15-a5ec-4cdd-88a2-da02e36281c2",
    },
  ];

  for (let movie of moviesArr) {
    console.log(`create movie ${movie.title}`);
    await prisma.movie.create({
      data: {
        title: movie.title,
        overview: movie.overview,
        releaseYear: movie.releaseYear,
        geners: movie.geners,
        runtime: movie.runtime,
        posterUrl: movie.posterUrl,
        createdBy: movie.createdBy,
      },
    });
  }
};

main()
  .catch(async (err) => {
    console.log(`something wrong in create movie ${err.message}`);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    console.log("end of operation");
    await prisma.$disconnect();
  });
