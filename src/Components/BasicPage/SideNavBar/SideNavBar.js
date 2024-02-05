import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiBarChartAlt, BiCandles, BiHomeAlt } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { IoIosMenu, IoMdBook } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import { AiOutlineFileSearch } from "react-icons/ai";
import "./SideNavBar.css";


export default function SideNavBar() {
  const currentLocation = useLocation().pathname;

  const [activeIcon, setActiveIcon] = useState(currentLocation);

  useEffect(() => {
    setActiveIcon(currentLocation);
  }, [currentLocation]);

  const isActive = (path) => {
    return  ((path === "/") ? 
            activeIcon === "/" : 
            activeIcon.startsWith(path))? 
            "active" : "";
  };

  return (
    <div className="side-navbar">
      <div className="logo-container">
        <img
          src="https://i.postimg.cc/gcfCW5yn/tlogo2.png"
          alt="Logo"
          width={60}
        />
      </div>

      <nav className="icon-container">
        <Link to="/" className={`nav-link ${isActive("/")}`}>
          <BiHomeAlt size={23}/>
        </Link>

        <Link to="/watchlist" className={`nav-link ${isActive("/watchlist")}`}>
          <IoIosMenu size={23} />
        </Link>

        <Link to="/portfolio" className={`nav-link ${isActive("/portfolio")}`}>
            <BiBarChartAlt size={23}/>
        </Link>

        <Link to="/forum" className={`nav-link ${isActive("/forum")}`}>
            <BsChatText size={23}/>
        </Link>

        <Link to="/dataVisualization" className={`nav-link ${isActive("/dataVisualization")}`}>
            <FaRegFileAlt size={23}/>
        </Link>

        <Link to="/externalwallet" className={`nav-link ${isActive("/externalwallet")}`}>
            <SlSettings size={23}/>
        </Link>

        <Link to="/simulate" className={`nav-link ${isActive("/simulate")}`}>
            <BiCandles size={23}/>
        </Link>

        <Link to="/education" className={`nav-link ${isActive("/education")}`}>
            <IoMdBook size={23}/>
        </Link>

        <Link to="/news" className={`nav-link ${isActive("/news")}`}>
            <AiOutlineFileSearch size={23}/>
        </Link>

        <Link to="/alert" className={`nav-link ${isActive("/alert")}`}>
            <GoBell size={23}/>
        </Link>
      </nav>
    </div>
  );
}