import { useEffect, useRef } from "react";
import { useState } from "react";
import {useCookies} from "react-cookie";

import $ from "jquery";
import axios from "axios";
import port from "./../../../data/port.json";



const SocialSignUp = ()=>{

  const [cookiesAuth, setCookiesAuth, removeCookiesAuth] = useCookies(["auth"]);


  const emailRef = useRef()
  const [errorMessage, setErrorMessage] = useState("")

  const [signUpData, setSignUpData] = useState({
    email:"",
    password:"",
    rePassword:"",
    name:""
  })

  useEffect(()=>{
    console.log(cookiesAuth.auth);
    setSignUpData({
      ...signUpData,
      email:cookiesAuth.auth.kakao_account.email,
      name:cookiesAuth.auth.kakao_account.profile.nickname
    })
  },[]);

  const onChangeSignUpData = (event)=>{
    setSignUpData({
      ...signUpData,
      [event.target.name]:event.target.value
    })
  }


  const onClickSignupButton = ()=>{
    if(signUpData.email === ""){
      alert("email null");
      emailRef.current.focus();
      // $("#email").focus();
      return;
    }
    if(signUpData.password === ""){
      alert("password null");
      $("#password").focus();
      return;
    }if(signUpData.rePassword === ""){
      alert("rePassword null");
      $("#rePassword").focus();
      return;
    }
    if(signUpData.name === ""){
      alert("name null");
      $("#name").focus();
      return;
    }

    if(signUpData.password !== signUpData.rePassword){
      alert("password inconfidence");
      setSignUpData({
        ...signUpData,
        password:"",
        rePassword:""
      })
      // $("#password").val("");
      // $("#rePassword").val("");
      $("#password").focus("");
      return;
    }
    sendSignupData().then(res=>{
      console.log(res.data);
      alert(res.data.result);
      window.location.reload();
    }).catch(err=>{
      console.log(err.response.data);
      alert(err.response.data.error);
      setErrorMessage(err.response.data.error)

    })
    

  }

  const sendSignupData = async ()=>{
    return await axios.post(port.url + "/user/signUp", signUpData);
  }

  return(
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Movie</h1>
            <p className="lead text-muted">
              리뷰하고 싶은 영화를 추가하고, 별점을 주세요.
              <br/>또한 삭제, 수정이 가능합니다.
              <br/> Kakao SignUp Page
            </p>
          </div>
        </div>
      </section>
      
      <div className="album">
        <div className="container">

          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" disabled ref={emailRef} value={signUpData.email} onChange={onChangeSignUpData} className="form-control" name="email" id="email" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" value={signUpData.password} onChange={onChangeSignUpData} className="form-control" name="password" id="password" />
            </div>

            <div className="mb-3">
              <label htmlFor="rePassword" className="form-label">rePassword</label>
              <input type="password" value={signUpData.rePassword} onChange={onChangeSignUpData} className="form-control" name="rePassword" id="rePassword" />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" disabled value={signUpData.name} onChange={onChangeSignUpData} className="form-control" name="name" id="name" />
            </div>

            <div className="mb-3">
              <p className="text-danger">
                {errorMessage}
              </p>
            </div>

            <button type="button" onClick={onClickSignupButton} className="btn" style={{backgroundColor:"#F3816F", color:"white"}}>Submit</button>
          </form>

        </div>
      </div>

    </main>



    
    
  )
}

export default SocialSignUp;