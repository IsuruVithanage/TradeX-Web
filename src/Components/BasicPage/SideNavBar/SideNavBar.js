import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import { MdOutlineCandlestickChart } from "react-icons/md";


import { VscListUnordered } from "react-icons/vsc";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlineAutoStories } from "react-icons/md";
import { BsChatText } from "react-icons/bs";
import { MdOutlineNewspaper } from "react-icons/md";
import { MdOutlineTipsAndUpdates } from "react-icons/md";



import { FaRegBell } from "react-icons/fa";


import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import "./SideNavBar.css";

export default function SideNavBar() {
    const currentLocation = useLocation().pathname;
    const navigate = useNavigate();
    const [activeIcon, setActiveIcon] = useState(currentLocation);


    useEffect(() => {
        setActiveIcon(currentLocation);
    }, [currentLocation]);


    const isActive = (path) => {
        return (activeIcon.startsWith(path)) ? "active" : "";
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
                <div 
                    className={`nav-link ${isActive("/watchlist")}`}
                    onClick={() => navigate("/watchlist")}>
                    <VscListUnordered size={22} />
                    <span className="nav-label">Watchlist</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/portfolio")}`}
                    onClick={() => navigate("/portfolio")}>
                    <MdAutoGraph size={23} />
                    <span className="nav-label">Portfolio</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/simulate")}`}
                    onClick={() => navigate("/simulate")}>
                    <MdOutlineCurrencyExchange size={20} style={{ fontSize: "26px" }} />
                    <span className="nav-label">Trading Platform</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/alert")}`}
                    onClick={() => navigate("/alert")}>
                    <FaRegBell size={21} style={{ fontSize: "26px" }} />
                    <span className="nav-label">Price Alerts</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/summary")}`}
                    onClick={() => navigate("/summary/daily")}>
                    <MdOutlineAssignment size={23} />
                    <span className="nav-label">Summary Report</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/education")}`}
                    onClick={() => navigate("/education")}>
                    <MdOutlineAutoStories size={21} style={{ fontSize: "22px" }} />
                    <span className="nav-label">Educational Resources</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/forum")}`}
                    onClick={() => navigate("/forum")}>
                    <BsChatText size={21} />
                    <span className="nav-label">Support Forum</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/news")}`}
                    onClick={() => navigate("/news")}>
                    <MdOutlineNewspaper size={21} style={{ fontSize: "22px" }} />
                    <span className="nav-label">Crypto News</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/suggestion")}`}
                    onClick={() => navigate("/suggestion")}>
                    <MdOutlineTipsAndUpdates size={25} style={{ marginLeft: "4px" }} />
                    <span className="nav-label">Suggestions</span>
                </div>
            </nav>
        </div>
    );
}