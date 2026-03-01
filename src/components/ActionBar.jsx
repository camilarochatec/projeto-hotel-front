import { useState } from "react";
import { FiSearch, FiFilter, FiPlus } from "react-icons/fi";

export default function ActionBar({ 
  placeholderBusca = "Buscar...", 
  textoBotao, 
  onBuscar, 
  onAdicionar,
  opcoesFiltro = [], 
  filtroSelecionado = "TODOS",
  setFiltroSelecionado 
}) {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  // Nova função: seleciona apenas um e já fecha o menu
  const handleSelectFiltro = (valor) => {
    setFiltroSelecionado(valor);
    setMostrarFiltro(false); 
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 w-full">
      
      {/* Busca + Botão de Filtro */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={placeholderBusca}
            onChange={(e) => onBuscar(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0b4263] focus:border-[#0b4263] transition-colors"
          />
        </div>

        {opcoesFiltro.length > 0 && (
          <div className="relative">
            <button 
              onClick={() => setMostrarFiltro(!mostrarFiltro)}
              className="flex items-center justify-center w-11 h-11 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-yellow-500 hover:text-[#0b4263] transition-colors"
              title="Filtrar"
            >
              <FiFilter size={20} />
              
              {/* Bolinha laranja indicadora (aparece se não for "TODOS") */}
              {filtroSelecionado !== "TODOS" && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-3.5 h-3.5 border-2 border-white"></span>
              )}
            </button>

            {/* (Radio Buttons) */}
            {mostrarFiltro && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl p-2 z-50">
                
                {/* Opção "Todos" */}
                <label className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="filtro-status"
                    checked={filtroSelecionado === "TODOS"}
                    onChange={() => handleSelectFiltro("TODOS")}
                    className="w-4 h-4 text-[#0b4263] border-gray-300 focus:ring-[#0b4263] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 font-medium">Todos</span>
                </label>
                
                <div className="h-px bg-gray-100 my-1"></div>

                {/* Lista de Opções Dinâmicas */}
                {opcoesFiltro.map((opcao) => (
                  <label key={opcao.value} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="filtro-status"
                      checked={filtroSelecionado === opcao.value}
                      onChange={() => handleSelectFiltro(opcao.value)}
                      className="w-4 h-4 text-[#0b4263] border-gray-300 focus:ring-[#0b4263] cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">{opcao.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/*  Botão de Adicionar (Azul Escuro) */}
      <button 
        onClick={onAdicionar}
        className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0b4263] hover:bg-[#08334d] text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
      >
        <FiPlus size={20} />
        <span>{textoBotao}</span>
      </button>

    </div>
  );
}