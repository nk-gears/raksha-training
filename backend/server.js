const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// GET all products
app.get("/api/products", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync("products.json", "utf8")
  );

  res.json(products);
});

// POST new product
app.post("/api/products", (req, res) => {

  const products = JSON.parse(
    fs.readFileSync("products.json", "utf8")
  );

  products.push(req.body);

  fs.writeFileSync(
    "products.json",
    JSON.stringify(products, null, 2)
  );

  res.status(201).json({
    message: "Product added successfully"
  });

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});