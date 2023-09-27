var express = require("express")
var router = express.Router()
const productController = require("../controllers/productController")

router.get("/", productController.getAllProduct)
router.get("/:id", productController.detailProduct)
router.post("/", productController.createProduct)
router.put("/:id", productController.updateProduct)
router.delete("/:id", productController.deleteProduct)

module.exports = router
