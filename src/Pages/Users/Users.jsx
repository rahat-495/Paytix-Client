
import { Button, Card, Input, Option, Select, Typography } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxioxSecure from "../../Hooks/useAxioxSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const TABLE_HEAD = ["No.", "User Id", "Name" , "Email", "Phone", "Status", "Bounes", "Action"];

const Users = () => {

    const [name , setName] = useState('') ;
    const [phone , setPhone] = useState('') ;
    const [activity , setActivity] = useState('') ;
    const axiosSecure = useAxioxSecure() ;

    const {data , refetch} = useQuery({
        queryKey : ['users' , name , phone , activity] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/users?name=${name}&phone=${phone}&activity=${activity}`) ;
            return data ;
        }
    })

    const {mutate : mutateStatus} = useMutation({
        mutationFn : async ({id , status}) => {
            const {data} = await axiosSecure.patch('/updateUserStatus' , {id , status}) ;
            return data ;
        }, 
        onSuccess : () => {
            refetch() ;
            Swal.fire({
                title: "Account Activated",
                text: "Account Activated successFully !",
                icon: "success"
            });
        }
    })

    const handleStatus = async (id , status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to activate this account ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "do it"
          }).then((result) => {
            if (result.isConfirmed) {
                mutateStatus({id , status})
            }
        });
    }

    const {mutate : mutateBounes} = useMutation({
        mutationFn : async ({id , role}) => {
            const {data} = await axiosSecure.patch('/sendUserBounes' , {id , role}) ;
            return data ;
        }, 
        onSuccess : () => {
            refetch() ;
            Swal.fire({
                title: "Account Activated",
                text: "Account Activated successFully !",
                icon: "success"
            });
        }
    })

    const handleBounes = async (id , role) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to send the bounes",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "do it"
          }).then((result) => {
            if (result.isConfirmed) {
                mutateBounes({id , role})
            }
        });
    }

    const {mutate : mutateBlock} = useMutation({
        mutationFn : async ({id , isBlock}) => {
            const {data} = await axiosSecure.patch('/blockAUser' , {id , isBlock}) ;
            return data ;
        }, 
        onSuccess : () => {
            refetch() ;
        }
    })

    const handleBlock = async (id , isBlock) => {
        if(isBlock === 'active'){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to Block him !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes block"
              }).then((result) => {
                if (result.isConfirmed) {
                    mutateBlock({id , isBlock}) ;
                    Swal.fire({
                        title: "Account Blocked !",
                        text: "Account Blocked successFully !",
                        icon: "success"
                    });
                }
            });
        }
        else{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to unBlock him !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes Do It"
              }).then((result) => {
                if (result.isConfirmed) {
                    mutateBlock({id , isBlock}) ;
                    Swal.fire({
                        title: "Account unBlocked !",
                        text: "Account unBlocked successFully !",
                        icon: "success"
                    });
                }
            });
        }
    }

    return (
        <div className="min-h-[80vh] flex flex-col w-full mx-auto items-center justify-center">
            <div className="flex bg-[#D1D3D6] my-14 text-black gro px-10 py-10 rounded-lg w-4/5 flex-col items-center justify-center gap-3">

                <div className="w-full grid grid-cols-3 gap-3">
                    <Input onChange={(e) => setName(e.target.value)} color="black" label="Name" type="text" />
                    <Input onChange={(e) => setPhone(e.target.value)} color="black" label="Phone" type="number" />
                    <Select onChange={(e) => setActivity(e)} className="text-black" label="Active or Blocked">
                        <Option value="all">All</Option>
                        <Option value="active">Active</Option>
                        <Option value="blocked">Blocked</Option>
                    </Select>
                </div>

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
                                            {item?.name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.email}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item?.phone}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {
                                                item?.userStatus &&
                                                <Button disabled={item?.userStatus === "active"} onClick={() => handleStatus(item?._id , item?.userStatus)} className={`bg-transparent border shadow-none ${item.userStatus === "pending" ? "text-yellow-600" : "text-green-900"} gro capitalize`}>{item.userStatus}</Button> 
                                            }
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {
                                                item?.isGivedBounes ? 
                                                <Button className="bg-transparent border shadow-none text-black gro capitalize hover:bg-[#212121] hover:text-white">Already Given</Button> : 
                                                <Button disabled={item?.role === "admin"} onClick={() => handleBounes(item?._id , item?.role)} className="bg-transparent border shadow-none text-black gro capitalize hover:bg-[#212121] hover:text-white">Give Now</Button> 
                                            }
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {
                                                item?.isBlock === "active" ? 
                                                <Button disabled={item?.role === 'admin'} onClick={() => handleBlock(item?._id , item?.isBlock)} className="bg-transparent border shadow-none text-black gro capitalize hover:bg-[#212121] hover:text-white">Block</Button> :
                                                <Button disabled={item?.role === 'admin'} onClick={() => handleBlock(item?._id , item?.isBlock)} className="bg-transparent border shadow-none text-black gro capitalize hover:bg-[#212121] hover:text-white">Blocked</Button> 
                                            }
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

export default Users;
