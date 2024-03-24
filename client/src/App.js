import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ObjectDetectionApp from "./components/Obj_detection";
import Home from "./components/Home";
import NoPage from "./components/Nopage";
import Navbar from "./components/Navbar";
const App = ()=>{
  return (
    <div>
      <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Object_detection" element={<ObjectDetectionApp/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App


