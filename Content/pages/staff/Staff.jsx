import React, { useState, useEffect } from "react";

import axios from "axios";
import AddStaff from "./AddStaff.jsx";
import UpdateStaff from "./UpdateStaff.jsx";

const Staff = (props) => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [originStaffs, setOriginStaffs] = useState([]);
  const [position, setPosition] = useState("all");
  const [textSearch, setTextSearch] = useState("");
  const [showFormAddStaff, setShowFormAddStaff] = useState(false);
  const [showFormUpdateStaff, setShowFormUpdateStaff] = useState(false);
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
    <div className="staff-container">
      {showFormAddStaff && (
        <div className="staff-show-modal">
          <AddStaff setShowFormAddStaff={setShowFormAddStaff} />
        </div>
      )}
      {showFormUpdateStaff && (
        <div className="staff-show-modal">
          <UpdateStaff
            staff={selectedStaff}
            setStaff={selectedStaff}
            setShowFormUpdateStaff={setShowFormUpdateStaff}
          />
        </div>
      )}
      <div className="staff-container-left">
        <div className="staff-container-search">
          <div className="staff-container-search-header">Tìm kiếm</div>
          <div className="staff-container-search-input">
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
        <div className="staff-container-search">
          <div className="staff-container-search-header">Chức vụ</div>
          <select
            onClick={(event) => {
              setPosition(event.target.value);
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
      <div className="staff-container-right">
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
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => {
                  return (
                    <tr key={index}>
                      <td>{staff.id}</td>
                      <td>{staff.fullname}</td>
                      <td>{staff.position}</td>
                      <td>{staff.phone}</td>
                      <td>{staff.gender}</td>
                      <td
                        onClick={() => {
                          setSelectedStaff(staff);
                          setShowFormUpdateStaff(true);
                        }}
                      >
                        <i
                          style={{
                            fontSize: 18,
                            color: "#0DB3E2",
                            cursor: "pointer",
                          }}
                          class="bx bxs-edit"
                        ></i>
                      </td>
                      <td>
                        <i
                          style={{
                            fontSize: 18,
                            color: "#F26339",
                            cursor: "pointer",
                          }}
                          class="bx bx-trash"
                        ></i>
                      </td>
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
