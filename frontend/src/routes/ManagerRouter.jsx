import { element } from "prop-types";
import Dashboard from "../pages/Manager/Dashboard";
import FeedbackHistory from "../pages/Manager/FeedbackHistory";
import FeedbacksIndividual from "../pages/Manager/FeedbacksIndividual";

const managerRoutes = [
    {
        path: "/manager/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/manager/history",
        element: <FeedbackHistory/>
    },
    {
        path: `manager/employee/:employeeId/feedbacks`,
        element: <FeedbacksIndividual/>
    }
]

export default managerRoutes;