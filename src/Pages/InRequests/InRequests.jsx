
import { Button, Card, Typography } from "@material-tailwind/react";
import useAxioxSecure from "../../Hooks/useAxioxSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const TABLE_HEAD = ["No.", "Transaction Id", "Amount","Name" ,"Email", "Phone", "Date", "Action"];

const InRequests = () => {

    const axiosSecure = useAxioxSecure() ;

    const email = localStorage.getItem('email') ;
    const phone = localStorage.getItem('phone') ;
    
    const {data , refetch} = useQuery({
        queryKey : ['cashInRequests'] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/cashInRequests?email=${email}&phone=${phone}`) ;
            return data ;
        }
    })

    const {mutate} = useMutation({
        mutationFn : async (id) => {
            const {data} = await axiosSecure.put('/acceptCashIn' , {id}) ;
            return data ;
        }, 
        onSuccess : () => {
            refetch() ;
            Swal.fire({
                title: "Accepted",
                text: "Request Accepted SuccessFully !",
                icon: "success"
            });
        }
    })

    const handleRequest = async (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to accept this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                mutate(id) ;
            }
        });
    }

    return (
        <div className="min-h-[80vh] flex flex-col w-full mx-auto items-center justify-center">
            <div className="flex bg-[#D1D3D6] text-black gro px-10 py-10 rounded-lg w-4/5 flex-col items-center justify-center gap-3">
                <Card className="h-full w-full overflow-x-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                        >
                                        {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item , index) => (
                                <tr key={item._id} className="even:bg-blue-gray-50/50">

                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {index + 1}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?._id}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.amount} TK
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.requesterName}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.requesterEmail}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.requesterPhone}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Button onClick={() => handleRequest(item?._id)} disabled={item?.isAlreadyDone} className={`capitalize gro bg-transparent text-black border shadow-none ${item?.requestStatus === 'pending' ? "text-yellow-900" : "text-green-900"}`}>{item?.requestStatus}</Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

export default InRequests;
