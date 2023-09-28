import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    return res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

export { getProducts, getSingleProduct };
