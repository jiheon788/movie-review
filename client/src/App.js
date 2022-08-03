import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Review from "./components/Review";
import ReviewCreate from "./components/ReviewCreate";
import ReviewDetail from "./components/ReviewDetail";
import ReviewUpdate from "./components/ReviewUpdate";
import KakaoCallback from "./components/pages/user/kakao/KakaoCallback";
import SocialSignUp from "./components/pages/user/SocialSignUp";

import Store from "./app/Store";
import {Provider} from "react-redux";


function App() {
  return (
    <>
      <Provider store={Store}>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} /> {/* url -> http://localhost:3000/*/}
          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallback />}/>
            <Route path="signUp" element={<SocialSignUp />}/>
          </Route>
          <Route path="review"> 
            <Route path="list" element={<Review />} /> {/* url -> http://localhost:3000/review/list */}
            <Route path="create" element={<ReviewCreate />} /> {/* url -> http://localhost:3000/review/create */}
            <Route path=":id">
              <Route path="detail" element={<ReviewDetail />} /> {/* url -> http://localhost:3000/review/:id/detail */}
              <Route path="update" element={<ReviewUpdate />} /> {/* url -> http://localhost:3000/review/:id/update */}
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
