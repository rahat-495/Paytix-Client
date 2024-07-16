
import { Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const Links = ({path , label}) => {
    return (
        <Typography as="li" className="p-1 font-normal text-black text-xl gro">
          <NavLink
            to={path}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "font-semibold underline transition-all ease-in-out duration-300" : ""
            }
          >
            {label}
          </NavLink>
        </Typography>
    );
};

export default Links;
