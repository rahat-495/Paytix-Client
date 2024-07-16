
import { Button } from "@material-tailwind/react";
import Links from "../../Components/NavbarLinks/Links";
import useAuth from "../../Hooks/useAuth";
import useAxioxSecure from "../../Hooks/useAxioxSecure";
import { useMutation } from "@tanstack/react-query";

const Nav = () => {

  const {isLogin} = useAuth() ;
  const axiosSecure = useAxioxSecure() ;

  const {mutateAsync} = useMutation({
    mutationFn : async (token) => {
      const {data} = await axiosSecure.put('/logOut' , token) ;
      return data ;
    } ,
    onSuccess : () => {
      window.location.reload() ;
      localStorage.removeItem('token') ;
    }
  })

  const handleLogOut = async () => {
    await mutateAsync({token : localStorage.getItem('token')})
  } 

  return (
    <div className="min-h-screen max-w-64">
      <div className="px-5 py-10">
        <Links path={'/'} label={"Home"}/>
        {
          isLogin ?
          <Button onClick={handleLogOut}>LogOut</Button> :
          <>
            <Links path={'/login'} label={"Login"}/>
            <Links path={'/SignUp'} label={"Registration"}/>
          </>
        }
      </div>
    </div>
  );
};

export default Nav;
