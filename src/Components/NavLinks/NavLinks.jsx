
import { Link, useLocation } from "react-router-dom";

const NavLinks = ({path , label}) => {

  const {pathname} = useLocation() ;

  return (
    <Link to={path} className={`link gro`}>
      <span className="mask">
        <div className="link-container">
          <span className="link-title1 title">{label}</span>
          <span className="link-title2 title">{label}</span>
        </div>
      </span>
    </Link>
  );
};

export default NavLinks;
