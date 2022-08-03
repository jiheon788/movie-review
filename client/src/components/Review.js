// import reviewData from "./../data/review.json"
import port from "./../data/port.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios"

import { useDispatch } from "react-redux";
import { setData } from "../app/reducer/Data";
import "./../../src/App.css"


const Review = ()=>{
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState([]);
  const [page, setPage]=useState({
    page:1,
    totalPage:0
  })

  //렌더링 최초 한번만 실행
  useEffect(()=>{
    getReviewData(page.page);
  },[])

  const getReviewData = (page) => {
    try{
      axios.get(port.url + `/posts?page=${page}&perPage=8`, {
        headers:{
          accessToken:cookies.userData.accessToken
        }
      }).then(res=>{
        // console.log(res)
        setReviewData(res.data.posts);
        setPage({
          page:page,
          totalPage: res.data.totalPage
        })
        

      }).catch(error=>{
        console.log(error);
      })
    } catch (error){
      navigate("/")
    }
  }

  const onClickPagination = (page)=>{
    getReviewData(page)
  }

  const onClickDetailButton = (shortId)=>{
    navigate(`/review/${shortId}/detail`);
  }

  const deleteReview = async (shortId)=>{
    return await axios.get(port.url + `/posts/${shortId}/delete`,{
      headers:{
        accessToken:cookies.userData.accessToken
      }
    })
  }

  const onClickDeleteButton = (shortId)=>{
    if(window.confirm("삭제 하시겠습니까?")){
      // yes
      deleteReview(shortId).then(res=>{
        let getNewDataAfterDelete = reviewData.filter(item => item.shortId !== shortId);
        setReviewData(getNewDataAfterDelete)
      })

    } else {
      //no
      return;
    }
  }

  const onClickUpdateButton = (shortId)=>{
    dispatch(setData(shortId));
    navigate(`/review/${shortId}/update`);
  }

  

  return(
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Movie</h1>
            <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 별점을 주세요.<br/>또한 삭제, 수정이 가능합니다.</p>
            <p>
              <button onClick={()=>{navigate('/review/create')}} className="btn" style={{backgroundColor:"#F3816F", color:"white"}}>CREATE REVIEW</button>
            </p>
          </div>
        </div>
      </section>

      <div className="album py-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {
              reviewData.map((item, index)=>(
                <div className="col" key={index} style={{"paddingRight":"20px"}}>
                  <div className="shadow-lg p-3 mb-5 bg-body rounded" >
                    <div className="card-img-top" style={{textAlign: "center", padding:"10px"}}>
                      <img className="bd-placeholder-img" onClick={()=>onClickDetailButton(item.shortId)} width="172" height="246" src={item.img} role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                    </div>
                    <div className="card-body">
                      <p className="card-text lead text-muted" style={{padding: "20px", textAlign:"center"}}>
                        {item.title}
                      </p>
                      <p>
                        <small className="text-muted">{item.author.name}</small>
                        <small style={{
                          marginLeft:"5px",
                          padding: "2px 4px",
                          background: "#F3816F",
                          borderColor: "#F3816F",
                          color: "white",
                          borderRadius:"5px"
                        }}>9 mins</small>
                      </p>
                        
                      <div >
                        <button type="button" onClick={()=>{onClickDeleteButton(item.shortId)}} className="btn btn-secondary" style={{marginRight:"5px"}}>DELETE</button>
                        <button type="button" onClick={()=>{onClickUpdateButton(item.shortId)}} className="btn btn-secondary">UPDATE</button>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            }
          </div>

        </div>
      </div>
      {/* pagination */}
      <div style={{textAlign:"center"}}>
        <nav aria-label="Page navigation example" style={{display:"inline-block"}}>
          <ul className="pagination my">
            {
              (page.page - 1) < 1 ? (<></>):(
                <>
                  <li className="page-item">
                    <a className="page-link" aria-label="Previous" onClick={()=>{onClickPagination(page.page - 1)}}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" onClick={()=>{onClickPagination(page.page - 1)}}>{page.page - 1}</a></li>
                </>
              )
            }
            
            <li className="page-item active"><a className="page-link" onClick={()=>{onClickPagination(page.page)}}>{page.page}</a></li>

            {
              (page.page + 1) > page.totalPage ? (<></>):(
                <>
                  <li className="page-item"><a className="page-link" onClick={()=>{onClickPagination(page.page + 1)}}>{page.page + 1}</a></li>
                  <li className="page-item">
                    <a className="page-link" aria-label="Next" onClick={()=>{onClickPagination(page.page + 1)}}>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </>
              )
            }
            
          </ul>
        </nav>
      </div>
    
    </main>
  )
}

export default Review;