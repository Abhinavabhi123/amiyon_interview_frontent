const server = import.meta.env.VITE_BASE_URL;

export const userLoginApi = server + "/admin/login";
export const postCompanyDetailsUrl = server + "/admin/addCompany";
export const getCompanyUrl = server + "/admin/getCompany";
export const deleteCompanyUrl = server + "/admin/deleteCompany";
export const updateCompanyUrl = server + "/admin/updateCompany";
export const postEmployeeDetails = server + "/admin/addEmployee";
export const getEmployeeUrl = server + "/admin/getEmployee";
export const deleteEmployeeUrl = server + "/admin/deleteEmployee";
export const updateEmployee = server + "/admin/updateEmployeeDetails";
export const dashboardDataUrl = server + "/admin/getDashboardData";
