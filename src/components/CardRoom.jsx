const statusConfig = {
  VAGO: {
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    badgeBg: "bg-green-100",
    badgeText: "text-green-700",
    label: "Vago",
  },
  OCUPADO: {
    bg: "bg-gray-100",
    border: "border-gray-200",
    iconBg: "bg-gray-200",
    iconColor: "text-gray-500",
    badgeBg: "bg-gray-200",
    badgeText: "text-gray-600",
    label: "Ocupado",
  },
  RESERVADO: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-700",
    label: "Reservado",
  },
  MANUTENCAO: {
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    badgeBg: "bg-red-100",
    badgeText: "text-red-600",
    label: "Manutenção",
  },
};

// SVG Icons
const BedIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4v16" />
    <path d="M22 4v16" />
    <path d="M2 8h20" />
    <path d="M2 20h20" />
    <path d="M6 8v12" />
    <rect x="6" y="4" width="12" height="4" rx="1" />
  </svg>
);

const WrenchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const PeopleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default function CardRoom({ room }) {
  const config = statusConfig[room.status];
  const isManutencao = room.status === "MANUTENCAO";

  return (
    <div
      className={`p-4 rounded-2xl border ${config.bg} ${config.border} flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer`}
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-full ${config.iconBg} flex items-center justify-center`}>
          {isManutencao ? (
            <WrenchIcon className={`w-4 h-4 ${config.iconColor}`} />
          ) : (
            <BedIcon className={`w-4 h-4 ${config.iconColor}`} />
          )}
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${config.badgeBg} ${config.badgeText}`}
        >
          {config.label}
        </span>
      </div>

      {/* Room name */}
      <h3 className="font-semibold text-gray-800 text-sm leading-snug">
        {room.name}
      </h3>

      {/* Guests */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <PeopleIcon className="w-3.5 h-3.5" />
          <span>
            {room.guests} {room.guests === 1 ? "pessoa" : "pessoas"}
          </span>
        </div>

        {/* O botão Detalhes só aparece se a prop "onClickDetalhes" for passada */}
        {room.onClickDetalhes && (
          <button
            onClick={() => room.onClickDetalhes(room)}
            className="text-xs font-semibold text-[#0b4263] hover:text-[#F59F0A] transition-colors"
          >
            Detalhes
          </button>
        )}
      </div>
    </div>
  );
}