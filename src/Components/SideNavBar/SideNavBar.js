import React from "react";
import { BiBarChartAlt, BiCandles, BiHomeAlt } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { IoIosMenu, IoMdBook } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import { AiOutlineFileSearch } from "react-icons/ai";
import SideNavIcon from "./SideNavIcon/SideNavIcon";
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
        <SideNavIcon url="/">
          <BiHomeAlt size={23} />
        </SideNavIcon>

        <SideNavIcon url="/watchlist">
          <IoIosMenu size={23} />
        </SideNavIcon>

        <SideNavIcon url="/portfolio">
          <BiBarChartAlt size={23} />
        </SideNavIcon>

        <SideNavIcon url="/forum">
          <BsChatText />
        </SideNavIcon>

        <SideNavIcon url="/dataVisualization">
          <FaRegFileAlt />
        </SideNavIcon>

        <SideNavIcon url="/settings">
          <SlSettings />
        </SideNavIcon>

        <SideNavIcon url="/trade">
          <BiCandles size={23} />
        </SideNavIcon>

        <SideNavIcon url="/educatiion">
          <IoMdBook size={23} />
        </SideNavIcon>

        <SideNavIcon url="/news">
          <AiOutlineFileSearch size={23} />
        </SideNavIcon>

        <SideNavIcon url="/alert">
          <GoBell size={23} />
        </SideNavIcon>
      </nav>
    </div>
  );
}
