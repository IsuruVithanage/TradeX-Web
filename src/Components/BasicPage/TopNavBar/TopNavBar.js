import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineUserCircle } from "react-icons/hi";
import { PiUserFocus } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import AppNotification from '../../AppNotification/AppNotification';
import wallet from '../../../Assets/Images/wallet.png'
import './TopNavBar.css';
import {clearAccessToken, setAccessToken} from "../../../Features/authSlice";
import {useAuthInterceptor} from "../../../Authentication/axiosInstance";
import Cookies from 'js-cookie';
import {getUser} from "../../../Storage/SecureLs";


export default function TopNavBar(props) {
    const currentLocation = useLocation().pathname + useLocation().search;
    const [activePage, setActivePage] = useState(props.subPages ? props.subPages.pages[0].value : undefined);
    const [activeLink, setActiveLink] = useState(currentLocation);
    const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

    const user = getUser();
    const userName = user ? user.username : 'Kamal Silva';
   

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
                        <Link key={tab.label} to={tab.path} className="top-link">
                            <span className={`top-nav-link ${active(tab.path)}`}>
                                {tab.label}
                            </span>
                        </Link>
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
                            <span className="user-name" >{userName}</span>
                            <BiSolidUserRectangle className="profile-icon"/>
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
                <span className='row-name'>{user ? user.username : "Kasun Silva"}</span>
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
            <div className='profile-raw'>
                <span className='row-icon'><LuLogOut size={25}/></span>
                <span className='row-name' onClick={logoutUser}>Logout</span>
            </div>

        </div>
    );
}

