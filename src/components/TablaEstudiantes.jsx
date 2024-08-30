import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useNavigate } from "react-router-dom";

const TablaEstudiantes = ({estudiante = []}) => {
	const [estudiantes, setEstudiantes ] = useState([...estudiante]);
	const navigate = useNavigate();

	const listarEstudiantes = async () => {
		if (estudiantes.length > 0) return;
		try {
			const respuesta = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/estudiantes`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setEstudiantes(respuesta.data, ...estudiantes);
			
		} catch (error) {}
	};

	useEffect(() => {
		listarEstudiantes();
	}, []);



	const handleDelete = async (cedula) => {
		try {
			if (
				confirm(
					"Vas a realizar la salida de un estudiante, ¿Estás seguro de realizar esta acción?"
				)
			) {
				await axios.delete(
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
				setEstudiantes(estudiantes.filter((estudiante) => estudiante.cedula !== cedula));
			}
		} catch (error) {}
	};

	return (
		<>
			{estudiantes.length == 0 ? (
				<Alertas exito={true}>No existen registros</Alertas>
			) : (
				<table className="w-full mt-5 table-auto shadow-lg  bg-white">
					<thead className="bg-gray-800 text-slate-400">
						<tr>
							<th className="p-2">N°</th>
							<th className="p-2">Nombre</th>
							<th className="p-2">Apellido</th>
							<th className="p-2">Cedula</th>
							<th className="p-2">Cuidad</th>
							<th className="p-2">Email</th>
							<th className="p-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{estudiantes.map((estudiante, index) => (
							<tr
								className="border-b hover:bg-gray-300 text-center"
								key={estudiante._id}
							>
								<td>{index + 1}</td>
								<td>{estudiante.nombre}</td>
								<td>{estudiante.apellido}</td>
								<td>{estudiante.cedula}</td>
								<td>{estudiante.ciudad}</td>
								<td>{estudiante.email}</td>
								<td className="py-2 text-center">
									<MdInfo
										className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
										onClick={() =>
											navigate(
												`/dashboard/estudiantes/visualizar/${estudiante.cedula}`
											)
										}
									/>

										<>
											<MdNoteAdd
												className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
												onClick={() =>
													navigate(
														`/dashboard/estudiantes/actualizar/${estudiante.cedula}`
													)
												}
											/>

											<MdDeleteForever
												className="h-7 w-7 text-red-900 cursor-pointer inline-block"
												onClick={() =>
													handleDelete(estudiante.cedula)
												}
											/>
										</>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default TablaEstudiantes;
