import axios from "axios"

export const fetchSigninApi = async (data)=>{
    const response  = await axios({
        method: 'POST',
        url : `${import.meta.env.VITE_API_URL}/auth/signin`,
        data : data,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })

    return response.jwt;
}

export const fetchApiUser = async (jwt)=>{
    const response =await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/user/profile`,
        headers:{
            "Authorization" : `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
      })
    return response;
}

export const fetchApiCountUserByMonth = async (jwt)=>{
    const response =await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/admin/registration-count-by-month`,
        headers:{
            "Authorization" : `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
      })
        return response;
      
}

export const fetchCountUserRegisterToDay = async (jwt,today) =>{
    const response =await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/admin/user-statistics?today=${today}`,
        headers:{
            "Authorization" : `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
      })
        return response;
}

export const fetchTotalUser = async (jwt) =>{
    const response =await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/admin/total-user`,
        headers:{
            "Authorization" : `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
      })
        return response;
}

export const fetchAllIngredient = async (title)=>{
    const response =await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/api/${title}/all`,
      headers:{}
    })
      return response;
  }