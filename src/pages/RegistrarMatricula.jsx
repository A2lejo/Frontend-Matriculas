import { FormularioMatriculas } from "@components/FormularioMatriculas";

const RegistarMatricula = () => {
	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">
				Registrar Matricula
			</h1>
			<p className="mb-8 my-4">
				Registra los datos de la matricula
			</p>
				<FormularioMatriculas/>
		</div>
	);
};

export default RegistarMatricula;
