const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

mongoose.connect("mongodb://localhost:27017/blogify").then((e)=> console.log("MongoDb Connected"));

const PORT = 8000

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req,res)=>{
    res.render("home",{
        user : req.user
    });
})

app.use("/user", userRoute)

app.listen(PORT, ()=>console.log(`server started at PORT: ${PORT}`));