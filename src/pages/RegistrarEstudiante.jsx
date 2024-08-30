import { FormularioEstudiantes } from "@components/FormularioEstudiantes";

const RegistarEstudiante = () => {
	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">
				Registrar Estudiante
			</h1>
			<p className="mb-8 my-4">
				Registra los datos del estudiante
			</p>
				<FormularioEstudiantes/>
		</div>
	);
};

export default RegistarEstudiante;
