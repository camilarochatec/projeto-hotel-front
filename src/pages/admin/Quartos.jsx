import { useState } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import { AiOutlineCloudUpload, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ActionBar from "../../components/ActionBar"; 
import CardRoom from "../../components/CardRoom"; 
import Drawer from "../../components/Drawer";

// MOCK DE DADOS INICIAIS
const quartosIniciais = [
  { id: 1, name: "Suite Master 101", guests: 2, status: "OCUPADO" },
  { id: 2, name: "Suite Casal 102", guests: 2, status: "VAGO" },
  { id: 3, name: "Quarto Standard 103", guests: 1, status: "RESERVADO" },
];

export default function Quartos() {
  const [listaQuartos, setListaQuartos] = useState(quartosIniciais);
  const [busca, setBusca] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("TODOS");
  
  // GAVETA
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modoDrawer, setModoDrawer] = useState("CRIAR"); 
  
  // Estados do Formulário
  const [idEditando, setIdEditando] = useState(null);
  const [nomeForm, setNomeForm] = useState("");
  const [hospedesForm, setHospedesForm] = useState(1);
  const [statusForm, setStatusForm] = useState("VAGO");

  const [erroForm, setErroForm] = useState("");

  // Modal de Exclusão
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [quartoParaDeletar, setQuartoParaDeletar] = useState(null);

  const opcoesDeStatus = [
    { label: "Vagos", value: "VAGO" },
    { label: "Ocupados", value: "OCUPADO" },
    { label: "Reservados", value: "RESERVADO" },
    { label: "Em Manutenção", value: "MANUTENCAO" },
  ];

  // AÇÕES DA GAVETA
  const abrirGavetaNovo = () => {
    setModoDrawer("CRIAR");
    setIdEditando(null);
    setNomeForm(""); setHospedesForm(1); setStatusForm("VAGO");
    setErroForm("");
    setIsDrawerOpen(true);
  };

  const abrirGavetaDetalhes = (quarto) => {
    setModoDrawer("VISUALIZAR");
    setIdEditando(quarto.id);
    setNomeForm(quarto.name); setHospedesForm(quarto.guests); setStatusForm(quarto.status);
    setErroForm(""); 
    setIsDrawerOpen(true);
  };

  const cancelarEdicao = () => {
    const quartoOriginal = listaQuartos.find(q => q.id === idEditando);
    setNomeForm(quartoOriginal.name);
    setHospedesForm(quartoOriginal.guests);
    setStatusForm(quartoOriginal.status);
    setErroForm("");
    setModoDrawer("VISUALIZAR");
  };

  // VALIDAÇÃO E SALVAMENTO
  const handleSalvarGaveta = (e) => {
    e.preventDefault();
    setErroForm(""); 
    
    const nomeExiste = listaQuartos.some((quarto) => {
      if (modoDrawer === "EDITAR" && quarto.id === idEditando) {
        return false; 
      }
      return quarto.name.trim().toLowerCase() === nomeForm.trim().toLowerCase();
    });

    if (nomeExiste) {
      setErroForm("Já existe um quarto com este nome! Escolha outro.");
      return; 
    }

    //  SE PASSOU NA VALIDAÇÃO, SALVA OS DADOS
    if (modoDrawer === "CRIAR") {
      const novoQuarto = { id: Math.random(), name: nomeForm.trim(), guests: hospedesForm, status: statusForm };
      setListaQuartos([...listaQuartos, novoQuarto]);
    } else if (modoDrawer === "EDITAR") {
      const quartoEditado = { id: idEditando, name: nomeForm.trim(), guests: hospedesForm, status: statusForm };
      const novaLista = listaQuartos.map(q => q.id === idEditando ? quartoEditado : q);
      setListaQuartos(novaLista);
    }
    setIsDrawerOpen(false);
  };

  // AÇÕES DE EXCLUSÃO
  const abrirModalDeletar = () => {
    const quartoAtual = listaQuartos.find(q => q.id === idEditando);
    setQuartoParaDeletar(quartoAtual);
    setIsModalDeleteOpen(true);
  };

  const confirmarExclusao = () => {
    const novaLista = listaQuartos.filter(q => q.id !== quartoParaDeletar.id);
    setListaQuartos(novaLista);
    setIsModalDeleteOpen(false);
    setIsDrawerOpen(false); 
  };

  // FILTRO E BUSCA
  const quartosFiltrados = listaQuartos.filter((quarto) => {
    const bateuBusca = quarto.name.toLowerCase().includes(busca.toLowerCase());
    const bateuStatus = statusSelecionado === "TODOS" || quarto.status === statusSelecionado;
    return bateuBusca && bateuStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      
      <ActionBar 
        placeholderBusca="Buscar quartos..." 
        textoBotao="Novo Quarto"
        onBuscar={setBusca}
        onAdicionar={abrirGavetaNovo} 
        opcoesFiltro={opcoesDeStatus}
        filtroSelecionado={statusSelecionado}
        setFiltroSelecionado={setStatusSelecionado}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {quartosFiltrados.map((quarto) => (
          <CardRoom 
            key={quarto.id} 
            room={{ ...quarto, onClickDetalhes: abrirGavetaDetalhes }} 
          />
        ))}
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        titulo={
          modoDrawer === "CRIAR" ? "Adicionar Novo Quarto" : 
          modoDrawer === "VISUALIZAR" ? "Detalhes do Quarto" : "Editar Quarto"
        }
      >
        <div className="flex flex-col h-full">
          
          {modoDrawer === "VISUALIZAR" ? (
            <div className="flex flex-col gap-6 h-full">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col gap-4">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome/Número do Quarto</span>
                  <p className="text-lg font-bold text-[#0b4263] mt-1">{nomeForm}</p>
                </div>
                
                <div className="flex gap-8">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Capacidade</span>
                    <p className="text-gray-800 font-medium mt-1">{hospedesForm} {hospedesForm === 1 ? 'Pessoa' : 'Pessoas'}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Atual</span>
                    <p className="font-medium mt-1">
                      <span className={`px-2.5 py-1 rounded-full text-sm ${
                        statusForm === 'VAGO' ? 'bg-green-100 text-green-700' :
                        statusForm === 'OCUPADO' ? 'bg-gray-200 text-gray-700' :
                        statusForm === 'RESERVADO' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {statusForm}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-3">
                <button 
                  onClick={abrirModalDeletar}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-xl transition-colors cursor-pointer"
                >
                  <AiOutlineDelete size={20} /> Excluir
                </button>

                <button 
                  onClick={() => setModoDrawer("EDITAR")}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0b4263] hover:bg-[#08334d] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  <AiOutlineEdit size={20} /> Editar Dados
                </button>
              </div>
            </div>

          ) : (

            <form onSubmit={handleSalvarGaveta} className="flex flex-col gap-5 h-full">
              
              {/* MENSAGEM DE ERRO VISUAL (Se existir) */}
              {erroForm && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <FiAlertTriangle size={16} className="shrink-0" />
                  <span>{erroForm}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome/Número do Quarto</label>
                <input 
                  type="text" required value={nomeForm} 
                  onChange={(e) => {
                    setNomeForm(e.target.value);
                    setErroForm(""); 
                  }}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
                    erroForm ? "border-red-300 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  }`}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade</label>
                  <input 
                    type="number" min="1" required value={hospedesForm} onChange={(e) => setHospedesForm(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={statusForm} onChange={(e) => setStatusForm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  >
                    <option value="VAGO">Vago</option>
                    <option value="OCUPADO">Ocupado</option>
                    <option value="RESERVADO">Reservado</option>
                    <option value="MANUTENCAO">Manutenção</option>
                  </select>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-3">
                {modoDrawer === "EDITAR" ? (
                  <button 
                    type="button" onClick={cancelarEdicao}
                    className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                ) : (
                  <div></div> 
                )}

                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-[#F59F0A] hover:bg-[#d98b09] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer">
                  {modoDrawer === "CRIAR" ? (
                    "Criar Quarto"
                  ) : (
                    <>
                      <AiOutlineCloudUpload size={20} /> Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </Drawer>

      {isModalDeleteOpen && quartoParaDeletar && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center transform scale-100 animate-fade-in-up">
            
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <FiAlertTriangle size={32} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Quarto?</h3>
            <p className="text-gray-500 mb-6">
              Você está prestes a deletar o quarto <strong className="text-gray-800">{quartoParaDeletar.name}</strong>. Esta ação não pode ser desfeita.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalDeleteOpen(false)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarExclusao}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-md shadow-red-500/20 cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}