import { useEffect, useState } from "react";
import SignInForm from './pages/user/SignInForm';
import SignUpForm from './pages/user/SignUpForm';
import kakaoLoginButtonImg from './../images/kakao_login_medium.png';
import key from "./../data/key.json";


const Login = ()=>{
  const [view, setView] = useState({
    signIn: false,
    signUp: false
  })

  // 로그인 입력받을 데이터 props로 전달
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  })
  // 회원가입 입력받을 데이터 props로 전달
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword:"",
    name:""
  })
  
  const onChangeSignInData = (event)=>{
    setSignInData({
      ...signInData,
      [event.target.name]:event.target.value
    })
  }

  const onChangeSignUpData = (event)=>{
    setSignUpData({
      ...signUpData,
      [event.target.name]:event.target.value
    })
  }

  useEffect(()=>{
    // console.log(`signInData:`, signInData)
    // console.log(`signUpData:`, signUpData)
  },[signInData, signUpData])

  // ---------------------------- kakao oauth-------------------------------------------
  const REST_API_KEY = key.REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return(
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Movie</h1>
            <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 별점을 주세요.<br/>또한 삭제, 수정이 가능합니다.</p>
            <p>
              <button onClick={()=>{
                setView({
                  signIn: true,
                  signUp: false
                })
              }} className="btn" style={{backgroundColor:"#F3816F", color:"white", marginRight:"7px"}}>LOGIN</button>
              <button onClick={()=>{
                setView({
                  signIn: false,
                  signUp: true
                })
              }} className="btn" style={{backgroundColor:"#F3816F", color:"white", marginRight:"7px"}}>SIGNUP</button>
              {/* <img src={"/images/kakao_login_small.png"}/> */}

              <a href={KAKAO_AUTH_URI}>
                <img src={kakaoLoginButtonImg} />
              </a>
            </p>
          </div>
        </div>
      </section>
      {
        view.signIn ? (<SignInForm signInData={signInData} onChangeSignInData={onChangeSignInData} />) : (<></>)
      }
      {
        view.signUp ? (<SignUpForm signUpData={signUpData}  setSignUpData={setSignUpData} onChangeSignUpData={onChangeSignUpData} />) : (<></>)
      }
    </main>
  )
}

export default Login;