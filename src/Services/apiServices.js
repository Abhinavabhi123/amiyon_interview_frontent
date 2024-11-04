import axios from "axios";
import {
  dashboardDataUrl,
  deleteCompanyUrl,
  deleteEmployeeUrl,
  getCompanyUrl,
  getEmployeeUrl,
  postCompanyDetailsUrl,
  postEmployeeDetails,
  updateCompanyUrl,
  updateEmployee,
  userLoginApi,
} from "../urls";
import { errorToast, successToast } from "../Components/toastMessage/Toast";

export const userLogin = async (data = {}, navigate = () => {}) => {
  try {
    await axios
      .get(userLoginApi, {
        headers: {
          ...data,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.isSuccess) {
          localStorage.setItem("amiyonTkn", response.data.token);
          successToast(response.data.message);
          navigate("/dashboard");
        }
      });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};
// Admin logout
export const userLogout = (navigate) => {
  try {
    localStorage.removeItem("amiyonTkn");
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};

// function to post new company details
export const addCompanyDetails = async (data = {}, navigate = () => {}) => {
  try {
    await axios
      .post(postCompanyDetailsUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.isSuccess) {
          successToast(response.data.message);
          navigate("/companies");
        }
      });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// function for getting company details
export const getCompany = async (updateState = () => {}) => {
  try {
    await axios.get(getCompanyUrl).then((response) => {
      if (response.status === 200 && response.data.isSuccess) {
        updateState(response.data.companyData);
      }
    });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// Delete company
export const removeCompany = async (companyId = "", updateState = () => {}) => {
  try {
    await axios
      .delete(deleteCompanyUrl, {
        headers: {
          companyId,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.isSuccess) {
          successToast(response.data.message);
          updateState((prev) => !prev);
        }
      });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// Update company details
export const updateCompany = async (data = {}, navigate = () => {}) => {
  try {
    await axios
      .post(updateCompanyUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.isSuccess) {
          successToast(response.data.message);
          navigate("/companies");
        }
      });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// Add employee
export const addEmployee = async (data = {}, navigate = () => {}) => {
  try {
    await axios.post(postEmployeeDetails, { ...data }).then((response) => {
      if (response.status === 200 && response.data.isSuccess) {
        navigate("/employees");
        successToast(response.data.message);
      }
    });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// Fetching employee lsit
export const getEmployee = async (updateState = () => {}) => {
  try {
    await axios.get(getEmployeeUrl).then((response) => {
      if (response.status === 200 && response.data.isSuccess) {
        updateState(response.data.employeeData);
      }
    });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// Delete employee
export const removeEmployee = async (id, updateState) => {
  try {
    await axios
      .delete(deleteEmployeeUrl, {
        headers: {
          id,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.isSuccess) {
          updateState((prev) => !prev);
          successToast(response.data.message);
        }
      });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// function for edit employee details
export const editEmployeeDetails = async (data, navigate) => {
  try {
    await axios.put(updateEmployee, { ...data }).then((response) => {
      if (response.status === 200 && response.data.isSuccess) {
        successToast(response.data.message);
        navigate("/employees");
      }
    });
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
};

// Getting dashboard details
export const getDashboardData=async(updateState)=>{
  try {
    await axios.get(dashboardDataUrl).then((response)=>{
      if(response.status===200&&response.data.isSuccess){
          updateState(response.data.details)
      }
    })
  } catch (error) {
    errorToast(error.response.data.message);
    console.error(error);
  }
}