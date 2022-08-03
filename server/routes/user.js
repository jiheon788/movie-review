const {Router} = require("express");
const router = Router();
const asyncHandler = require("./../utils/async-handler");
const cryto = require("crypto");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const jwtConfig= require("./../config/jwtConfig");
const nodeMailer = require("nodemailer");

//  /user 라는 url접근시 여기로 이동

router.post("/signUp", asyncHandler(async (req,res,next)=>{
  const {email, password, name} = req.body;
  // console.log(email, password, name);
  // console.log(req.body);

  let hashPassword = passwordHash(password);
  // console.log(hashPassword);

  const checkEmail = await User.findOne({email});

  if(checkEmail){
    // throw new Error("이미 가입된 이메일");
    res.status(500); //500-내부코드오류, 404-url오류
    res.json({
      error:"이미 가입된 이메일"
    })
    return;
  }

  await User.create({
    email,
    password: hashPassword,
    name
  });

  res.json({
    result:"회원가입 완료"
  })
}));

router.post("/login", asyncHandler(async(req,res,next)=>{
  let {email,password} = req.body;
  // console.log(email,password);
  let hashPassword = passwordHash(password);

  const checkEmail = await User.findOne({email});

  // if(checkEmail.status !== null || checkEmail.status !== undefined){
  //   if(checkEmail.status == true){
  //     console.log("비밀번호 여기서 재사ㅐㅇ산해")
  //   }
  // }
  console.log(email);
  console.log(checkEmail);
  console.log(hashPassword)

  if(!checkEmail){
    res.status(401);
    res.json({
      fail:"존재하지 않는 이메일"
    })
    return;
  }

  if(hashPassword !== checkEmail.password){
    res.status(401);
    res.json({
      fail:"비밀번호 틀림"
    })
    return;
  }

  jwt.sign({
    email:email,
    name:checkEmail.name
  }, jwtConfig.secret, {
    expiresIn: '1d' //1y,1d,2h,1m,1s (시간)
  }, (err, token) => {
    if(err){
      res.status(401).json({status:false, message:"로그인 필요"});
    } else {
      res.json({status:true, 
        accessToken: token, 
        email: email, 
        name:checkEmail.name
      });
    }
  })

}));

router.post("/find/password", asyncHandler(async (req,res,next) => {
  let {email} = req.body;
  let user = await User.findOne({email});
  let myEmail = "jiheon788@ajou.ac.kr";

  let transporter = nodeMailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port: 587,
    secure:false,
    auth:{
      user:myEmail,
      pass:"mozyqghnunwjwmnj"
    }
  });

  const randomPassword = randomPw();
  const hashRandomPassword = passwordHash(randomPassword);

  await User.findOneAndUpdate({shortId: user.shortId}, {
    password: hashRandomPassword,
    status:true
  });

  let info = await transporter.sendMail({
    from:`"JH-test" <${myEmail}>`,
    to: user.email,
    subject:'Reset Password By Elice',
    html: `<b>초기화 비밀번호: ${randomPassword}</b>`
  });
  console.log(info.messgeId);
  res.json({result:"이메일을 전송하였습니다."})
}));

const randomPw = ()=>{
  // return Math.floor(Math.random()*(10**8)).toString().padStart('0', 8);
  return (123).toString();
};





const passwordHash = (password)=>{
  return cryto.createHash("sha1").update(password).digest("hex");
}

module.exports = router;