import Product from "../models/Product.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            images,
            countInStock,
        } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            images,
            countInStock,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name")
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "category",
            "name"
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// UPDATE PRODUCT (Admin)
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.category = req.body.category || product.category;
        product.images = req.body.images || product.images;
        product.countInStock =
            req.body.countInStock ?? product.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE PRODUCT (Admin)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
