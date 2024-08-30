import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useNavigate } from "react-router-dom";

const TablaMaterias = ({materia = []}) => {
	const [materias, setMaterias] = useState([...materia]);
	const navigate = useNavigate();

	const listarMaterias = async () => {
		console.log(materia)
		if (materias.length > 0) return;
		try {
			const respuesta = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/materias`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setMaterias(respuesta.data, ...materias);
			
		} catch (error) {}
	};

	useEffect(() => {
		listarMaterias();
	}, []);

	const handleDelete = async (codigo) => {
		try {
			if (
				confirm(
					"Vas a realizar la salida de una materia, ¿Estás seguro de realizar esta acción?"
				)
			) {
				await axios.delete(
					`${import.meta.env.VITE_BACKEND_URL}/materia/${codigo}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
						data: {
							salida: new Date().toString(),
						},
					}
				);
				listarMaterias();
			}
		} catch (error) {}
	};

	return (
		<>
			{materias.length == 0 ? (
				<Alertas exito={true}>No existen registros</Alertas>
			) : (
				<table className="w-full mt-5 table-auto shadow-lg  bg-white">
					<thead className="bg-gray-800 text-slate-400">
						<tr>
							<th className="p-2">N°</th>
							<th className="p-2">Nombre</th>
							<th className="p-2">Código</th>
							<th className="p-2">Créditos</th>
							<th className="p-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{materias.map((materia, index) => (
							<tr
								className="border-b hover:bg-gray-300 text-center"
								key={materia._id}
							>
								<td>{index + 1}</td>
								<td>{materia.nombre}</td>
								<td>{materia.codigo}</td>
								<td>{materia.creditos}</td>
								<td className="py-2 text-center">
									<MdInfo
										className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
										onClick={() =>
											navigate(
												`/dashboard/materias/visualizar/${materia.codigo}`
											)
										}
									/>

										<>
											<MdNoteAdd
												className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
												onClick={() =>
													navigate(
														`/dashboard/materias/actualizar/${materia.codigo}`
													)
												}
											/>

											<MdDeleteForever
												className="h-7 w-7 text-red-900 cursor-pointer inline-block"
												onClick={() =>
													handleDelete(materia._id)
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

export default TablaMaterias;
