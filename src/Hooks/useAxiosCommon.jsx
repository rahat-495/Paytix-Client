
import axios from "axios";

const axiosCommon = axios.create({
    baseURL : "https://paytixserver.vercel.app" ,
    withCredentials : true ,
})

const useAxiosCommon = () => {
    return axiosCommon ;
};

export default useAxiosCommon;
