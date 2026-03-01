import { FiX } from "react-icons/fi";

export default function Drawer({ isOpen, onClose, titulo, children }) {
  return (
    // Controle principal de visibilidade
    <div 
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Fundo escuro e embaçado (Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose} // Fecha ao clicar fora
      ></div>

      {/* A Gaveta (Desliza da direita para a esquerda) */}
      <div 
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabeçalho da Gaveta */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#0b4263]">{titulo}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Conteúdo Dinâmico (Aqui entra o formulário específico de cada página) */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}