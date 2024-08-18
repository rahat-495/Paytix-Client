
import { Button } from "@material-tailwind/react";
import Links from "../../Components/NavbarLinks/Links";
import useAuth from "../../Hooks/useAuth";
import useAxioxSecure from "../../Hooks/useAxioxSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import GetUserData from "../../Hooks/GetUserData";

const Nav = () => {

  const {data} = GetUserData() ;
  const {isLogin} = useAuth() ;
  const axiosSecure = useAxioxSecure() ;
  const navigate = useNavigate() ;

  const {mutateAsync} = useMutation({
    mutationFn : async (token) => {
      const {data} = await axiosSecure.put('/logOut' , token) ;
      return data ;
    } ,
    onSuccess : () => {
      navigate('/')
      window.location.reload() ;
      localStorage.removeItem('token') ;
      localStorage.removeItem('email') ;
      localStorage.removeItem('phone') ;
    }
  })
  
  const handleLogOut = async () => {
    await mutateAsync({token : localStorage.getItem('token')}) ;
  } 

  return (
    <div className="min-h-screen max-w-64">
      <div className={`${data?.role === 'agent' ? "px-2" : 'px-5'} py-10`}>
        {
          isLogin ?
          <> 
            {
              data?.role === "user" &&
              <>
                <Links path={'/profile'} label={"Profile"}/>
                <Links path={'/sendMoney'} label={"Send Money"}/>
                <Links path={'/cashOut'} label={"Cash Out"}/>
                <Links path={'/cashIn'} label={"Cash In"}/>
                <Links path={'/transactions'} label={"Transactions"}/>
              </>
            }
            {
              data?.role === "agent" &&
              <>
                <Links path={'/profile'} label={"Profile"}/>
                <Links path={'/sendMoney'} label={"Send Money"}/>
                <Links path={'/outRequests'} label={"Cash Out Request"}/>
                <Links path={'/inRequests'} label={"Cash In Request"}/>
                <Links path={'/transactions'} label={"Transactions"}/>
              </>
            }
            {
              data?.role === "admin" &&
              <>
                <Links path={'/profile'} label={"Profile"}/>
                <Links path={'/sendMoney'} label={"Send Money"}/>
                <Links path={'/transactions'} label={"Transactions"}/>
                <Links path={'/users'} label={"Users"}/>
              </>
            }
            <Button onClick={handleLogOut} className="w-full mt-5">LogOut</Button>
          </> :
          <>
            <Links path={'/'} label={"Login"}/>
            <Links path={'/SignUp'} label={"Registration"}/>
          </>
        }
      </div>
    </div>
  );
};

export default Nav;
