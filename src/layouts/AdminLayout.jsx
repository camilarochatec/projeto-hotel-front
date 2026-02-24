import { Outlet } from "react-router";
import Menu from "../components/Menu";

const AdminLayout = () => {
    return (
        <div className="flex">
            <Menu />
            <div className="flex-1 h-svh overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;