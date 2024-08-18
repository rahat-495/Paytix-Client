
import { useEffect } from "react";
import GetUserData from "../../Hooks/GetUserData";

const Profile = () => {

    const {data , refetch} = GetUserData() ;
    
    useEffect(() => {
        if(!data?.name){
            refetch() ;
        }
    } , [data , refetch])

    return (
        <div className="min-h-[80vh] flex flex-col w-full mx-auto items-center justify-center">
            <div className="flex bg-[#D1D3D6] text-black gro px-10 py-10 rounded-lg w-2/4 flex-col items-center justify-center gap-3">
                
                <div className="grid grid-cols-2 gap-y-2">
                    <h1 className=""> <span className="gro font-bold text-xl">Name : </span> {data?.name}</h1>
                    <h1 className=""> <span className="gro font-bold text-xl">Email : </span> {data?.email}</h1>
                    <h1 className=""> <span className="gro font-bold text-xl">Phone : </span> {data?.phone}</h1>
                    <h1 className=""> <span className="gro font-bold text-xl">User Id :</span> {data?._id}</h1>
                    <h1 className=""> <span className="gro font-bold text-xl">Balance : </span> {data?.balance} Taka</h1>
                    <h1 className="capitalize"> <span className="gro font-bold text-xl">User Status :</span> {data?.userStatus}</h1>
                </div>

            </div>
        </div>
    );
};

export default Profile;
