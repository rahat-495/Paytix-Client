
import { CardBody, CardFooter, Checkbox, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const LoginC = () => {

    const navigate = useNavigate() ;
    const axiosCommon = useAxiosCommon() ;
    const [remember , setRemember] = useState(false) ;
    const [errorText , setErrorText] = useState('') ;

    const handleSubmit = async (e) => {
        e.preventDefault() ;
    
        const form = e.target ;
        const email = form.email.value ;
        const pin = form.pin.value ;
    
        if(remember){
          const {data} = await axiosCommon.post('/login' , {query : email , pin}) ;
          if(data?.success){
            const {data} = await axiosCommon.post('/jwt' , {email}) ;
            localStorage.setItem("token" , data?.token) ;
            toast.success("Login Success Fully !") ;
            setTimeout(() => {
              navigate('/') ;
              if(data?.token){
                window.location.reload() ;
              }
            } , 1000)
          }
          else if(!data?.success){
            toast.warning("Pin Is Not Matched !") ;
          }
        }
        else{
          setErrorText('Please Accept Our Turms & Condition !') ;
        }
    }

  return (
    <div>
      <CardBody className="flex px-0 flex-col">
        <form onSubmit={handleSubmit} className="flex mx-0 flex-col gap-3">
          <Input required name="email" label="Email / Phone" size="lg" />
          <div className="relative">
            <Input
              className="z-0"
              min={0}
              type={"number"}
              name="pin"
              label="Account Pin"
              size="lg"
              required
            />
          </div>

            <div className="-ml-2.5">
              <Checkbox
                onClick={() => setRemember(!remember)}
                label="Turms & Condition"
              />
            </div>

            <div>
              {remember ? (
                <p></p>
              ) : (
                <p className="text-red-800 font-semibold play">{errorText}</p>
              )}
            </div>

          <input
            type="submit"
            className="w-full btn text-gray-800 hover:text-white btn-outline hover:bg-[#393939]"
            value={"Log In"}
          />

        </form>
      </CardBody>

      <CardFooter className="pt-0 mx-0">
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Link
            className="text-blue-gray-900 font-bold mx-1 hover:underline"
            to={"/signUp"}
          >
            Sign Up
          </Link>
        </Typography>
      </CardFooter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginC;
