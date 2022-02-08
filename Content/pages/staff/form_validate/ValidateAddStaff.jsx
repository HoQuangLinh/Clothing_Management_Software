export default function ValidateAddStaff(staff) {
  let errors = {};

  if (!staff.username.trim()) {
    errors.username = "Tài khoản là bắt buộc";
  } else if (!/^[A-Za-z]+/.test(staff.username.trim())) {
    errors.username = "Nhập vào tài khoản hợp lệ";
  }

  if (!staff.password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (staff.password.length < 6) {
    errors.password = "Mật khẩu ít nhất là 6 kí tự";
  }
  if (!staff.confirmPassword) {
    errors.confirmPassword = "Chưa xác nhận mật khẩu";
  } else if (staff.password !== staff.confirmPassword) {
    errors.confirmPassword = "Mật khẩu không khớp";
  }
  if (!staff.email) {
    errors.email = "Email là bắt buộc";
  } else if (!/\S+@\S+\.\S+/.test(staff.email)) {
    errors.email = "Email không hợp lệ";
  }
  if (!staff.fullname) {
    errors.fullname = "Họ tên là bắt buộc";
  } else if (!/^[A-Za-z]+/.test(staff.username.trim())) {
    errors.username = "Nhập vào tên hợp lệ";
  }
  if (!staff.phone) {
    errors.phone = "Số điện thoại là bắt buộc";
  }
  if (!staff.address) {
    errors.address = "Địa chỉ là bắt buộc";
  }
}
