const jwt = require("jsonwebtoken");
const jwtCongig = require("./../config/jwtConfig");

module.exports = async(req, res, next)=>{
  // console.log(`토큰값확인: ${req.header("accessToken")}`)
  const accessToken = req.header("accessToken");

  if(accessToken === null || accessToken === undefined){
    res.status(403).json({
      status:false,
      message:"권한 오류"
    });
  } else {
    try{
      const tokenInfo = await new Promise((resolve, reject)=>{
        jwt.verify(accessToken, jwtCongig.secret, (err, decode)=>{
          if(err){
            reject(err);
          } else {
            resolve(decode);
          }
        });
      }) ;

      req.tokenInfo = tokenInfo;
      next();

    }catch(e){
      res.status(403).json({
        status:false,
        message:"권한 오류"
      });
    }
  }
}
