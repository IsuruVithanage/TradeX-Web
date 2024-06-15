import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VscListUnordered } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { RiShieldUserLine } from "react-icons/ri";
import { 
    MdAutoGraph, 
    MdOutlineCandlestickChart, 
    MdOutlineAssignment, 
    MdOutlineAutoStories, 
    MdOutlineNewspaper, 
    MdOutlineTipsAndUpdates,
} from "react-icons/md";
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
                    className={`nav-link ${isActive("/admin")}`}
                    onClick={() => navigate("/admin")}>
                    <RiShieldUserLine size={24} />
                    <span className="nav-label">Admin</span>
                </div>

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
                    <MdOutlineCandlestickChart size={26} style={{ fontSize: "26px" }} />
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
                    <MdOutlineNewspaper size={22} style={{ fontSize: "22px" }} />
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