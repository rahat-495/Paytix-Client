
import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxioxSecure from "../../Hooks/useAxioxSecure";
import GetUserData from "../../Hooks/GetUserData";

const TABLE_HEAD = ["No.", "Transaction Id", "Transaction Type" , "Amount", "To", "Date", "Time"];

const Transaction = () => {
    
    const axiosSecure = useAxioxSecure() ;
    const {data : userInfo} = GetUserData() ;
    const email = localStorage.getItem('email') ;
    const phone = localStorage.getItem('phone') ;

    const {data , isLoading} = useQuery({
        queryKey : ['userTransactions'] ,
        queryFn : async () => {
            if(userInfo?.role === 'agent'){
                const {data} = await axiosSecure.get(`/agentTransactions?email=${email}&phone=${phone}`) ;
                return data ;
            }
            else if(userInfo?.role === 'user'){
                const {data} = await axiosSecure.get(`/userTransactions?email=${email}&phone=${phone}`) ;
                return data ;
            }
            else if(userInfo?.role === 'admin'){
                const {data} = await axiosSecure.get(`/adminTransactions?email=${email}&phone=${phone}`) ;
                return data ;
            }
        }
    })

    if(isLoading){
        return <div className="flex min-h-screen items-center justify-center"><span className="loading loading-dots w-28"></span></div>
    }

    return (
        <div className="min-h-[80vh] flex flex-col w-full mx-auto items-center justify-center">
            <div className="flex bg-[#D1D3D6] my-14 text-black gro px-10 py-10 rounded-lg w-4/5 flex-col items-center justify-center gap-3">
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
                                        <Typography variant="small" color="blue-gray" className="font-normal capitalize">
                                            {item?.transactionType}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.amount} TK
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.to}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.date}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.time}
                                        </Typography>
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

export default Transaction;
