import React, { useState, useEffect } from "react";

import axios from "axios";
import AddStaff from "./AddStaff.jsx";
import UpdateStaff from "./UpdateStaff.jsx";
import Dialog from "../../components/dialog/Dialog.jsx";

const Staff = (props) => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [originStaffs, setOriginStaffs] = useState([]);
  const [position, setPosition] = useState("all");
  const [textSearch, setTextSearch] = useState("");
  const [showFormAddStaff, setShowFormAddStaff] = useState(false);
  const [showFormUpdateStaff, setShowFormUpdateStaff] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
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
  }, [showFormAddStaff, showFormUpdateStaff, showModalDelete]);

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

  //Handle Delete a selected staff
  const handleDeleteStaff = (id) => {
    axios
      .delete(`/data/staffs/delete/${id}`)
      .then((res) => {
        alert("B???n ???? xo?? nh??n vi??n th??nh c??ng");
        setShowModalDelete(false);
      })
      .catch((err) => {
        alert("R???t ti???c nh??n vi??n n??y hi???n t???i kh??ng th??? xo??");
      });
  };
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
            staffId={selectedStaff.id}
            setShowFormUpdateStaff={setShowFormUpdateStaff}
          />
        </div>
      )}
      {showModalDelete && (
        <Dialog
          handleAction={() => {
            handleDeleteStaff(selectedStaff.id);
          }}
          handleCancel={() => {
            setShowModalDelete(false);
          }}
          title="Xo?? nh??n vi??n"
          content={`B???n c?? mu???n xo?? nh??n vi??n ${selectedStaff.fullname}`}
        />
      )}
      <div className="staff-container-left">
        <div className="staff-container-search">
          <div className="staff-container-search-header">T??m ki???m</div>
          <div className="staff-container-search-input">
            <input
              type="text"
              placeholder="T??m theo m??, t??n nh??n vi??n"
              value={textSearch}
              onChange={(event) => {
                setTextSearch(event.target.value);
              }}
            />
            <i className="bx bx-search"></i>
          </div>
        </div>
        <div className="staff-container-search">
          <div className="staff-container-search-header">Ch???c v???</div>
          <select
            onClick={(event) => {
              setPosition(event.target.value);
            }}
            className="selectbox"
          >
            <option value="all">T???t c???</option>
            <option value="Nh??n vi??n kho">Nh??n vi??n kho</option>
            <option value="Nh??n vi??n thu ng??n">Nh??n vi??n thu ng??n</option>
          </select>
        </div>
        <div className="action-staff-btn">
          <button
            onClick={() => {
              setShowFormAddStaff(true);
            }}
          >
            <i class="bx bx-plus"></i>
            Th??m nh??n vi??n{" "}
          </button>
        </div>
      </div>
      <div className="staff-container-right">
        <div style={{ padding: "10px 0px 10px 10px" }}>
          <div class="staff-table-container">
            <table id="staff-table">
              <thead>
                <tr>
                  <th>M?? nh??n vi??n</th>
                  <th>T??n nh??n vi??n</th>
                  <th>Ch???c v???</th>
                  <th>S??? ??i???n tho???i</th>
                  <th>Gi???i t??nh</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => {
                  return (
                    <tr
                      onClick={() => {
                        setSelectedStaff(staff);
                      }}
                      key={index}
                    >
                      <td>{staff.id.substring(0, 8)}</td>
                      <td>{staff.fullname}</td>
                      <td>{staff.position}</td>
                      <td>{staff.phone}</td>
                      <td>{staff.gender}</td>
                      <td
                        onClick={() => {
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
                      <td
                        onClick={() => {
                          setShowModalDelete(true);
                        }}
                      >
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
