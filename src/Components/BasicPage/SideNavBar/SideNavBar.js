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

import { VscListUnordered } from "react-icons/vsc";
import { FaRegChartBar } from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";
import { ImNewspaper } from "react-icons/im";
import { PiStarFourLight } from "react-icons/pi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaRegBell } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";


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

        <Link to="/watchlist" className={`nav-link ${isActive("/watchlist")}`}>
          <VscListUnordered size={23} />
        </Link>

        <Link to="/portfolio" className={`nav-link ${isActive("/portfolio")}`}>
            <FaRegChartBar size={23}/>
        </Link>

        <Link to="/simulate" className={`nav-link ${isActive("/simulate")}`}>
            <BiCandles size={23}/>
        </Link>

        <Link to="/alert" className={`nav-link ${isActive("/alert")}`}>
            <FaRegBell size={23}/>
        </Link>

        <Link to="/summary" className={`nav-link ${isActive("/summary")}`}>
            <LiaClipboardListSolid size={23}/>
        </Link>

        <Link to="/education" className={`nav-link ${isActive("/education")}`}>
            <SlBookOpen size={23}/>
        </Link>

        <Link to="/forum" className={`nav-link ${isActive("/forum")}`}>
            <BsChatText size={23}/>
        </Link>

        <Link to="/news" className={`nav-link ${isActive("/news")}`}>
            <ImNewspaper size={23}/>
        </Link>

        <Link to="/suggestion" className={`nav-link ${isActive("/suggestion")}`}>
            <PiStarFourLight size={23}/>
        </Link>

        <Link to="/externalwallet" className={`nav-link ${isActive("/externalwallet")}`}>
            <SlWallet size={23}/>
        </Link>

      </nav>
    </div>
  );
}