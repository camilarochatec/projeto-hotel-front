import { useState } from "react";
import { FiX, FiAlertTriangle, FiMail, FiPhone, FiMapPin, FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineCloudUpload, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ActionBar from "../../components/ActionBar"; 
import Drawer from "../../components/Drawer";

// ==========================================
// MOCK DE DADOS INICIAIS
// ==========================================
const clientesIniciais = [
  { id: 1, name: "Carlos Eduardo Mendes", docType: "CPF", document: "123.456.789-00", email: "carlos@email.com", phone: "(11) 98765-4321", city: "São Paulo, SP" },
  { id: 2, name: "Fernanda Oliveira", docType: "CPF", document: "987.654.321-00", email: "fernanda@email.com", phone: "(21) 98765-1234", city: "Rio de Janeiro, RJ" },
  { id: 3, name: "Roberto Almeida", docType: "CPF", document: "456.789.123-00", email: "roberto@email.com", phone: "(31) 99876-5432", city: "Belo Horizonte, MG" },
];

export default function Clientes() {
  const [listaClientes, setListaClientes] = useState(clientesIniciais);
  const [busca, setBusca] = useState("");
  
  // ESTADOS DA GAVETA
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modoDrawer, setModoDrawer] = useState("CRIAR"); 
  const [erroForm, setErroForm] = useState("");
  
  // Estados do Formulário
  const [idEditando, setIdEditando] = useState(null);
  const [nomeForm, setNomeForm] = useState("");
  const [tipoDocForm, setTipoDocForm] = useState("CPF");
  const [documentoForm, setDocumentoForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [telefoneForm, setTelefoneForm] = useState("");
  const [cidadeForm, setCidadeForm] = useState("");

  // Modal de Exclusão
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [clienteParaDeletar, setClienteParaDeletar] = useState(null);

  // ==========================================
  // FUNÇÕES AUXILIARES
  // ==========================================
  const getIniciais = (nome) => {
    const pedacos = nome.trim().split(" ");
    if (pedacos.length >= 2) {
      return (pedacos[0][0] + pedacos[1][0]).toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  // ==========================================
  // AÇÕES DA GAVETA
  // ==========================================
  const abrirGavetaNovo = () => {
    setModoDrawer("CRIAR");
    setIdEditando(null);
    setNomeForm(""); setTipoDocForm("CPF"); setDocumentoForm(""); setEmailForm(""); setTelefoneForm(""); setCidadeForm("");
    setErroForm("");
    setIsDrawerOpen(true);
  };

  const abrirGavetaDetalhes = (cliente) => {
    setModoDrawer("VISUALIZAR");
    setIdEditando(cliente.id);
    setNomeForm(cliente.name); setTipoDocForm(cliente.docType); setDocumentoForm(cliente.document); 
    setEmailForm(cliente.email); setTelefoneForm(cliente.phone); setCidadeForm(cliente.city);
    setErroForm("");
    setIsDrawerOpen(true);
  };

  const cancelarEdicao = () => {
    const clienteOriginal = listaClientes.find(c => c.id === idEditando);
    setNomeForm(clienteOriginal.name); setTipoDocForm(clienteOriginal.docType); setDocumentoForm(clienteOriginal.document);
    setEmailForm(clienteOriginal.email); setTelefoneForm(clienteOriginal.phone); setCidadeForm(clienteOriginal.city);
    setErroForm("");
    setModoDrawer("VISUALIZAR");
  };

  const handleSalvarGaveta = (e) => {
    e.preventDefault();
    setErroForm(""); 
    
    const docExiste = listaClientes.some((cliente) => {
      if (modoDrawer === "EDITAR" && cliente.id === idEditando) return false; 
      return cliente.document === documentoForm.trim();
    });

    if (docExiste) {
      setErroForm("Já existe um cliente cadastrado com este documento.");
      return; 
    }

    const dadosCliente = { 
      id: modoDrawer === "CRIAR" ? Math.random() : idEditando, 
      name: nomeForm.trim(), 
      docType: tipoDocForm, 
      document: documentoForm.trim(), 
      email: emailForm.trim(), 
      phone: telefoneForm.trim(), 
      city: cidadeForm.trim() 
    };

    if (modoDrawer === "CRIAR") {
      setListaClientes([...listaClientes, dadosCliente]);
    } else {
      setListaClientes(listaClientes.map(c => c.id === idEditando ? dadosCliente : c));
    }
    
    setIsDrawerOpen(false);
  };

  // ==========================================
  // AÇÕES DE EXCLUSÃO
  // ==========================================
  const abrirModalDeletar = () => {
    setClienteParaDeletar(listaClientes.find(c => c.id === idEditando));
    setIsModalDeleteOpen(true);
  };

  const confirmarExclusao = () => {
    setListaClientes(listaClientes.filter(c => c.id !== clienteParaDeletar.id));
    setIsModalDeleteOpen(false);
    setIsDrawerOpen(false); 
  };

  const clientesFiltrados = listaClientes.filter((cliente) => 
    cliente.name.toLowerCase().includes(busca.toLowerCase()) || 
    cliente.document.includes(busca)
  );

  return (
    <div className="w-full relative">
      
      <ActionBar 
        placeholderBusca="Buscar clientes..." 
        textoBotao="Novo Cliente"
        onBuscar={setBusca}
        onAdicionar={abrirGavetaNovo} 
      />

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-6">
        
        <div className="overflow-x-auto w-full rounded-2xl">
          <div className="min-w-[900px]">
            
            {/* Cabeçalho da Tabela - Invertemos a ordem no grid-cols! */}
            <div className="grid grid-cols-[auto_2.5fr_1.5fr_2fr_1.5fr] gap-4 p-4 bg-[#fafafa] border-b border-gray-200 text-sm font-medium text-gray-500">
              <div className="w-12 text-center"></div> {/* Espaço dos 3 pontinhos no início */}
              <div>Nome</div>
              <div>Documento</div>
              <div>Contato</div>
              <div>Cidade</div>
            </div>

            {/* Linhas da Tabela */}
            <div className="flex flex-col divide-y divide-gray-100">
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <div key={cliente.id} className="grid grid-cols-[auto_2.5fr_1.5fr_2fr_1.5fr] gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                    
                    {/* Coluna 1: Ações (3 pontinhos agora são os primeiros da linha!) */}
                    <div className="flex justify-center">
                      <button 
                        onClick={() => abrirGavetaDetalhes(cliente)}
                        className="p-2 text-gray-400 hover:text-[#0b4263] hover:bg-gray-200 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="Detalhes do Cliente"
                      >
                        <FiMoreHorizontal size={20} />
                      </button>
                    </div>

                    {/* Coluna 2: Avatar e Nome */}
                    <div className="flex items-center gap-4 truncate">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0b4263] flex items-center justify-center font-bold text-sm shrink-0">
                        {getIniciais(cliente.name)}
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-sm font-semibold text-gray-800 truncate">{cliente.name}</span>
                        <span className="text-xs text-gray-500 font-medium">{cliente.docType}</span>
                      </div>
                    </div>

                    {/* Coluna 3: Documento */}
                    <div className="text-sm text-gray-600 truncate">
                      {cliente.document}
                    </div>

                    {/* Coluna 4: Contato */}
                    <div className="flex flex-col gap-1 text-sm text-gray-600 truncate">
                      <div className="flex items-center gap-2 truncate">
                        <FiMail className="text-gray-400 shrink-0" />
                        <span className="truncate">{cliente.email}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <FiPhone className="text-gray-400 shrink-0" />
                        <span className="truncate">{cliente.phone}</span>
                      </div>
                    </div>

                    {/* Coluna 5: Cidade */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                      <FiMapPin className="text-gray-400 shrink-0" />
                      <span className="truncate">{cliente.city}</span>
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">Nenhum cliente encontrado.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        titulo={
          modoDrawer === "CRIAR" ? "Adicionar Novo Cliente" : 
          modoDrawer === "VISUALIZAR" ? "Detalhes do Cliente" : "Editar Cliente"
        }
      >
        <div className="flex flex-col h-full">
          
          {modoDrawer === "VISUALIZAR" ? (
            <div className="flex flex-col gap-6 h-full">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col gap-5">
                
                <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0b4263] flex items-center justify-center font-bold text-xl shrink-0">
                    {getIniciais(nomeForm)}
                  </div>
                  <div className="truncate">
                    <h4 className="text-xl font-bold text-[#0b4263] truncate">{nomeForm}</h4>
                    <p className="text-sm text-gray-500 truncate">{cidadeForm}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Documento ({tipoDocForm})</span>
                    <p className="text-gray-800 font-medium mt-1 truncate">{documentoForm}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefone</span>
                    <p className="text-gray-800 font-medium mt-1 truncate">{telefoneForm}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-mail</span>
                    <p className="text-gray-800 font-medium mt-1 truncate">{emailForm}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button 
                  onClick={abrirModalDeletar}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-xl transition-colors cursor-pointer"
                >
                  <AiOutlineDelete size={20} /> Excluir
                </button>
                <button 
                  onClick={() => setModoDrawer("EDITAR")}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#0b4263] hover:bg-[#08334d] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  <AiOutlineEdit size={20} /> Editar Dados
                </button>
              </div>
            </div>

          ) : (

            <form onSubmit={handleSalvarGaveta} className="flex flex-col gap-5 h-full">
              
              {erroForm && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <FiAlertTriangle size={16} className="shrink-0" />
                  <span>{erroForm}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input 
                  type="text" required value={nomeForm} onChange={(e) => setNomeForm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select 
                    value={tipoDocForm} onChange={(e) => setTipoDocForm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  >
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                    <option value="Passaporte">Passaporte</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nº Documento</label>
                  <input 
                    type="text" required value={documentoForm} onChange={(e) => { setDocumentoForm(e.target.value); setErroForm(""); }}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    type="email" required value={emailForm} onChange={(e) => setEmailForm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input 
                    type="text" required value={telefoneForm} onChange={(e) => setTelefoneForm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade / UF</label>
                <input 
                  type="text" required value={cidadeForm} onChange={(e) => setCidadeForm(e.target.value)} placeholder="Ex: São Paulo, SP"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59F0A]/20 focus:border-[#F59F0A]"
                />
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                {modoDrawer === "EDITAR" ? (
                  <button 
                    type="button" onClick={cancelarEdicao}
                    className="w-full sm:w-auto px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                ) : <div className="hidden sm:block"></div>}

                <button type="submit" className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#F59F0A] hover:bg-[#d98b09] text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer">
                  {modoDrawer === "CRIAR" ? "Salvar Cliente" : <><AiOutlineCloudUpload size={20} /> Salvar Alterações</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </Drawer>

      {/* MODAL PEQUENO DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {isModalDeleteOpen && clienteParaDeletar && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center transform scale-100 animate-fade-in-up">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <FiAlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Cliente?</h3>
            <p className="text-gray-500 mb-6">
              Você está prestes a deletar o cliente <strong className="text-gray-800">{clienteParaDeletar.name}</strong>. Esta ação não pode ser desfeita.
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