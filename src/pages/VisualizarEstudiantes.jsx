import { useParams } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useEffect, useContext, useState } from "react";
import TablaMaterias from "@components/TablaMaterias";

const VisualizarEstudiantes = () => {
	const { cedula } = useParams();
	const [materias, setMaterias] = useState([]);
	const [estudiante, setEstudiante] = useState({});
	const [alerta, setAlerta] = useState({});
	const [alertaMateria, setAlertaMateria] = useState({});


	const formatearFecha = (fecha) => {
		const nuevaFecha = new Date(fecha);
		nuevaFecha.setMinutes(
			nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
		);
		return new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(
			nuevaFecha
		);
	};

	useEffect(() => {
		const consultarEstudiante = async () => {
			try {
				const respuesta = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/estudiante/${cedula}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setEstudiante(respuesta.data.estudiante);
				setMaterias(respuesta.data.materias);
			} catch (error) {
				setAlerta({ respuesta: error.response.data.res, exito: false });
			}
		};
		consultarEstudiante();
	}, []);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">Visualizar</h1>
			{estudiante._id ? (
				<>
					<div className="m-5 flex justify-between">
						<div>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Nombre del Estudiante:{" "}
								</span>
								{estudiante.nombre}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Apellido del Estudiante:{" "}
								</span>
								{estudiante.apellido}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Cédula del Estudiante:{" "}
								</span>
								{estudiante.cedula}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Fecha de nacimiento:{" "}
								</span>
								{formatearFecha(estudiante.fechaNacimiento)}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Ciudad:{" "}
								</span>
								{estudiante.ciudad}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Dirección:{" "}
								</span>
								{estudiante.direccion}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Telefono:{" "}
								</span>
								{estudiante.telefono}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Email:{" "}
								</span>
								{estudiante.email}
							</p>
						</div>
					</div>
					<hr className="my-4" />
					<div className="flex justify-between items-center">
						<p>
							Materias del estudiante:{" "}
						</p>
					</div>

					{materias.length === 0 ? (
						<Alertas exito={true}>No existen registros</Alertas>
					) : (
						<>
							{alertaMateria.respuesta && (
								<Alertas exito={alertaMateria.exito}>
									{alertaMateria.respuesta}
								</Alertas>
							)}
							<TablaMaterias materia={materias}
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

export default VisualizarEstudiantes;
