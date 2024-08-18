
import { Input } from "@material-tailwind/react";
import GetUserData from "../../Hooks/GetUserData";
import { toast, ToastContainer } from "react-toastify";
import bcript from 'bcryptjs'
import useAxioxSecure from "../../Hooks/useAxioxSecure";
import Swal from 'sweetalert2' ;

const SendMoney = () => {

    const {data} = GetUserData() ;
    const axiosSecure = useAxioxSecure() ;

    const handleSubmit = async (e) => {
        e.preventDefault() ;

        const form = e.target ;
        const sendingInfo = form.sendingInfo.value ;
        const amount = parseFloat(form.amount.value) ;
        const pin = form.pin.value ;
        const sendingData = {
            sendingInfo , 
            amount ,
            ...data ,
        }

        if(data?.balance >= amount){
            if(amount > 100){
                const isCurrectPin = await bcript.compare(pin , data?.hashPin);
                if(isCurrectPin){
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to send !",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes"
                      }).then((result) => {
                        if (result.isConfirmed) {
                            axiosSecure.post('/sendMoney' , {...sendingData , amount : amount + 5})
                            .then((res) => {
                                if(res?.data?.insertedId){
                                    Swal.fire({
                                        title: "Send",
                                        text: "Money send success fully .",
                                        icon: "success"
                                    });
                                    form.reset() ;
                                }
                            })
                        }
                    });
                }
                else{
                    toast.warning("The Pin Was Wrong !")
                }
            }
            else if(amount >= 50){
                const isCurrectPin = await bcript.compare(pin , data?.hashPin);
                if(isCurrectPin){
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to send !",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes"
                      }).then((result) => {
                        if (result.isConfirmed) {
                            axiosSecure.post('/sendMoney' , sendingData)
                            .then((res) => {
                                if(res?.data?.insertedId){
                                    Swal.fire({
                                        title: "Send",
                                        text: "Money send success fully .",
                                        icon: "success"
                                    });
                                    form.reset() ;
                                }
                            })
                        }
                    });
                }
                else{
                    toast.warning("The Pin Was Wrong !")
                }
            }
            else{
                toast.warning("Less than 50 taka is not allowed for transactions")
            }
        }
        else{
            return toast.warning(`Your Balance is low !`) ;
        }
        
    }

    return (
        <div className="min-h-[80vh] flex flex-col w-full mx-auto items-center justify-center">
            <h1 className="play text-4xl mb-10 font-semibold">Send Money</h1>
            <div className="flex bg-[#8b8b8b] text-black gro px-10 py-10 rounded-lg w-2/4 flex-col items-center justify-center gap-3">
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 w-2/4">
                    <Input type="text" name="sendingInfo" required color="white" label="Email or Phone"/>
                    <Input type="number" name="amount" required color="white" label="Amount"/>
                    <Input type="number" color="white" name="pin" label="Enter Your Pin"/>
                    <input type="submit" value="Proceed" className="btn btn-outline text-white w-full" />
                </form>

            </div>

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

export default SendMoney;
