import { Outlet } from "react-router";
import Menu from "../components/Menu";

const AdminLayout = () => {
    return (
        <div className="flex h-dvh overflow-hidden bg-gray-50 w-full">
            <Menu />
            
            <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden pb-[80px] md:pb-0 relative">
                <div className="p-4 md:p-6 max-w-7xl mx-auto w-full relative">
                    <Outlet />
                </div>
                
            </main>
        </div>
    );
}

export default AdminLayout;