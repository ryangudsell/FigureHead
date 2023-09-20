const express = require('express')
const multer = require("multer")
const path = require("path")
const router = express.Router()

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Store uploads in this directory
    },
    //unique name for each file
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext); // Use unique filenames
    },
});

const upload = multer({ storage });

router.post('/upload/', upload.array("images", 3), (req, res) => {
  try {
    const files = req.files
    const fileDetails = files.map((file) => ({
      filename: file.filename,
      path: file.path
    }))
    return res.status(201).json({message: "files uploaded successfully", files: fileDetails})
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "error"})
  }
})

// import controller functions
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController')

//setup a route for each required route 

// GET all products
router.get('/', getProducts)

// GET a SINGLE product
router.get('/:id', getProduct)

// POST a new product
router.post('/', upload.array("images", 3), createProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

// UPDATE a product
router.patch('/:id', updateProduct)

// export the module
module.exports = router

