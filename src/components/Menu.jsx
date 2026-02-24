import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
    LuLayoutDashboard,
    LuBed,
    LuUsers,
    LuCalendarDays,
    LuCreditCard,
    LuUserCog,
    LuChevronLeft,
    LuChevronRight,
    LuBuilding,
    LuLogOut
} from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const usuarioLogado = {
        nome: "Ana Costa",
        cargo: "Gerente",
        avatar: null
    };

    const getIniciais = (nome) => {
        return nome.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    };

    const linksNav = [
        { to: "/admin", icon: <LuLayoutDashboard size={20} />, label: "Dashboard" },
        { to: "/admin/quartos", icon: <LuBed size={20} />, label: "Quartos" },
        { to: "/admin/clientes", icon: <LuUsers size={20} />, label: "Clientes" },
        { to: "/admin/reservas", icon: <LuCalendarDays size={20} />, label: "Reservas" },
        { to: "/admin/pagamentos", icon: <LuCreditCard size={20} />, label: "Pagamentos" },
        { to: "/admin/funcionarios", icon: <LuUserCog size={20} />, label: "Funcionários" },
    ];

    const abrirModalSair = () => {
        setIsModalOpen(true);
    };

    const confirmarSaida = () => {
        setIsModalOpen(false);
        navigate("/");
    };

    return (
        <>
            <aside className={`bg-[#0b4263] text-white transition-all duration-300 relative flex flex-col h-screen ${isOpen ? 'w-64' : 'w-20'} z-40`}>
                <div>
                    {/* header do menu */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="group absolute -right-3 top-20 bg-orange-500 text-white rounded-full p-1.5 shadow-md flex items-center justify-center hover:bg-orange-600 transition-colors z-50 cursor-pointer"
                    >
                        {isOpen ? <LuChevronLeft size={16} /> : <LuChevronRight size={16} />}

                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                            {isOpen ? "Recolher menu" : "Expandir menu"}
                        </span>
                    </button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-50">
                        Sair
                    </span>
                </div>

                <div className="p-6 flex items-center gap-3 overflow-hidden border-b border-white/10">
                    <div className="bg-orange-500 p-2 rounded-xl text-white flex-shrink-0">
                        <LuBuilding size={24} />

                    </div>
                    {isOpen && (
                        <div className="flex flex-col whitespace-nowrap">
                            <h1 className="font-bold text-lg leading-tight">Pousada</h1>
                            <span className="text-xs text-white/70">Sistema de Gestão</span>
                        </div>
                    )}
                </div>
                {/* area de navegaçao */}
                <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
                    {linksNav.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/admin"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive
                                    ? 'bg-white/10 text-white font-medium'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="flex-shrink-0">{link.icon}</span>
                            {isOpen && <span className="whitespace-nowrap">{link.label}</span>}
                        </NavLink>
                    ))}
                </nav>
                {/* area de perfil logado */}
                <div className="p-4 border-t border-white/10 flex items-center justify-between relative">

                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {usuarioLogado.avatar ? (
                                <img src={usuarioLogado.avatar} alt="Perfil" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                getIniciais(usuarioLogado.nome)
                            )}
                        </div>

                        {isOpen && (
                            <div className="flex flex-col whitespace-nowrap">
                                <span className="font-medium text-sm">{usuarioLogado.nome}</span>
                                <span className="text-xs text-white/70">{usuarioLogado.cargo}</span>
                            </div>
                        )}
                    </div>

                    {isOpen && (
                        <div className="relative group flex items-center">
                            <button
                                onClick={abrirModalSair}
                                className="p-2 bg-[#f94144] hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer z-10"
                            >
                                <LuLogOut size={18} />
                            </button>

                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-50">
                                Sair
                            </span>
                        </div>
                    )}
                </div>
            </aside>

            {/* Modal de confirmação de saída */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all flex flex-col items-center text-center">

                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                            <FiAlertTriangle size={32} />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">Sair do Sistema?</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Você precisará fazer login novamente para acessar o painel de gestão.
                        </p>

                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmarSaida}
                                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <LuLogOut size={18} /> Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;