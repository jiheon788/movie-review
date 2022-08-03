const {Router} = require('express');
const router = Router();
const axios = require("axios");
const key = require("./../../client/src/data/key.json");
const jwt = require("jsonwebtoken");
const jwtConfig= require("./../config/jwtConfig");
const { User } = require("../models");



router.get("/kakao", async (req,res,next)=>{
  const KAKAO_CODE = req.query.code;
  const REST_API_KEY = key.REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  
  console.log('KAKAO_CODE in server by oauth.js: ', KAKAO_CODE);

  try{
    await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`, {
      headers:{
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(getToken=>{
      getKakaoUserData(getToken.data.access_token).then(userData=>{
        console.log('userData in server by oauth.js: ', userData)
        checkUserData(userData.data, res)
      })
    })
  } catch(error){
    next(error);
  }
});

const checkUserData = async(userData, res)=>{
  const checkEmail = await User.findOne({email: userData.kakao_account.email});

  try{
    if(checkEmail){
      // 이미 존재하면 로그인 진행
      jwt.sign({
        email:checkEmail.email,
        name:checkEmail.name
      }, jwtConfig.secret, {
        expiresIn: '1d' //1y,1d,2h,1m,1s (시간)
      }, (err, token) => {
        if(err){
          res.status(401).json({status:false, message:"로그인 필요"});
        } else {
          res.json({
            login:true,
            status:true, 
            accessToken: token, 
            email: checkEmail.email, 
            name:checkEmail.name
          });
        }
      })
    } else {
      // 없으면 회원가입 페이지 전송
      userData.login = false;
      res.json(userData)
    }
  } catch(error) {
    console.log(error);
  }

}

const getKakaoUserData = async(token)=>{
  return await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

module.exports = router;