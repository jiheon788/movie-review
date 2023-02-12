import $ from "jquery";
import axios from "axios";
import port from "./../../../config/port.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useCookies} from "react-cookie"


const SignInForm = ({signInData, onChangeSignInData})=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("")
  // DB에 요청할때는 항상 비동기처리
  const onClickLoginButton = ()=>{
    // console.log(signInData.email);
    if(signInData.email === ""){
      alert("email null");
      $("#email").focus();
      return;
    }
    if(signInData.password === ""){
      alert("password null");
      $("#password").focus();
      return;
    }
    sendSigninData().then(res=>{
      console.log(res);
      setCookie("userData", res.data, {path:"/"});
      // console.log(cookies("userData"));
      alert("login success");
      navigate("/review/list")
      // window.location.reload();
    }).catch(err=>{
      console.log(err.response.data);
      alert(err.response.data.fail);
      setErrorMessage(err.response.data.fail)
    }).finally(()=>{
      console.log('cookie: ', cookies.userData);
    })
  }

  const sendSigninData = async()=>{
    return await axios.post(port.url + '/user/login', signInData);
  }


  return(
    <div className="album">
      <div className="container">

        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" value={signInData.email} onChange={onChangeSignInData} className="form-control" name="email" id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={signInData.password} onChange={onChangeSignInData} className="form-control" name="password" id="password" />
          </div>

          <div className="mb-3">
            <p className="text-danger">
              {errorMessage}
            </p>
          </div>

          <button type="button" onClick={onClickLoginButton} className="btn" style={{backgroundColor:"#F3816F", color:"white"}}>Submit</button>
        </form>

      </div>
    </div>
    
  )
}

export default SignInForm;