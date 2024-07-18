import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Category from "../components/category/Category";
import UpdateCategory from "../components/category/UpdateCategory";
import Country from "../components/country/Country";
import UpdateCountry from "../components/country/UpdateCountry";
import Genre from "../components/genre/Genre";
import UpdateGenre from "../components/genre/UpdateGenre";
import Movie from "../components/movie/Movie";
import AddMovie from "../components/movie/AddMovie";
import UpdateMovie from "../components/movie/UpdateMovie";


const AdminRouter = () => {
  return (
    <div>
      <Routes>
          <Route index element={<Dashboard/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category/update/:id" element={<UpdateCategory />} />
          <Route path="/category" element={<Category />} />
          <Route path="/country/update/:id" element={<UpdateCountry />} />
          <Route path="/country" element={<Country />} />
          <Route path="/genre/update/:id" element={<UpdateGenre />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/movie/update/:id" element={<UpdateMovie />} />
          <Route path="/movie/add-new" element={<AddMovie />} />
          <Route path="/movie" element={<Movie />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
