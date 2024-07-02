import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showMessage } from "../../Message/Message";
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
    const permitted = userRole !== 'Trader' && userRole !== 'Admin' ? " not-permitted" : "";


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
                {userRole === "Admin" &&
                <div 
                    className={`nav-link ${isActive("/admin/AdDashboard")}` + permitted}
                    onClick={() => !permitted ? 
                        navigate("/admin/AdDashboard") : 
                        showMessage("warning", "You are not allowed to view Admin")}>
                    <span className={"nav-icon" + permitted}><RiShieldUserLine size={24} /></span>
                    <span className={"nav-label" + permitted}>Admin</span>
                </div>
                }

                <div 
                    className={`nav-link ${isActive("/watchlist")}`}
                    onClick={() => navigate("/watchlist")}>
                    <span className="nav-icon"><VscListUnordered size={22} /></span>
                    <span className="nav-label">Watchlist</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/portfolio")}` + permitted}
                    onClick={() => !permitted ? 
                        navigate("/portfolio") : 
                        showMessage("warning", "You are not allowed to view Portfolio")}>
                    <span className={"nav-icon" + permitted}><MdAutoGraph size={23} /></span>
                    <span className={"nav-label" + permitted}>Portfolio</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/simulate")}` + permitted}
                    onClick={() => !permitted ? 
                        navigate("/simulate") : 
                        showMessage("warning", "You are not allowed to view Trading Platform")}>
                    <span className={"nav-icon" + permitted}><MdOutlineCandlestickChart size={26} /></span>
                    <span className={"nav-label" + permitted}>Trading Platform</span>
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
                    className={`nav-link ${isActive("/forum")}` + permitted}
                    onClick={() => !permitted ? 
                        navigate("/forum") : 
                        showMessage("warning", "You are not allowed to view Support Forum")}>
                    <span className={"nav-icon" + permitted}><BsChatText size={21} /></span>
                    <span className={"nav-label" + permitted}>Support Forum</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/news")}`}
                    onClick={() => navigate("/news")}>
                    <span className="nav-icon"><MdOutlineNewspaper size={22} /></span>
                    <span className="nav-label">Crypto News</span>
                </div>

                <div 
                    className={`nav-link ${isActive("/suggestion")}` + permitted}
                    onClick={() => !permitted ? 
                        navigate("/suggestion") : 
                        showMessage("warning", "You are not allowed to view Suggestions")}>
                    <span className={"nav-icon" + permitted} ><MdOutlineTipsAndUpdates size={24} style={{marginLeft: "3px"}} /></span>
                    <span className={"nav-label" + permitted}>Suggestions</span>
                </div>
            </nav>
        </div>
    );
}