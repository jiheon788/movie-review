# Movie Review

> Movie Review web Developed with MERN full stack.

<div align='center'>
<img src="https://user-images.githubusercontent.com/90181028/218302744-52547eff-7277-48b8-a80b-602cdf409d40.png" width="250px" />
</div>

<img src="https://user-images.githubusercontent.com/90181028/208368767-8c80973b-911e-400a-9c03-7f333a9016b8.png" align="right" width="230px" />

### MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs. MERN stack is the idea of using Javascript/Node for fullstack web development.

This is a repository that practiced the development of the full stack of MERN stacks.

This code implements JWT authentication, OAuth, CRUD, and page functions.

<br>

## Client-side usage(PORT: 3000)

```bash
# in the root level
$ cd client

$ npm i

$ npm start
```

You need to add rest api key & server url in src/config

```json
// src/config/key.json
{
  "REST_API_KEY": your rest api key (kakao)
}

// src/config/port.json
{
  "url": your server url
}
```

## Server-side usage(PORT: 8080)

```bash
# in the root level
$ cd server

$ npm i

$ npm start
or
$ nodemon app.js
```

## Features

- Authenticate users via JWT (login/signup/logout)
- OAuth (Kakao login)
- CR-- user
- CRUD reviews
- GET and display paginated lists of reviews

## Tech Stack

`MongoDB`, `Express`, `React`, `Node`, `Redux`, `Bootstrap`, `Axios`

## Demo of this project

![](https://velog.velcdn.com/images/jiheon788/post/ee2bb3e4-3f68-412c-beac-2efc4713c917/image.gif)
