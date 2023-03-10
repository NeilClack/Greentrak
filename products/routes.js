import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all
router.get("/", async (req, res) => {
  let products = await prisma.product.findMany();
  res.json(products);
});

// Get one
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });
  res.status(200);
  res.send(product);
});

// Add one
router.post("/", async (req, res) => {
  const { name, germination, harvest, seedCost } = req.body;
  console.log(req.body);
  try {
    await prisma.product.create({
      data: {
        name,
        germination,
        harvest,
        seedCost
      }
    });
    res.status(201).json({message: "Product created"})
  } catch (e) {
    if (e.code === "P2002") {
      res.status(400).json({message: `Product ${name} already exists.`});
    }
  }
})

// Update one
router.put("/:id", async (req, res) => {
  let { id, name, germination, harvest, seedCost } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      germination,
      harvest,
      seedCost,
    },
  });
  res.json(product);
});

// Delete one
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(product);
});

export default router;
