import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Category from "../components/category/Category";


const AdminRouter = () => {
  return (
    <div>
      <Routes>
          <Route index element={<Dashboard/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
