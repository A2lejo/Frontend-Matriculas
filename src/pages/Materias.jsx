import React from "react";
import TablaMaterias from "@components/TablaMaterias";
import { useNavigate } from "react-router-dom";

const Materias = () => {
	const navigate = useNavigate();
	return (
		<div>
			<h1 className="font-serif text-4xl text-gray-500">Materias</h1>
			<hr className="my-2" />
			<button className="py-1.5 px-2 block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white" onClick={() => navigate("/dashboard/materias/registrar")}> Registrar </button>
			<TablaMaterias />


		</div>
	);
};

export default Materias;