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
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';


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
            <div className="nav-link-container">
                <VscListUnordered size={22} />
                <span className="nav-label">Watchlist</span>
            </div>
        </Link>

        <Link to="/portfolio" className={`nav-link ${isActive("/portfolio")}`}>
            <div className="nav-link-container">
                <AutoGraphOutlinedIcon size={22}/>
                <span className="nav-label">Portfolio</span>
            </div>
        </Link>

        <Link to="/simulate" className={`nav-link ${isActive("/simulate")}`}>
            <div className="nav-link-container">
                <CandlestickChartOutlinedIcon size={22} style={{fontSize:"26px"}}/>
                <span className="nav-label">Trading Platform</span>
            </div>
        </Link>

        <Link to="/alert" className={`nav-link ${isActive("/alert")}`}>
            <div className="nav-link-container">
                <NotificationsNoneOutlinedIcon size={22} style={{fontSize:"26px"}}/>
                <span className="nav-label">Alerts</span>
            </div>
        </Link>

        <Link to="/summary" className={`nav-link ${isActive("/summary")}`}>
            <div className="nav-link-container">
                <AssignmentOutlinedIcon size={22}/>
                <span className="nav-label">Summary Report</span>
            </div>
        </Link>

        <Link to="/education" className={`nav-link ${isActive("/education")}`}>
            <div className="nav-link-container">
                <AutoStoriesOutlinedIcon size={22} style={{fontSize:"22px"}}/>
                <span className="nav-label">Educational Resources</span>
            </div>
        </Link>

        <Link to="/forum" className={`nav-link ${isActive("/forum")}`}>
            <div className="nav-link-container">
                <BsChatText size={22} />
                <span className="nav-label">Support Forum</span>
            </div>
        </Link>

        <Link to="/news" className={`nav-link ${isActive("/news")}`}>
            <div className="nav-link-container">
                <NewspaperOutlinedIcon size={22} style={{fontSize:"22px"}}/>
                <span className="nav-label">Crypto News</span>
            </div>
        </Link>

        <Link to="/suggestion" className={`nav-link ${isActive("/suggestion")}`}>
            <div className="nav-link-container">
                <TipsAndUpdatesOutlinedIcon size={22} style={{marginLeft:"4px"}}/>
                <span className="nav-label">Suggestions</span>
            </div>
        </Link>

        <Link to="/externalwallet" target="blank" className={`nav-link ${isActive("/externalwallet")}`}>
            <div className="nav-link-container">
                <GppBadOutlinedIcon size={22} style={{fontSize:"25px"}}/>
                <span className="nav-label">TradeX Wallet</span>
            </div>
        </Link>

      </nav>
    </div>
  );
}