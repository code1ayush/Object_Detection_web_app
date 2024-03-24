import '../App.css'; 
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import "../Home.css"
const Home = () => {
  return (
     <div>
      <Navbar/>
      <div className="home_container">
        <div className='image-container'>
          <img src="../../homepage1.svg" className='home-img'/>
        </div>
        <div className='text-container'>
         <div> Welcome to our site! 
          <br></br>Discover the power of seamless vehicle detection and counting. Drive smarter with us.</div>
        <div>
        <div className='btn-class'>
        <button className='home-btn'><Link to="/Object_detection" className='text'>Enter</Link></button>
        </div>
        </div>
        </div>       

    </div>
     </div>
  );
};

export default Home;
