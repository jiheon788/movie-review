$(document).ready(() => {
  // 클라이언트가 서버한테 요청
  getList()
});

const getList = () => {

  $(".postsList").empty();

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/posts/',
    headers: {
      accessToken: $.cookie("accessToken")
    },
    success: (res) => {
      // console.log(res);
      let listData;

      res.map((it, index) => { //본인 일치하는 메일
        if (sessionStorage.getItem("email") == it.author.email) {
          listData =
            `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${it.title}</td>
            <td>${it.content}</td>
            <td>${it.author.name}</td>
  
            <td>
              <button type="button" onclick="deletePost('${it.shortId}')" class="btn btn-outline-primary">Delete</button>
              <button type="button" onclick="updatePost('${it.shortId}')" class="btn btn-outline-primary">Update</button>
            </td>
          </tr>
          `;
        } else { // 일치하지 않은 메일
          listData =
            `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${it.title}</td>
            <td>${it.content}</td>
            <td>${it.author.name}</td>
  
            <td>
              
            </td>
          </tr>
          `;
        }
        // console.log(it);

        $(".postsList").append(listData);
      })
    },
    error: (res) => {
      alert(res.responseJSON.message);
      location.href = "/view/user/login.html";
    }
  });
};

const deletePost = (shortId) => {
  console.log(shortId);
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/posts/${shortId}/delete/`,
    headers: {
      accessToken: $.cookie("accessToken")
    },
    success: (res) => {
      alert(res.result);
      getList(); // 새로운 리스트 가져옴
    }
  })
}

const updatePost = (shortId) => {
  // console.log(JSON.stringify(shortId))
  console.log(shortId);



  window.localStorage.setItem("shortId", shortId);

  location.href = "/view/posts/updateEdit.html"

}