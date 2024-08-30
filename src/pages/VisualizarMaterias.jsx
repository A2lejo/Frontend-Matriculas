import { useParams } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useEffect, useContext, useState } from "react";
import TablaEstudiantes from "@components/TablaEstudiantes";

const VisualizarMaterias = () => {
	const { codigo } = useParams();
	const [estudiantes, setEstudiantes] = useState([]);
	const [materia, setMateria] = useState({});
	const [alerta, setAlerta] = useState({});
	const [alertaEstudiantes] = useState({});

	useEffect(() => {
		const consultarMateria = async () => {
			try {
				const respuesta = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/materia/${codigo}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setMateria(respuesta.data.materia);
				setEstudiantes(respuesta.data.estudiantes);
				console.log(respuesta.data.estudiantes);
			} catch (error) {
				setAlerta({ respuesta: error.response.data.res, exito: false });
			}
		};
		consultarMateria();
	}, []);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">Visualizar</h1>
			{materia._id ? (
				<>
					<div className="m-5 flex justify-between">
						<div>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Nombre de la Materia:{" "}
								</span>
								{materia.nombre}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Código de la Materia:{" "}
								</span>
								{materia.codigo}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Descripción de la Materia:{" "}
								</span>
								{materia.descripcion}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Créditos:{" "}
								</span>
								{materia.creditos}
							</p>
						</div>
					</div>
					<hr className="my-4" />
					<div className="flex justify-between items-center">
						<p>
							Estudantes registrados en la materia:{" "}
						</p>
					</div>

					{estudiantes.length === 0 ? (
						<Alertas exito={true}>No existen registros</Alertas>
					) : (
						<>
							{alertaEstudiantes.respuesta && (
								<Alertas exito={alertaEstudiantes.exito}>
									{alertaEstudiantes.respuesta}
								</Alertas>
							)}
							<TablaEstudiantes estudiante={estudiantes}
							/>
						</>
					)}
				</>
			) : (
				alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)
			)}
		</div>
	);
};

export default VisualizarMaterias;
