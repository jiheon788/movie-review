import { useEffect } from "react";
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";


const Header3 = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const navigate = useNavigate();

  useEffect(()=>{
    if(cookies.userData === undefined){
      navigate("/")
    }
  }, [cookies])



  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 ">

        <a href="/review/list" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
          <h3><strong>Movie Review</strong></h3>
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {/* <li><a href="/" className="nav-link px-2 link-dark">HOME</a></li> */}
          {/* <li><a href="/review/list" className="nav-link px-2 link-dark">REVIEW</a></li>
          <li><a href="/review/create" className="nav-link px-2 link-dark">CREATE</a></li> */}
        </ul>

        <div className="col-md-3 text-end">
          {cookies.userData ? (
            <>
              <span style={{marginRight:"20px"}}>
                <strong>{cookies.userData.name}</strong>님 로그인 중
              </span>
              <button type="button" onClick={()=>{
                removeCookie("userData", {path:"/"});
                navigate("/")
              }}  className="btn" style={{backgroundColor:"#F3816F", color:"white"}}>LOGOUT</button>
            </> 
          ):(
            <>
              <span>로그인을 해주세요</span>
              {/* <button type="button" onClick={()=>navigate("/")} className="btn btn-outline-primary me-2">Login</button> */}
              {/* <button type="button" onClick={()=>navigate("/")} className="btn btn-warning">Sign-up</button> */}
            </>    
          )}
        </div>

      </header>
    </div>
  )
}

export default Header3;
