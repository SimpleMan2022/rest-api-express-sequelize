const Validator = require("fastest-validator")
const { Product } = require("../models")
const v = new Validator()

const getAllProduct = async (req, res) => {
  const products = await Product.findAll()
  res.json({
    message: "Get All Products",
    data: products,
  })
}

const detailProduct = async (req, res) => {
  const products = await Product.findByPk(req.params.id)
  res.json({
    message: `Detail Product ${req.params.id}`,
    data: products,
  })
}

const createProduct = async (req, res) => {
  const schema = {
    name: "string",
    brand: "string",
    description: "string|optional",
  }
  const validate = v.validate(req.body, schema)

  if (validate.length) {
    res.status(400).json(validate)
  } else {
    const product = await Product.create(req.body)
    res.status(201).json({
      message: "Create Product Success!",
      data: product,
    })
  }
}

const updateProduct = async (req, res) => {
  let product = await Product.findByPk(req.params.id)

  if (!product) {
    res.json({
      message: "Product Not Found!",
    })
  }
  const schema = {
    name: "string|optional",
    brand: "string|optional",
    description: "string|optional",
  }
  const validate = v.validate(req.body, schema)

  if (validate.length) {
    res.status(400).json(validate)
  } else {
    product = await product.update(req.body)
    res.status(200).json({
      message: "Update Product Success!",
      data: product,
    })
  }
}

const deleteProduct = async (req, res) => {
  const id = req.params.id
  let product = await Product.findByPk(id)

  if (!product) {
    res.json({
      message: "Product Not Found!",
    })
  } else {
    await product.destroy()
    res.json({
      message: "Product is Deleted!",
    })
  }
}

module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  detailProduct,
  deleteProduct,
}
