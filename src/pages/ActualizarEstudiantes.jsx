import { FormularioEstudiantes } from "@components/FormularioEstudiantes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alertas from "@components/Alertas";
import axios from "axios";

const ActualizarEstudiante = () => {
	const { id } = useParams();
	const [estudiante, setEstudiante] = useState({});
	const [alerta, setAlerta] = useState({});

	useEffect(() => {
		const consultarEstudiante = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/estudiante/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setEstudiante(response.data.estudiante);
			} catch (error) {
				setAlerta({
					respuesta: `No existe un estudidante con el id ${id}`,
					exito: false,
				});
			}
		};
		consultarEstudiante();
	}, []);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">
				Actualizar Estudiante
			</h1>
			<p className="mb-8 my-4">
				Actualiza los datos del estudiante con la cedula {id}
			</p>
			{estudiante._id ? (
				<FormularioEstudiantes estudiante={estudiante} />
			) : (
				alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)
			)}
		</div>
	);
};

export default ActualizarEstudiante;
