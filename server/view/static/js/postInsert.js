const insertPost = () => {
  // console.log("click");

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
  let formData = $("#insertForm").serialize();

  formData += '&email='+sessionStorage.getItem("email");

  // 게시글 작성
  $.ajax({
    type:'POST',
    url:'http://localhost:8080/posts/insert',
    headers:{
      accessToken: $.cookie("accessToken")
    },
    data: formData,
    success:(res)=>{
      // console.log(res);
      alert(res.result);
      location.href = "/view/posts/list.html"
      return;
    }
  })
};