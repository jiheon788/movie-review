import axios from "axios";
import { useEffect } from "react";
import port from "./../../../../data/port.json";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";


const KakaoCallback = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [cookiesAuth, setCookiesAuth, removeCookiesAuth] = useCookies(["auth"]);
  //카카오에서 리다이렉트해준 코드 가져오는 부분
  const KAKAO_PARAMS = new URL(window.location.href).searchParams.get("code");

  useEffect(()=>{
    console.log('KAKAO_PARAMS in client by KakaoCallback.js: ', KAKAO_PARAMS)
    sendCode().then(res=>{
      console.log(res)

      if(res.data.login){
        //트루이면 로그인상태
        setCookie("userData", res.data, {path:"/"});
        navigate("/review/list");

      } else {
        // falso면 회원가입
        setCookie("auth", res.data, {path:"/"});
        navigate("/oauth/signUp");
      }
    }).catch(error=>{
      console.log(error)
      navigate("/");
    })
    
  }, [])

  const sendCode = async () => {
    return await axios.get(port.url + '/oauth/kakao', {
      params: {
        code: KAKAO_PARAMS
      }
    })
  }
}

export default KakaoCallback;