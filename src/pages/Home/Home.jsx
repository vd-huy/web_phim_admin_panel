import Sidebar from "../../components/Sidebar";
import AdminRouter from "../../route/AdminRouter";
import NavBar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllIngredient, fetchApiUser } from "../../apis";
import { getProfile } from "../../redux/userSlice";
import Footer from "../../components/Footer";
import { Divider } from "@mui/material";
import { getCategory } from "../../redux/categorySlice";
import { getCountry } from "../../redux/countrySlice";
import { getGenre } from "../../redux/genreSlice";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  const handleShowSidebar = () => {
    setShow((prev) => !prev);
  };

  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
  const expirationTime = localStorage.getItem("expirationTime");

  if (jwt && expirationTime) {
    const now = new Date();
    if (now.getTime() > expirationTime) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("expirationTime");
    }
  }

  useEffect(() => {
    const fetchAllApi = async () => {
      if (jwt) {
        try {
          const [
            userResponse,
            countryResponse,
            categoryResponse,
            genreResponse,
          ] = await Promise.all([
            fetchApiUser(jwt),
            fetchAllIngredient("country"),
            fetchAllIngredient("category"),
            fetchAllIngredient("genre"),
          ]);

          dispatch(getProfile(userResponse.data));
          dispatch(getCategory(categoryResponse.data));
          dispatch(getCountry(countryResponse.data));
          dispatch(getGenre(genreResponse.data));
        } catch (error) {
          console.log(error);
        }
      }else{
        navigate("/account/login")
      }
    };

    fetchAllApi();
  }, [jwt]);

  return (
    <div
      className="h-[100%] text-black"
      style={{ backgroundColor: "rgb(250, 250, 251)" }}
    >
      {show && <Sidebar />}

      <div
        style={show ? { marginLeft: "240px" } : { marginLeft: 0 }}
        className="transition-all"
      >
        <NavBar handleShowSidebar={handleShowSidebar} />
        <AdminRouter />
        <Divider />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
