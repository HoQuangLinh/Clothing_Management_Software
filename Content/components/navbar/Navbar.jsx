import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="navbar__left">
          <i class="bx bx-menu"></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
