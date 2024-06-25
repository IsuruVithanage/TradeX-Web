import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../Storage/SecureLs";
import { VscListUnordered } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { RiShieldUserLine } from "react-icons/ri";
import { GrDocumentPerformance } from "react-icons/gr";
import { 
    MdAutoGraph, 
    MdOutlineCandlestickChart, 
    MdOutlineVideoLibrary, 
    MdOutlineNewspaper, 
    MdOutlineTipsAndUpdates,
} from "react-icons/md";
import "./SideNavBar.css";



export default function SideNavBar() {
    const user = getUser();
    const userRole = user && user.role;
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
                {/*  userRole === "admin" &&  */ true &&
                <div 
                    className={`nav-link ${isActive("/admin")}`}
                    onClick={() => navigate("/admin")}>
                    <span className="nav-icon"><RiShieldUserLine size={24} /></span>
                    <span className="nav-label">Admin</span>
                </div>
                }

                <div 
                    className={`nav-link ${isActive("/watchlist")}`}
                    onClick={() => navigate("/watchlist")}>
                    <span className="nav-icon"><VscListUnordered size={22} /></span>
                    <span className="nav-label">Watchlist</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/portfolio")}`}
                    onClick={() => navigate("/portfolio")}>
                    <span className="nav-icon"><MdAutoGraph size={23} /></span>
                    <span className="nav-label">Portfolio</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/simulate")}`}
                    onClick={() => navigate("/simulate")}>
                    <span className="nav-icon"><MdOutlineCandlestickChart size={26} /></span>
                    <span className="nav-label">Trading Platform</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/alert")}`}
                    onClick={() => navigate("/alert")}>
                    <span className="nav-icon"><FaRegBell size={21} /></span>
                    <span className="nav-label">Price Alerts</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/summary")}`}
                    onClick={() => navigate("/summary/daily")}>
                    <span className="nav-icon"><GrDocumentPerformance size={19} /></span>
                    <span className="nav-label">Summary Report</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/education")}`}
                    onClick={() => navigate("/education")}>
                    <span className="nav-icon"><MdOutlineVideoLibrary size={23} /></span>
                    <span className="nav-label">Educational Resources</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/forum")}`}
                    onClick={() => navigate("/forum")}>
                    <span className="nav-icon"><BsChatText size={21} /></span>
                    <span className="nav-label">Support Forum</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/news")}`}
                    onClick={() => navigate("/news")}>
                    <span className="nav-icon"><MdOutlineNewspaper size={22} /></span>
                    <span className="nav-label">Crypto News</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/suggestion")}`}
                    onClick={() => navigate("/suggestion")}>
                    <span className="nav-icon" ><MdOutlineTipsAndUpdates size={24} style={{marginLeft: "3px"}} /></span>
                    <span className="nav-label">Suggestions</span>
                </div>
            </nav>
        </div>
    );
}