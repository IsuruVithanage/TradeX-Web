import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BiSolidUserRectangle} from "react-icons/bi";
import wallet from '../../../Assets/Images/wallet.png'
import './TopNavBar.css';
import {FaUserLarge} from "react-icons/fa6";
import {HiOutlineUserCircle} from "react-icons/hi";
import {PiUserFocus} from "react-icons/pi";
import {LuLogOut} from "react-icons/lu";

export default function TopNavBar(props) {
    const userName = "Kamal Silva";

    const navigate = useNavigate();

    const currentLocation = useLocation().pathname + useLocation().search;

    const [activeLink, setActiveLink] = useState(currentLocation);

    const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

    const [activePage, setActivePage] = useState(props.subPages ? props.subPages.selectedPage || props.subPages.pages[0].value : undefined);


    const handleProfileIconClick = () => {
        setProfileMenuVisible(!isProfileMenuVisible);
    };

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

                <div className="profile-icon-containar" onClick={handleProfileIconClick}>
                    <span className="user-name">{userName}</span>
                    <BiSolidUserRectangle className="profile-icon"/>
                </div>
            </div>

            <div className={`profile-menu ${isProfileMenuVisible ? "active" : ""}`}>
                <div className='profile-raw' style={{marginBottom:'1rem'}}>
                    <FaUserLarge size={22} fill='#21DB9A'/>
                    <span className='row-name'>{userName}</span>
                </div>
                <div className='profile-raw' onClick={() => navigate('/profile')}>
                    <HiOutlineUserCircle size={28}/>
                    <span className='row-name'>Profile</span>
                </div>
                <div className='profile-raw' onClick={() => navigate('/verify')}>
                    <PiUserFocus size={28} fill='#6D6D6D'/>
                    <span className='row-name'>Verify User</span>
                </div>
                <div className='profile-raw'>
                    <LuLogOut size={27} />
                    <span className='row-name'>Logout</span>
                </div>

            </div>
        </div>
    )
}