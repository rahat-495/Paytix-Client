import axios from "axios";

const axiosSecure = axios.create({
    baseURL : "http://localhost:5555" ,
    withCredentials : true ,
})

const useAxioxSecure = () => {
    axiosSecure.interceptors.request.use((res) => {
        const token = localStorage.getItem('token') ;
        res.headers.Authorization = token ;
        return res ;
    } , (error) => {
        console.log(error) ;
        return Promise.reject(error) ;
    })
    return axiosSecure ;
};

export default useAxioxSecure;
