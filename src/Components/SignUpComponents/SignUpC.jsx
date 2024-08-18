
import {
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const SignUpC = () => {

  const navigate = useNavigate() ;
  const axiosCommon = useAxiosCommon() ;
  const [errorText, setErrorText] = useState("");
  const [remember , setRemember] = useState(false) ;
  const [role , setRole] = useState("user") ;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pin = form.pin.value;
    const phone = form.phone.value;
    const info = {
      pin ,
      name , 
      email ,
      phone ,
      role ,
      balance : 0 ,
      isLogin : false ,
      userStatus : "pending" ,
      isBlock : false ,
      isGivedBounes : false ,
    }

    if (remember) {
      const {data} = await axiosCommon.post('/register' , info) ;
      if(data?.insertedId){
        const {data} = await axiosCommon.post('/jwt' , {email}) ;
        localStorage.setItem("token" , data?.token) ;
        toast.success("Register SuccessFully !") ;
        setTimeout(() => {
          navigate('/profile') ;
          if(data?.token){
            window.location.reload() ;
          }
        } , 1000)
      }
      else if(!data?.success){
        toast.warning("Account Already Axist, plz Login !")
      }
    } else {
      setErrorText("Please Accept Our Turms & Condition !");
    }
  };

  return (
    <div>
      <CardBody className="flex flex-col px-0 gap-4">
        <form onSubmit={handleSubmit} className="gap-3 flex flex-col">
          <Input
            className="h-full"
            required
            type="text"
            name="name"
            label="Name"
            size="lg"
          />

          <Input required type="email" name="email" label="Email" size="lg" />
          <Input required type="number" min={0} name="phone" label="Mobile" size="lg" />

          <div className="relative">
            <Input
              min={10000}
              max={99999}
              maxLength={5}
              className="z-0"
              type={"number"}
              name="pin"
              label="5 - Digit Pin"
              size="lg"
              required
            />
          </div>

          <Select onChange={(e) => setRole(e)} name="role" label="User Or Agent">
            <Option value="user">User</Option>
            <Option value="agent">Agent</Option>
          </Select>

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
              <p className="text-red-800 play font-semibold">{errorText}</p>
            )}
          </div>

          <div className="col-span-2">
            <input
              type="submit"
              className="w-full btn text-gray-800 hover:text-white btn-outline hover:bg-[#393939]"
              value={"Sign Up"}
            />
          </div>
        </form>
      </CardBody>

      <CardFooter className="pt-0">
        <Typography variant="small" className="mt-6 flex justify-center">
          Already have an account?
          <Link
            className="text-blue-gray-900 font-bold mx-1 hover:underline"
            to={"/login"}
          >
            Login
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

export default SignUpC;
