import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import port from "./../../../data/port.json";
import {useCookies} from "react-cookie";
import $ from "jquery";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Update = ()=>{
  const navigate = useNavigate();
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [updateData, setUpdateData]=useState({});
  // const [shortId, setShortId] = useState("")

  // let getReduxShortId = useSelector(state=>state.id.value);

  useEffect(()=>{
    // console.log(shortId)
    findGetReviewData(params.id).then(res=>{
      console.log(res)
      setUpdateData(res.data)
    });
  }, [])

  const findGetReviewData = async()=>{
    return await axios.get(port.url + `/posts/${params.id}/find`, {
      headers:{
        accessToken: cookies.userData.accessToken
      }
    })
  }

  const onChangeUpdateData = (event)=>{
    setUpdateData({
      ...updateData,
      [event.target.name]: event.target.value
    })
  }

  const onClickChangeButton = ()=>{
    if(updateData.img === ""){
      alert("img null");
      $("#img").focus();
      return;
    }
    if(updateData.title === ""){
      alert("title null");
      $("#title").focus();
      return;
    }
    if(updateData.content === ""){
      alert("content null");
      $("#content").focus();
      return;
    }

    sendUpdateData().then(res=>{
      console.log(res);
      alert(res.data.result);
      navigate("/review/list");
      window.location.reload();

    }).catch(error=>{
      console.log(error);
    })
  }

  const sendUpdateData = async ()=>{
    return await axios.post(port.url + `/posts/${params.id}/update`, updateData, {
      headers:{
        accessToken: cookies.userData.accessToken
      }
    })
  }

  return (
    <div className="album">
      <div className="container">

        <div className="card mb-3" style={{textAlign:"center"}}>
          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/qoXf5Zr3BhA?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
          <div className="card-img-top" >
            <img src={updateData.img} alt="..."/>
          </div>
          <div className="card-body">
            <h5 className="card-title">Movie Image</h5>
            <p className="card-text">
              Img Example
            </p>
            <input type="text" className="form-control" defaultValue={updateData.img} onChange={onChangeUpdateData} name="img" disabled id="img" placeholder="Img URL Here"/>
            <p className="card-text">
              <small className="text-muted">
                url...
              </small>
            </p>
          </div>
        </div>


        <div className="mb-3">
          <label htmlFor="title" className="form-label">TITLE</label>
          <input type="text" className="form-control" defaultValue={updateData.title} onChange={onChangeUpdateData} name="title" id="title" placeholder="Title Here"/>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">CONTENT</label>
          <textarea className="form-control" defaultValue={updateData.content} onChange={onChangeUpdateData} name="content" id="content" rows="5" placeholder="Content Here"></textarea>
        </div>
        <div style={{textAlign:"right"}}>
          <button type="button" onClick={()=>{onClickChangeButton()}} className="btn" style={{backgroundColor:"#F3816F", color:"white", marginRight:"5px"}}>CHANGE</button>
          <button type="button" onClick={()=>{window.history.back()}} className="btn" style={{backgroundColor:"#F3816F", color:"white"}}>BACK</button>
        </div>
        
      </div>
    </div>
    
  )
}

export default Update;