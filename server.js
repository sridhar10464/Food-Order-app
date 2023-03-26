const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path")
const connectDb = require("./config/connectDb");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");


// dotenv configuration
dotenv.config();

// connect db
connectDb();

// rest object
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/images", express.static("public/images"));
app.use("/auth", authController);
app.use("/product", productController);
app.use("/upload", uploadController);

// static files
app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", function(req,res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

// PORT
const PORT = 8080 || process.env.PORT;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
