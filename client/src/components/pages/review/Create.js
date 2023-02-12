import { useEffect, useState } from "react";
import {useCookies} from "react-cookie";
import $ from "jquery";
import axios from "axios";
import port from "./../../../data/port.json";
import { useNavigate } from "react-router-dom";

const Create = ()=>{
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  

  const [createReview, setCreateReview] = useState({
    img:"",
    title:"",
    content:"",
    email:cookies.userData.email
  });

  useEffect(()=>{
    console.log(createReview);
  }, [createReview]);

  const onChangeCreateReview = (event)=>{
    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value
    });
  }

  const onClickCreateReviewButton = ()=>{
    if(createReview.img === ""){
      alert("img null");
      $("#img").focus();
      return;
    }
    if(createReview.title === ""){
      alert("title null");
      $("#title").focus();
      return;
    }
    if(createReview.content === ""){
      alert("content null");
      $("#content").focus();
      return;
    }

    sendCreateReview().then(res=>{
      console.log(res);
      alert(res.data.result)
      navigate("/review/list")
      window.location.reload();
    }).catch(error=>{
      console.log(error);
    })
  }

  const sendCreateReview = async()=>{
    return await axios.post(port.url + "/posts/insert", createReview, {
      headers:{
        accessToken: cookies.userData.accessToken
      }
    })

  }

  return (
    <div className="album">
      <div className="container">

        <div className="card mb-3" style={{textAlign:"center"}}>
          <div className="card-img-top" >
            {
              createReview.img !== "" ? (<img src={createReview.img} alt="movie img"/>):(<></>)
            }
            
          </div>
          <div className="card-body">
            {/* <h5 className="card-title">Movie Image</h5> */}
            <input type="text" className="form-control" name="img" onChange={onChangeCreateReview} id="img" placeholder="Img URL Here"/>
            {/* <p className="card-text">
              <small className="text-muted">
                url...
              </small>
            </p> */}
          </div>
        </div>


        <div className="mb-3">
          <label htmlFor="title" className="form-label">TITLE</label>
          <input type="text" className="form-control" onChange={onChangeCreateReview} name="title" id="title" placeholder="Title Here"/>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">CONTENT</label>
          <textarea className="form-control" onChange={onChangeCreateReview} name="content" id="content" rows="5" placeholder="Content Here"></textarea>
        </div>
        <div style={{textAlign:"right"}}>
          <button type="button" onClick={onClickCreateReviewButton} className="btn" style={{backgroundColor:"#F3816F", color:"white", marginRight:"5px"}}>SUBMIT</button>
          <button type="button" onClick={()=>{window.history.back()}} className="btn" style={{backgroundColor:"#F3816F", color:"white"}}>BACK</button>
        </div>
        
      </div>
    </div>
    
  )
}

export default Create;