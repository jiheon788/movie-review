let loginInfo = $.cookie("email");
// $() == tagbyName
$(document).ready(() => {
  let noHeader = 
  `
  <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
  <a href="/view/posts/list.html" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
    <!--<svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">-->
    <!--<img src="https://elice.io/static/dc6054e07cd72edccb4c2f0ceccedb97/cdfa4/elice_logo.webp" alt="">-->
    <H1>게시판</H1>
      
    <!--</svg>-->
  </a>

  <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    <li><a href="/view/index.html" class="nav-link px-2 link-secondary">Home</a></li>
    <li><a href="/view/posts/list.html" class="nav-link px-2 link-dark">List</a></li>
  </ul>

  <div class="col-md-3 text-end">
    <button type="button" class="btn btn-outline-primary me-2" onclick="location.href='/view/user/login.html'">Login</button>
    <button type="button" class="btn btn-primary" onclick="location.href='/view/user/signUp.html'">Sign-up</button>
  </div>
</header>`;

  let yesHeader =
    `
  <header
  class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
  <a href="/view/posts/list.html" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
    <!--<svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">-->
    <!--<img src="https://elice.io/static/dc6054e07cd72edccb4c2f0ceccedb97/cdfa4/elice_logo.webp" alt="">-->
    <H1>게시판</H1>
      
    </svg>
  </a>

  <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    <li><a href="/view/index.html" class="nav-link px-2 link-secondary">Home</a></li>
    <li><a href="/view/posts/list.html" class="nav-link px-2 link-dark">List</a></li>
  </ul>

  

  <div class="col-md-3 text-end">
    <a>${loginInfo}님 로그인 중</a>
    <button type="button" class="btn btn-primary me-2" onclick="logout()">Logout</button>
  </div>
</header>`


  let status = $.cookie("accessToken");


  if (status) {
    // console.log(`status2:: ${status2}`);
    $(".container").prepend(yesHeader);
  } else {
    $(".container").prepend(noHeader);
  }

});

const logout = () => {
  $.removeCookie("accessToken", {
    path: '/'
  });
  location.href = "/view/user/login.html"
}