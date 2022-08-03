let shortId;

$(document).ready(()=>{
  shortId = localStorage.getItem("shortId");
  // console.log(shortId);
  
  $.ajax({
    type:"GET",
    url:`http://localhost:8080/posts/${shortId}/find`,
    headers:{
      accessToken: $.cookie("accessToken")
    },
    success:(res)=>{
      // console.log(res);
      $("#title").val(res.title);
      $("#content").val(res.content)
    }
  })
});

const updatePost = () => {
  // 유효성 검사
  if(!$("#title").val()){
    alert("제목을 입력하세요.");
    $("#title").focus();
    return;
  }
  if(!$("#content").val()){
    alert("본문을 입력하세요.");
    $("#content").focus();
    return;
  }
  // form 태그 내의 항목들을 자동으로 읽어와 쿼리스트링으로 변경
  // e.g. ?name=name&age=1
  let formData = $("#updateForm").serialize();

  // 게시글 작성
  $.ajax({
    type:'POST',
    url:`http://localhost:8080/posts/${shortId}/update`,
    data: formData,
    headers:{
      accessToken: $.cookie("accessToken")
    },
    success:(res)=>{
      // console.log(res);
      alert(res.result);
      location.href = "/view/posts/list.html"
      return;
    }
  })
};