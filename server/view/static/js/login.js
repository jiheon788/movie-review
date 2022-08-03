const login = ()=>{
  if(!$("#email").val()){
    alert("이메일 입력해주세요.");
    $("#email").focus();
    return;
  }
  if(!$("#password").val()){
    alert("비밀번호 입력해주세요.");
    $("#password").focus();
    return;
  }

  let loginForm = $("#loginForm").serialize();

  $.ajax({
    type:"POST",
    url:"http://localhost:8080/user/login",
    data:loginForm,
    success:(res)=>{
      console.log(res);
      $.cookie("accessToken", res.accessToken, {expires: 1, path:'/'});
      $.cookie("email", res.email, {expires: 1, path:'/'});

       //쿠키 브라우저에 저장
      sessionStorage.setItem("email", res.email);
      sessionStorage.setItem("name", res.name);

      alert("로그인 완료");

      location.href = "/view/posts/list.html";
    },
    error:(err)=>{
      console.log(err);
      alert(err.responseJSON.fail);
      // $("#email").val("");
      $("#password").val("");
      $("#password").focus();
    }
  })
}