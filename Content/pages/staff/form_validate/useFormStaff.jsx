import { useState, useEffect } from "react";
const useFormStaff = (callback, staff, setStaff, validate) => {
  const [errors, setErrors] = useState({});
  useEffect(() => {
    //Validate Success
    if (isSubmitting && Object.keys(errors).length === 0) {
      callback();
    }
  }, [errors]);
  const [isSubmitting, setIsSubmiting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStaff((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    //Set errors when submitting
    e.preventDefault();
    setIsSubmiting(true);
    //validate(values)
    setErrors(validate(staff));
  };

  return { handleChange, handleSubmit, errors };
};
export default useFormStaff;
