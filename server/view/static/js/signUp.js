const signUp = () => {
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
  if(!$("#rePassword").val()){
    alert("비밀번호 확인 입력해주세요.");
    $("#rePassword").focus();
    return;
  }
  if(!$("#name").val()){
    alert("이름 입력해주세요.");
    $("#name").focus();
    return;
  }
  if($("#password").val() !== $("#rePassword").val()){
    alert("비밀번호 불일치");
    $("#password").val("");
    $("#rePassword").val("");
    $("#password").focus();
    return;
  }

  let signUpData = $("#signUpForm").serialize();
  $.ajax({
    type:"POST",
    url:"http://localhost:8080/user/signUp",
    data:signUpData,
    success:(res)=>{
      alert(res.result); //응답처리
      location.href = "/view/user/login.html";
    }, 
    error: (err) => {
      // console.log(err);
      alert(err.responseJSON.error);
      $("#email").val("");
      $("#email").focus();

    }

  })
}