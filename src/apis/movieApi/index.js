import axios from "axios";

export const fetchAllMovie = async (jwt,page,size,title,direction) =>{
    const response =await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/movie/all?page=${page}&size=${size}&sortBy=${title}&direction=${direction}`,
        headers:{
            "Authorization" : `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
      })
        return response;
}
