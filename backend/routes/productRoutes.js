import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: "test-product-"+Math.random() * 11,
      slug: "test-product-"+Math.random() * 11,
      image:
        "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",
      price: 0,
      category: "test category",
      brand: "test brand",
      countInStock: 0,
      description: "test description",
    });
    const product = await newProduct.save();
    res.send({ message: "Product Created", product });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: "Product Updated" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

const PAGE_SIZE = 6;

productRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;