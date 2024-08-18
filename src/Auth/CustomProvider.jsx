
import { createContext, useEffect, useState } from "react";
import useAxioxSecure from "../Hooks/useAxioxSecure";

export const CustomContext = createContext(null) ;

const CustomProvider = ({children}) => {
    
    const axiosSecure = useAxioxSecure() ;
    const [isLogin , setIsLogin] = useState(false) ;

    useEffect(() => {
        if(localStorage.getItem('token')){
            axiosSecure.get(`/isLogin?token=${localStorage.getItem('token')}`)
            .then((res) => {
                localStorage.setItem('email' , res?.data?.email) ;
                localStorage.setItem('phone' , res?.data?.phone) ;
                setIsLogin(res?.data?.isLogin) ;
            })
        }
    } , [axiosSecure])

    const userInfo = {
        isLogin ,
        setIsLogin ,
    }

    return (
        <CustomContext.Provider value={userInfo}>
            {children}
        </CustomContext.Provider>
    );
};

export default CustomProvider;
