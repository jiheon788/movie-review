const findPw = ()=>{
  if(!$("#email").val()){
    alert("이메일 입력해주세요.");
    $("#email").focus();
    return;
  }

  let findForm = $("#findForm").serialize();

  $.ajax({
    type:"POST",
    url:"http://localhost:8080/user/find/password",
    data:findForm,
    success:(res)=>{
      alert(res.result);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}