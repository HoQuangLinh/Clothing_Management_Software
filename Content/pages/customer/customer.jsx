import React, { useState, useEffect } from "react";

import axios from "axios";

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);
  const [originCustomers, setOriginCustomers] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [pointFrom, setPointFrom] = useState("");
  const [pointTo, setPointTo] =useState("");
  const [totalPriceFrom, setTotalPriceFrom] = useState("");
  const [totalPriceTo, setTotalPriceTo] = useState("");
  const [SearchInput, setSearchInput] = useState("");

  
  //Get All customers from CustomerControler
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
    //Search customers By Name
    useEffect(() => {
      if (!textSearch) {
        setCustomers(originCustomers);
      } else {
        const customerFilter = originCustomers.filter((customer) => {
          return (
            customer.name.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 ||
            customer.id.toString().indexOf(textSearch) > -1 ||
            customer.phone.indexOf(textSearch) > -1
          );
        });
        setCustomers(customerFilter);
      }
    }, [textSearch]);

    //Search by point
    const handleSearchByPoint = (pointFrom, pointTo) => {
      console.log("Search Point working...");
      const customerbyPoint = originCustomers.filter((customer) => {
        return (
          (customer.name.toLowerCase().indexOf(SearchInput.toLowerCase()) > -1 ||
            customer.id.toLowerCase().indexOf(SearchInput.toLowerCase()) > -1 ||
            customer.phone.toLowerCase().indexOf(SearchInput.toLowerCase()) >
              -1 ||
            customer.point.indexOf(SearchInput.toLowerCase()) > -1) &&
          customer.point - 1 <
            Number(
              pointTo.replace(/[^0-9]/g, "") == ""
                ? Number.MAX_VALUE
                : pointTo.replace(/[^0-9]/g, "")
            ) &&
          customer.point + 1 >
            Number(
              pointFrom.replace(/[^0-9]/g, "") == ""
                ? Number.MIN_VALUE
                : pointFrom.replace(/[^0-9]/g, "")
            )
        );
      });
      setCustomers(customerbyPoint);
    };
  // search by money
    const handleSearchByTotalPrice = (totalPriceFrom, totalPriceTo) => {
      console.log("Search totalPrice working...");
      const customerbytotalPrice = originCustomers.filter((customer) => {
        return (
          (customer.name.toLowerCase().indexOf(SearchInput.toLowerCase()) > -1 ||
            customer.id.toLowerCase().indexOf(SearchInput.toLowerCase()) > -1 ||
            customer.phone.toLowerCase().indexOf(SearchInput.toLowerCase()) >
              -1 ||
            String(customer.point).indexOf(SearchInput.toLowerCase()) > -1) &&
          customer.total - 1 <
            Number(
              totalPriceTo.replace(/[^0-9]/g, "") == ""
                ? Number.MAX_VALUE
                : totalPriceTo.replace(/[^0-9]/g, "")
            ) &&
          customer.total + 1 >
            Number(
              totalPriceFrom.replace(/[^0-9]/g, "") == ""
                ? Number.MIN_VALUE
                : totalPriceFrom.replace(/[^0-9]/g, "")
            ) &&
          customer.point - 1 <
            Number(
              pointTo.replace(/[^0-9]/g, "") == ""
                ? Number.MAX_VALUE
                : pointTo.replace(/[^0-9]/g, "")
            ) &&
          customer.point + 1 >
            Number(
              pointFrom.replace(/[^0-9]/g, "") == ""
                ? Number.MIN_VALUE
                : pointFrom.replace(/[^0-9]/g, "")
            )
        );
      });
      setCustomers(customerbytotalPrice);
    };
  
      

  return (
  <div>
  {/* <CustomersNavbar/> */}
  <div>
      <div
        className="row customers_navbar_container"
        style={{ alignItems: "center", fontSize: "20px" }}
      >
        <div className="navbar__search">
        <input
              type="text"
              placeholder="Tìm theo mã, tên"
              value={textSearch}
              onChange={(event) => {
                setTextSearch(event.target.value);
              }}
            />
          <i className="bx bx-search"></i>
        </div>

        <div className="list-action-customers-btn">
          <div
            // onClick={() => {
            //   props.handlePrint();
            // }}
            className="action-customers-btn"
          >
            <i class="bx bxs-file-export"></i>Xuất file
          </div>
        </div>
      </div>
    </div>
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
                  value={pointFrom}
                  onChange={(e) => {
                    setPointFrom(e.target.value);
                    handleSearchByPoint(e.target.value, pointTo);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                  }}

                />
              </div>
              <div className="customer-card-item">
                <span>Đến</span>
                <input
                  className="customer-card-input"
                  placeholder="Giá trị"
                  type="text"
                  value={pointTo}
                  onChange={(e) => {
                    setPointTo(e.target.value);

                    handleSearchByPoint(pointFrom, e.target.value);
                  }}
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
                  value={totalPriceFrom}
                  onChange={(e) => {
                    setTotalPriceFrom(e.target.value);
                    handleSearchByTotalPrice(e.target.value, totalPriceTo);
                  }}
                />
              </div>
              <div className="customer-card-item">
                <span>Đến</span>
                <input
                  className="customer-card-input"
                  placeholder="Giá trị"
                  type="text"
                  value={totalPriceTo}
                  onChange={(e) => {
                    setTotalPriceTo(e.target.value);
                    handleSearchByTotalPrice(totalPriceFrom, e.target.value);
                  }}
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
                      <td>{customer.total}</td>
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