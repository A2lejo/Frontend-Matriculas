import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useNavigate } from "react-router-dom";

const TablaMatriculas = () => {
	const [matriculas, setMatriculas] = useState([]);
	const navigate = useNavigate();

	const listarMatriculas = async () => {
		try {
			const respuesta = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/matriculas`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setMatriculas(respuesta.data, ...matriculas);
			
		} catch (error) {}
	};

	useEffect(() => {
		listarMatriculas();
	}, []);

	const handleDelete = async (id) => {
		try {
			if (
				confirm(
					"Vas a realizar la salida de una matricula, ¿Estás seguro de realizar esta acción?"
				)
			) {
				await axios.delete(
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
				listarMatriculas();
			}
		} catch (error) {}
	};

	return (
		<>
			{matriculas.length == 0 ? (
				<Alertas exito={true}>No existen registros</Alertas>
			) : (
				<table className="w-full mt-5 table-auto shadow-lg  bg-white">
					<thead className="bg-gray-800 text-slate-400">
						<tr>
							<th className="p-2">N°</th>
							<th className="p-2">Código</th>
							<th className="p-2">Descripción</th>
							<th className="p-2">Créditos</th>
							<th className="p-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{matriculas.map((matricula, index) => (
							<tr
								className="border-b hover:bg-gray-300 text-center"
								key={matricula._id}
							>
								<td>{index + 1}</td>
								<td>{matricula.codigo}</td>
								<td>{matricula.descripcion}</td>
								<td>{matricula.creditos}</td>
								<td className="py-2 text-center">
									<MdInfo
										className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
										onClick={() =>
											navigate(
												`/dashboard/matriculas/visualizar/${matricula._id}`
											)
										}
									/>

										<>
											<MdNoteAdd
												className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
												onClick={() =>
													navigate(
														`/dashboard/matriculas/actualizar/${matricula._id}`
													)
												}
											/>

											<MdDeleteForever
												className="h-7 w-7 text-red-900 cursor-pointer inline-block"
												onClick={() =>
													handleDelete(matricula._id)
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

export default TablaMatriculas;
