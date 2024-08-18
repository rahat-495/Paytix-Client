
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const GetUserData = () => {

    const axiosCommon = useAxiosCommon() ;

    const {data , refetch} = useQuery({ 
        queryKe : ['currentUserData'] ,
        queryFn : async () => {
            const {data} = await axiosCommon.get(`/currentUserData?email=${localStorage.getItem('email')}&phone=${localStorage.getItem('phone')}`) ;
            return data ;
        },
    })
    return {data , refetch} ;
};

export default GetUserData;
