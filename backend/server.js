const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(express.json());

// DB
const db = new sqlite3.Database("./products.db");

// Table
db.run(`
CREATE TABLE IF NOT EXISTS products(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
price INTEGER NOT NULL
)
`);

// POST
app.post("/api/products",(req,res)=>{

const {name,price}=req.body;

db.run(
"INSERT INTO products(name,price) VALUES(?,?)",
[name,price],

function(err){

if(err){
return res.status(500).json({
error:err.message
});
}

res.json({
message:"Product Added",
id:this.lastID
});

});

});

app.listen(PORT,()=>{
console.log("Server running on port 3000");
});