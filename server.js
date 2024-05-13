require("dotenv").config();
const express = require('express');
const cors = require("cors");
const morgan = require("morgan")
const ConnectDb = require("./config/db");



const app = express();
const port = process.env.PORT || 8000;


ConnectDb();



// ROUTES
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

// ROUTES
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/blog/", blogRouter);


app.listen(port, () => {
    console.log(`${process.env.DEV_MODE} Server Start  on http://localhost:${port}`);
})