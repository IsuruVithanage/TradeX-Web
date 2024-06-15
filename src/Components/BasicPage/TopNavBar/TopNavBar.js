import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineUserCircle } from "react-icons/hi";
import { PiUserFocus } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { BiShieldX } from "react-icons/bi";
import { getUser } from "../../../Storage/SecureLs";
import AppNotification from '../../AppNotification/AppNotification';
import wallet from '../../../Assets/Images/wallet.png'
import './TopNavBar.css';


export default function TopNavBar(props) {
    const currentLocation = useLocation().pathname + useLocation().search;
    const [activePage, setActivePage] = useState(props.subPages ? props.subPages.pages[0].value : undefined);
    const [activeLink, setActiveLink] = useState(currentLocation);
    const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

    const navigate = useNavigate();
    const user = getUser();
    const userName = user ? user.userName : 'Kamal Silva';
   

    const handleSubPagesClick = (page) => {
        setActivePage(page);
        props.subPages.onClick &&
        props.subPages.onClick(page);
    }

    const active = (path) => {
        return (path === activeLink) ? "active" : "";
    };

    useEffect(() => {
        setActiveLink(currentLocation);
    }, [currentLocation]);



    return (
        <div>
            {props.sideNavBar === false && props.icon !== false &&
                <div className="top-navbar-iconholder">
                    {props.icon ? props.icon :
                        <img src={wallet} alt="Logo" width={45}/>}
                </div>
            }
            <div className={`top-navbar ${props.icon === false && "full-width"}`}>
                <nav className="links-container">
                    {(props.tabs) && props.tabs.map((tab) => (
                        <span
                            key={tab.label}
                            className={`top-nav-link ${active(tab.path)}`}
                            onClick={() => navigate(tab.path)} >
                            {tab.label}
                        </span>
                    ))}

                    {(props.subPages) && props.subPages.pages.map((page) => (
                        <span
                            key={page.value}
                            className={`top-nav-link ${(activePage === page.value) ? "active" : ""}`}
                            onClick={() => handleSubPagesClick(page.value)}>
                            {page.label}
                        </span>
                    ))}
                </nav>

                <div className="top-right-container">
                    <div onMouseEnter={()=>setProfileMenuVisible(true)} onMouseLeave={()=>setProfileMenuVisible(false)}>
                        <div className="top-right-icon-container">
                            <span className="top-nav-user-name" >{userName}</span>
                            <BiSolidUserRectangle className="top-nav-profile-icon"/>
                        </div>

                        <ProfileMenu {...{isProfileMenuVisible, user}}/>
                    </div>

                    <AppNotification user={user} />
                    
                </div>
            </div>
        </div>
    )
}


function ProfileMenu (props){
    const {isProfileMenuVisible, user} = props;

    const navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('access-token');
        navigate('/');
    }

    return(
        <div className={`floating-container ${isProfileMenuVisible ? "active" : ""}`} style={{width: "200px"}} >
            <div className='profile-raw' >
                <span className='row-icon'><FaUserLarge size={22} fill='#21DB9A'/></span>
                <span className='row-name'>{user ? user.userName : "Kasun Silva"}</span>
            </div>
            <div className='profile-raw' onClick={() => navigate('/profile')}>
                <span className='row-icon'><HiOutlineUserCircle size={28}/></span>
                <span className='row-name'>Profile</span>
            </div>
            {user && user.isVerified === "No" &&
                <div className='profile-raw' onClick={() => navigate('/verify')}>
                    <span className='row-icon'><PiUserFocus size={30} fill='#6D6D6D'/></span>
                    <span className='row-name'>Verify User</span>
                </div>
            }
            {user && user.role !== "User" && 
                <div className='profile-raw' onClick={() => window.open('/wallet', '_blank')}>
                    <span className='row-icon'><BiShieldX size={29}/></span>
                    <span className='row-name'>TradeX Wallet</span>
                </div>
            }
            <div className='profile-raw' onClick={logoutUser}>
                <span className='row-icon' style={{paddingLeft: "5px"}}>
                    <LuLogOut size={28}/>
                </span>
                <span className='row-name'>Logout</span>
            </div>

        </div>
    );
}

