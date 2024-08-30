import { FormularioMaterias } from "@components/FormularioMaterias";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alertas from "@components/Alertas";
import axios from "axios";

const ActualizarMaterias = () => {
	const { id } = useParams();
	const [materia, setMateria] = useState({});
	const [alerta, setAlerta] = useState({});

	useEffect(() => {
		const consultarMateria = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/materia/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setMateria(response.data.materia);
			} catch (error) {
				setAlerta({
					respuesta: `No existe una meteria con el id ${id}`,
					exito: false,
				});
			}
		};
		consultarMateria();
	}, []);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">
				Actualizar Materia
			</h1>
			<p className="mb-8 my-4">
				Actualiza los datos de la materia con el código {id}
			</p>
			{materia._id ? (
				<FormularioMaterias materia={materia} />
			) : (
				alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)
			)}
		</div>
	);
};

export default ActualizarMaterias;
