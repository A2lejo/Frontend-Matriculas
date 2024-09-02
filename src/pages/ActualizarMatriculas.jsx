import { FormularioMatriculas } from "@components/FormularioMatriculas";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alertas from "@components/Alertas";
import axios from "axios";

const ActualizarMatriculas = () => {
	const { id } = useParams();
	const [matricula, setMatricula] = useState({});
	const [alerta, setAlerta] = useState({});

	useEffect(() => {
		const consultarMatricula = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/matricula/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setMatricula(response.data.matriculas);
			} catch (error) {
				setAlerta({
					respuesta: `No existe una matricula con el id ${id}`,
					exito: false,
				});
			}
		};
		consultarMatricula();
	}, []);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">
				Actualizar Matricula
			</h1>
			<p className="mb-8 my-4">
				Actualiza los datos de la matricula
			</p>
			{matricula?._id ? (
				<FormularioMatriculas matricula={matricula} />
			) : (
				alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)
			)}
		</div>
	);
};

export default ActualizarMatriculas;
