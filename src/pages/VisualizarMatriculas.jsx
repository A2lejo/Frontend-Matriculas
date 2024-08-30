import { useParams } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useEffect, useState } from "react";
import TablaMaterias from "@components/TablaMaterias";
import TablaEstudiantes from "@components/TablaEstudiantes";

const VisualizarMatriculas = () => {
	const { id } = useParams();
	const [matricula, setMatricula] = useState([]);
	const [materias, setMaterias] = useState({});
	const [estudiantes, setEstudiantes] = useState({});
	const [alerta, setAlerta] = useState({});
	const [alertaMaterias] = useState({});
	const [alertaEstudiantes] = useState({});

	useEffect(() => {
		const consultarMatricula = async () => {
			try {
				const respuesta = await axios.get(
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
				setMatricula(respuesta.data.matriculas);
				setMaterias([respuesta.data.matriculas.materia]);
				setEstudiantes([respuesta.data.matriculas.estudiante]	);
			} catch (error) {
				setAlerta({ respuesta: error.response.data.res, exito: false });
			}
		};
		consultarMatricula();
	}, [id]);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">Visualizar</h1>
			{matricula?._id ?  (
				<>
					<div className="m-5 flex justify-between">
						<div>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Código de la matricula:{" "}
								</span>
								{matricula.codigo}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Descripción:{" "}
								</span>
								{matricula.descripcion}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Créditos:{" "}
								</span>
								{matricula.creditos}
							</p>
						</div>
					</div>
					<hr className="my-4" />
					{<div className="flex justify-between items-center">
						<p>
							Estudante:{" "}
						</p>
					</div>}

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
					<hr className="my-4" />
					{<div className="flex justify-between items-center">
						<p>
							Materias:{" "}
						</p>
					</div>}

					{materias.length === 0 ? (
						<Alertas exito={true}>No existen registros</Alertas>
					) : (
						<>
							{alertaMaterias.respuesta && (
								<Alertas exito={alertaMaterias.exito}>
									{alertaMaterias.respuesta}
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

export default VisualizarMatriculas;
