import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  headers:{
    "Content-Type":"application/json"
  }
});


function getToken (){
   const token = localStorage.getItem('token')
   return token
} 

api.interceptors.request.use((config)=>{
  const token= getToken()
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return  config
},
(error)=>{
  console.log(error);
  
}

)

export default api;