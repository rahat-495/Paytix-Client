
import { useContext } from "react";
import { CustomContext } from "../Auth/CustomProvider";

const useAuth = () => {
    const auth = useContext(CustomContext) ;
    return auth ;
};

export default useAuth;
