import { useEffect } from "react";
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";

const Header = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const navigate = useNavigate();

  useEffect(()=>{
    if(cookies.userData === undefined){
      navigate("/")
    }
  }, [cookies])
  
  
    

  return (
    <header>
      <div className="collapse bg-dark" id="navbarHeader">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 offset-md-1 py-4">
              <h4 className="text-white">About</h4>
              <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
            </div>
            <div className="col-sm-4 offset-md-1 py-4">
              <h4 className="text-white">Contact</h4>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white">HOME</a></li>
                <li><a href="/review/list" className="text-white">REVIEW</a></li>
                <li><a href="/review/create" className="text-white">Create</a></li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-1 py-4">
              <h4 className="text-white">Info</h4>
              {cookies.userData ? (
                <ul className="list-unstyled">
                  <li><p style={{color:"white"}}>{cookies.userData.email} 로그인 중</p></li>
                  <li><button onClick={()=>{
                    removeCookie("userData", {path:"/"});
                    navigate("/")
                  }} className="btn btn-outline-light" style={{marginBottom:"5%"}}>LOGOUT</button></li>
                  <li><button className="btn btn-outline-light">INFO</button></li>
                </ul>
              ) : (
                <ul className="list-unstyled">
                  <li><p style={{color:"white"}}>로그인을 해주세요</p></li>
                </ul>
              )}
                
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-dark bg-dark shadow-sm border-top">
        <div className="container">
          <a href="/review/list" className="navbar-brand d-flex align-items-center">
            <strong>Movie Review</strong>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;