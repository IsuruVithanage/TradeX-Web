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
      {[
          SideNavIcon({
            url: "/", 
            children: <BiHomeAlt size={23}/>
          }),
          
          SideNavIcon({
            url: "/watchlist", 
            children: <IoIosMenu size={23} />
          }),

          SideNavIcon({
            url: "/portfolio", 
            children: <BiBarChartAlt size={23}/>
          }),

          SideNavIcon({
            url: "/forum", 
            children: <BsChatText />
          }),

          SideNavIcon({
            url: "/dataVisualization", 
            children: <FaRegFileAlt />
          }),

          SideNavIcon({
            url: "/settings", 
            children: <SlSettings />
          }),

          SideNavIcon({
            url: "/trade", 
            children: <BiCandles size={23}/>
          }),

          SideNavIcon({
            url: "/educatiion", 
            children: <IoMdBook size={23}/>
          }),

          SideNavIcon({
            url: "/news", 
            children: <AiOutlineFileSearch size={23}/>
          }),

          SideNavIcon({
            url: "/alert", 
            children: <GoBell size={23}/>
          }),
        ]}
      </nav>
    </div>
  );
}


function SideNavIcon(props) {

  const curretLocation = useLocation().pathname;

  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    setActiveIcon(curretLocation);
  }, [curretLocation]);

  return (
    <Link
        to={props.url}
        className={`nav-link ${activeIcon === props.url ? "active" : ""}`}>
        {props.children}
    </Link>
  );
}
