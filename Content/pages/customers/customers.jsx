import React from "react";
import CustomersNavbar from "./customers_navbar.jsx";
import Tables from "./customers_table.jsx";


const Customers = () => {

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
      <Tables/>
      </div>
  </div>
  )
};

export default Customers;
