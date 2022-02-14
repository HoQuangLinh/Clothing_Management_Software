import React, { useState, useEffect } from "react";

import axios from "axios";
import CustomersNavbar from "./customers_navbar.jsx";
// import Tables from "./customers_table.jsx";


const Customers = (props) => {
  const [customers, setCustomers] = useState([]);
  const [originCustomers, setOriginCustomers] = useState([]);
  // const [position, setPosition] = useState("all");
  // const [textSearch, setTextSearch] = useState("");
  // const [showFormAddStaff, setShowFormAddStaff] = useState(false);

  //Get All Staffs from StaffControler
  useEffect(() => {
    axios
      .get("/data/customers")
      .then((res) => {
        setOriginCustomers(res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
  <div>
  <CustomersNavbar/>
    <div className="row customers_content">
        <div className="col-3">
          <div className="customer-card">
            <h3 className="customer-card-heading">Điểm tích luỹ</h3>
            <div className="customer-card-body">
              <div className="customer-card-item">
                <span>Từ</span>
                <input
                  className="customer-card-input"
                  placeholder="Giá trị"
                  type="text"
                />
              </div>
              <div className="customer-card-item">
                <span>Đến</span>
                <input
                  className="customer-card-input"
                  placeholder="Giá trị"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="customer-card">
            <h3 className="customer-card-heading">Tổng tiền</h3>
            <div className="customer-card-body">
              <div className="customer-card-item">
                <span>Từ</span>
                <input
                  className="customer-card-input"
                  placeholder="Giá trị"
                  type="text"
                />
              </div>
              <div className="customer-card-item">
                <span>Đến</span>
                <input
                  className="customer-card-input"
                  placeholder="Giá trị"
                  type="text"
                />
              </div>
              <div className="customer-card-item">
                <input
                  className="timer-choice"
                  type="radio"
                  name="timer-choice"
                  id=""
                />
                <input
                  className="customer-card-input"
                  readOnly
                  type="text"
                  placeholder="Toàn thời gian"
                />
              </div>
              <div className="customer-card-item">
                <input
                  className="timer-choice"
                  type="radio"
                  name="timer-choice"
                  id=""
                />
                <input
                  className="customer-card-input"
                  type="date"
                  name=""
                  defaultValue="2021-10-17"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="div_right">
          <div style={{ padding: "10px 0px 10px 10px" }}>
          <div class="customer-table-container">
            <table id="customer-table">
              <thead>
                <tr>
                  <th>Mã khách hàng</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Tổng tiền</th>
                  <th>Điểm tích lũy</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => {
                  return (
                    <tr>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.gender}</td>
                      <td>{customer.point}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      </div>
  </div>
  )
};

export default Customers;