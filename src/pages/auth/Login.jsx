import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LuUser, LuLock, LuBuilding, LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
    // Estados de Carregamento (Skeleton)
    const [isLoadingSkeleton, setisLoadingSkeleton] = useState(true); 
    const [isLoggingIn, setIsLoggingIn] = useState(false); 

    // Estados dos Dados (para o Back-end)
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erroMessage, setErroMessage] = useState("");
    
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navigate = useNavigate();

    // Simula o carregamento
    useEffect(() => {
        const timer = setTimeout(() => {
            setisLoadingSkeleton(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Função que será conectada à futura API
    const handleLogin = (e) => {
        e.preventDefault();
        setErroMessage("");

        //(simulação) para autenticação se estao preenchidos.
        if (usuario && senha) {
            setIsLoggingIn(true);
            // Simula o tempo que a API demora para validar (2.5 segundos)
            setTimeout(() => {
                navigate("/admin");
            }, 2500);
        } else {
            setErroMessage("Preencha todos os campos.");
        }
    };

    // Animaçoes CSS
    const animacoesCSS = `
        @keyframes loadingBar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .animate-loading-bar {
            animation: loadingBar 2s ease-in-out forwards;
        }
        .animate-loading-bar-login {
            animation: loadingBar 2.5s ease-in-out forwards; /* Mesmo tempo da API */
        }
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
            background-size: 200% 200%;
            animation: gradientMove 8s ease infinite;
        }
    `;

    // skeleton inicial
    if (isLoadingSkeleton) {
        return (
            <div className="min-h-screen bg-[#0b4263] flex flex-col items-center justify-center relative overflow-hidden">
                <style>{animacoesCSS}</style>
                <div className="bg-[#F59F0A] p-5 rounded-2xl text-white mb-8 z-10 shadow-lg animate-pulse">
                    <LuBuilding size={64} />
                </div>
                <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden z-10">
                    <div className="h-full bg-white animate-loading-bar rounded-full"></div>
                </div>
            </div>
        );
    }

    // Skeleton de Login
    if (isLoggingIn) {
        return (
            <div className="min-h-screen bg-gradient-to-tr from-[#0b4263] to-[#F59F0A] flex flex-col items-center justify-center relative overflow-hidden">
                <style>{animacoesCSS}</style>
                <div className="bg-white p-5 rounded-2xl text-[#F59F0A] mb-6 z-10 shadow-lg animate-pulse">
                    <LuBuilding size={64} />
                </div>
                <h2 className="text-white text-xl font-bold mb-8 animate-pulse drop-shadow-md">Autenticando...</h2>
                <div className="w-64 h-1.5 bg-white/30 rounded-full overflow-hidden z-10">
                    <div className="h-full bg-white animate-loading-bar-login rounded-full"></div>
                </div>
            </div>
        );
    }

    // Formulario de login
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-[#0b4263] via-[#0a314a] to-[#d96c00] overflow-hidden animate-gradient-bg">
            <style>{animacoesCSS}</style>

            <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full z-10 relative">

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#F59F0A] p-4 rounded-2xl text-white mb-4 shadow-md">
                        <LuBuilding size={40} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#0b4263]">Tech Hotel</h1>
                    <p className="text-gray-500 mt-1">Sistema de Gestão</p>
                </div>

                {erroMessage && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg text-center font-medium">
                        {erroMessage}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">

                    <div className="relative flex items-center group">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 border-r border-transparent group-focus-within:text-[#F59F0A] transition-colors">
                            <LuUser size={20} />
                        </div>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Usuário"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F59F0A] focus:ring-2 focus:ring-[#F59F0A]/20 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div className="relative flex items-center group">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 border-r border-transparent group-focus-within:text-[#F59F0A] transition-colors">
                            <LuLock size={20} />
                        </div>
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"
                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F59F0A] focus:ring-2 focus:ring-[#F59F0A]/20 focus:bg-white transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-[#0b4263] transition-colors cursor-pointer"
                        >
                            {mostrarSenha ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#F59F0A] hover:bg-[#d98b09] text-white font-bold py-3.5 rounded-xl mt-2 transition-all shadow-lg hover:shadow-[#F59F0A]/30 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500 flex flex-col gap-3">
                    <p>
                        Recuperar: <a href="#" className="text-[#0b4263] hover:text-[#F59F0A] font-semibold transition-colors">Usuário</a> - <a href="#" className="text-[#0b4263] hover:text-[#F59F0A] font-semibold transition-colors">Senha</a>
                    </p>
                    <a href="#" className="text-[#0b4263] hover:text-[#F59F0A] transition-colors mt-2">
                        Visite nosso website para maiores informações
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Login;