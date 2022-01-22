const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/:take?/:skip?", async function (req, res, next) {
  const limit = Number.parseInt(req.query.take) || 10;
  const offset = Number.parseInt(req.query.skip) || 0;
  const movies = await prisma.movies.findMany({
    take: limit,
    skip: offset,
  });
  res.send({
    data: movies,
    pagination: {
      count: movies.length,
      take: limit,
      skip: offset,
    },
  });
});
module.exports = router;
