import { FaRegUser } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import { MdOutlineBed } from "react-icons/md";

const CardReservas = ({ foto, nome, status, quarto, dados, valor, forma }) => {
  return (
    <section>
      <div className="hover:bg-neutral-200/55
        items-center  p-11 rounded-2xl  flex gap-6 ">

        <div className="flex justify-center items-center h-15 w-14  bg-gray-300   rounded-2xl">
          {foto}
        </div>
        <div className="relative flex  flex-col">

          {/* NOME + STATUS */}
          <div className="flex items-center gap-3">
            <h2>{nome}</h2>

            <span
              className={`px-3 py-1 rounded-2xl text-sm  ${status === "pago" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
              {status === "pago" ? "pago" : "pendente"}
            </span>
          </div>

          {/* QUARTO E DADOS */}
          <div className="flex relative gap-4 mt-1">
            <div className="flex text-neutral-500 font-extraligth">
              <MdOutlineBed className="text-neutral-400 relative size-5 -bottom-1 right-1" />
              <p>{quarto}</p>
            </div>

            <div className="flex text-neutral-500 font-extralight">
              <GoCalendar className="text-neutral-500 relative -bottom-1 right-1" />
              <p>{dados}</p>
            </div>
          </div>

        </div>
        <div className="relative  top-1 left-6" >
          <div className="font-bold flex justify-end  ">{valor}</div>
          <div className="text-neutral-500 flex justify-end  font-light ">{forma}</div>
        </div>
      </div>



    </section>
  );
}

export default CardReservas;