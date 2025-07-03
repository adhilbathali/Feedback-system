import { useRoutes } from "react-router-dom";
import appRoutes from "./routes/AppRoutes";
import "./App.css"

function App(){
    const routes = useRoutes(appRoutes);
    return routes
}

export default App
