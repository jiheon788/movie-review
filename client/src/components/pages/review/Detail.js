import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import port from "./../../../data/port.json"





const Detail = ()=>{
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [detailData, setDetailData] = useState({});

  useEffect(()=>{
    console.log(params.id)
    findDetailData().then(res=>{
      setDetailData(res.data);
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  const findDetailData = async ()=>{
    return await axios.get(port.url + `/posts/${params.id}/find`, {
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
            <img src={detailData.img} alt="..."/>
            {/* <p align="middle">
              <iframe style={{textAlign:"center"}} width="560" height="315" src="https://www.youtube.com/embed/qoXf5Zr3BhA?autoplay=1&controls=0&mute=1&amp;loop=1;playlist=qoXf5Zr3BhA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </p> */}
          </div>
        </div>


        <div className="mb-3">
          <label htmlFor="title" className="form-label">TITLE</label>
          <div className="card">
            <p className="card-body">
              {detailData.title}
            </p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">CONTENT</label>
          <div className="card">
            <p className="card-body">
              {detailData.content}
            </p>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <button type="button" onClick={()=>{window.history.back()}} className="btn" style={{backgroundColor:"#F3816F", color:"white"}}>BACK</button>
        </div>
        
      </div>
    </div>
    
  )
}

export default Detail;