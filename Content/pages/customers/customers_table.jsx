import React, { useState, Component } from 'react'

class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [
        { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com',point:10 },
        { id: 2, name: 'Ali', age: 19, email: 'ali@email.com',point:10 },
        { id: 3, name: 'Saad', age: 16, email: 'saad@email.com',point:10 },
        { id: 4, name: 'Asad', age: 25, email: 'asad@email.com',point:10 },
      ],
    }
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, name, age, email, point } = student
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
          <td>{point}</td>
        </tr>
      )
    })
  }

  renderTableHeader() {
    const header = Object.keys(this.state.students[0])
    return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>)
  }

  render() {
    return (
        <table>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
    )
  }
}

// const columns = [
//   { id: "customerId", label: "Mã khách hàng" },
//   { id: "customerName", label: "Tên khách hàng" },
//   {
//     id: "phone",
//     label: "Số điện thoại",
//   },
//   {
//     id: "totalPrice",
//     label: "Tổng tiền",

//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "points",
//     label: "Điểm tích luỹ",

//     format: (value) => value.toLocaleString("en-US"),
//   },
// ];

// const customers = [
//   {
//     id: 1,
//     customerId: "1",
//     customerName: "Nguyễn Ngọc Thịnh",
//     phone: "0352952482",
//     totalPrice: 20000,
//     points: 100,
//   },
//   {
//     id: 1,
//     customerId: "1",
//     customerName: "Nguyễn Ngọc Thịnh",
//     phone: "0352952482",
//     totalPrice: 20000,
//     points: 100,
//   },
//   {
//     id: 1,
//     customerId: "1",
//     customerName: "Nguyễn Ngọc Thịnh",
//     phone: "0352952482",
//     totalPrice: 20000,
//     points: 100,
//   },
//   {
//     id: 1,
//     customerId: "1",
//     customerName: "Nguyễn Ngọc Thịnh",
//     phone: "0352952482",
//     totalPrice: 20000,
//     points: 100,
//   },
//   {
//     id: 1,
//     customerId: "1",
//     customerName: "Nguyễn Ngọc Thịnh",
//     phone: "0352952482",
//     totalPrice: 20000,
//     points: 100,
//   },
//   {
//     id: 1,
//     customerId: "1",
//     customerName: "Nguyễn Ngọc Thịnh",
//     phone: "0352952482",
//     totalPrice: 20000,
//     points: 100,
//   },
//   {
//     id: 1,
//     customerId: "1",
//     customerName: "Nguyễn Ngọc Thịnh",
//     phone: "0352952482",
//     totalPrice: 20000,
//     points: 100,
//   },
// ];




export default Tables