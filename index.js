const connectDB = require("./database/connect");
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/Users");
const BlogRouter = require("./routes/Blogs");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

// Middleware
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsConfig));

// Routes
app.get("/", (req,res) => {
	res.send("Hello")
})

app.use("/api/users",UserRouter);
app.use("/api/blogs",BlogRouter);


// Server 
const PORT = process.env.PORT || 4000;
const DATABASE_PORT = process.env.DATABASE_PATH;
app.listen(PORT, () => {
	connectDB(DATABASE_PORT);
	console.log(`Listening on PORT ${PORT}`);

})