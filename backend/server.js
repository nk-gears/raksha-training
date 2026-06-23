const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --------------------------------------------------------
// ROUTES
// --------------------------------------------------------

// 1. GET all products
app.get("/api/products", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error reading products file" });
  }
});


// 2. POST new product
app.post("/api/products", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
    
    // Push the new product payload from the frontend
    products.push(req.body);

    fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving product" });
  }
});

// 3. DELETE product by Sno
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;

  try {
    const products = JSON.parse(fs.readFileSync("products.json", "utf8"));

    // Filter out the product matching the Sno
    const updatedProducts = products.filter((p) => p.Sno != id);

    // If the arrays have the same length, no product matched the id
    if (products.length === updatedProducts.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    fs.writeFileSync("products.json", JSON.stringify(updatedProducts, null, 2));
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

// --------------------------------------------------------
// START SERVER
// --------------------------------------------------------
app.listen(3000, () => {
  console.log("Server running on port 3000");
});