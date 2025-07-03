import employeeRoutes from "./EmployeeRoutes";
import managerRoutes from "./ManagerRouter";
import authRoutes from "./AuthRoute";

const appRoutes = [
    ...employeeRoutes,
    ...managerRoutes,
    ...authRoutes
]

export default appRoutes