import '../App.css'; 
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home_container">
        <div>
      <h1>Home</h1>
      <Link to="/object_detection">Go to Object Detection</Link>
        </div>
    </div>
  );
};

export default Home;
