import React, { useState, useEffect } from "react";

import sidebar from "./Sidebar.json";
import SidebarItem from "./SidebarItem.jsx";
import { Link } from "react-router-dom";
//import logo from "../../img/logo1.png";
import axios from "axios";
const Sidebar = () => {
  const [activePage, setActivePage] = useState(0);
  return (
    <div className="sidebar">
      <img
        style={{ width: "100%", height: "150px" }}
        src="https://res.cloudinary.com/hoquanglinh/image/upload/v1643980733/logo1_tyvtur.png"
        alt=""
      />

      {sidebar.map((item, index) => {
        return (
          <Link
            onClick={() => {
              setActivePage(index);
            }}
            to={{
              pathname: item.route,
            }}
          >
            <SidebarItem
              active={activePage == index}
              icon={item.icon}
              title={item.display_name}
            ></SidebarItem>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
