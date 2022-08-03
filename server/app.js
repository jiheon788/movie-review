const express = require("express");
const mongoose = require("mongoose");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const oauthRouter = require("./routes/oauth");

const authMiddleware = require("./utils/authMiddleware");
const cors = require("cors");
const bodyParser = require("body-parser");




const app = express();

mongoose.connect("mongodb://localhost:27017/myapp");

mongoose.connection.on("connected", ()=>{
  console.log('DB connect success');
});
mongoose.connection.on("error", (err)=>{
  console.log(err);
});

app.use(cors());
app.use(express.json());
// 모든 경로에 대한 요청은 json으로 바뀜
app.use(bodyParser.urlencoded({extended:true}));

app.use("/oauth", oauthRouter);

// authMiddleware먼저 거치고 postsRouter
app.use("/posts", authMiddleware, postsRouter);

app.use("/user", userRouter);





app.listen(8080, () => {
  console.log('server open');
})