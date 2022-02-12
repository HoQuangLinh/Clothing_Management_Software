import React, { useState, useEffect } from "react";

import axios from "axios";
import AddStaff from "./AddStaff.jsx";
//import UpdateStaff from "./UpdateStaff/UpdateStaff";

const Staff = (props) => {
  const [staffs, setStaffs] = useState([]);
  const [originStaffs, setOriginStaffs] = useState([]);
  const [position, setPosition] = useState("all");
  const [textSearch, setTextSearch] = useState("");
  const [showFormAddStaff, setShowFormAddStaff] = useState(false);

  //Get All Staffs from StaffControler
  useEffect(() => {
    axios
      .get("/data/staffs")
      .then((res) => {
        setOriginStaffs(res.data);
        setStaffs(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [showFormAddStaff]);

  //Filter Staffs By Position
  useEffect(() => {
    if (position !== "all") {
      axios
        .get("/data/staffs/filter", {
          params: {
            position: position,
          },
        })
        .then((res) => {
          setStaffs(res.data);
        });
    } else {
      setStaffs(originStaffs);
    }
  }, [position]);

  //Search Staffs By Id,Name,Phone
  useEffect(() => {
    if (!textSearch) {
      setStaffs(originStaffs);
    } else {
      const staffFilter = originStaffs.filter((staff) => {
        //Name: Ho Quang Linh
        // textSearch: Quang or Linh etc...==> Match result
        return (
          staff.fullname.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 ||
          staff.id.toString().indexOf(textSearch) > -1 ||
          staff.phone.indexOf(textSearch) > -1
        );
      });
      setStaffs(staffFilter);
    }
  }, [textSearch]);
  return (
    <div className="div_staff">
      {showFormAddStaff && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <AddStaff setShowFormAddStaff={setShowFormAddStaff} />
        </div>
      )}
      <div className="div_left">
        <div className="div_search">
          <div className="header_search">Tìm kiếm</div>
          <div className="search">
            <input
              type="text"
              placeholder="Tìm theo mã, tên nhân viên"
              value={textSearch}
              onChange={(event) => {
                setTextSearch(event.target.value);
              }}
            />
            <i className="bx bx-search"></i>
          </div>
        </div>
        <div className="div_search">
          <div className="header_search">Chức vụ</div>
          <select
            onClick={(event) => {
              setPosition(event.target.value);
              console.log(event.target.value);
            }}
            className="selectbox"
          >
            <option value="all">Tất cả</option>
            <option value="Nhân viên kho">Nhân viên kho</option>
            <option value="Nhân viên thu ngân">Nhân viên thu ngân</option>
          </select>
        </div>
        <div className="action-staff-btn">
          <button
            onClick={() => {
              setShowFormAddStaff(true);
            }}
          >
            <i class="bx bx-plus"></i>
            Thêm nhân viên{" "}
          </button>
        </div>
      </div>
      <div className="div_right">
        <div style={{ padding: "10px 0px 10px 10px" }}>
          <div class="staff-table-container">
            <table id="staff-table">
              <thead>
                <tr>
                  <th>Mã nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Chức vụ</th>
                  <th>Số điện thoại</th>
                  <th>Giới tính</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => {
                  return (
                    <tr>
                      <td>{staff.id}</td>
                      <td>{staff.fullname}</td>
                      <td>{staff.position}</td>
                      <td>{staff.phone}</td>
                      <td>{staff.gender}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
