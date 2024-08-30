import { FormularioMaterias } from "@components/FormularioMaterias";

const RegistarMateria = () => {
	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">
				Registrar Materia
			</h1>
			<p className="mb-8 my-4">
				Registra los datos de la materia
			</p>
				<FormularioMaterias/>
		</div>
	);
};

export default RegistarMateria;
