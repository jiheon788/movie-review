import { configureStore } from "@reduxjs/toolkit";
import Data from "./reducer/Data"

export default configureStore({
  reducer:{
    id:Data
  }
})