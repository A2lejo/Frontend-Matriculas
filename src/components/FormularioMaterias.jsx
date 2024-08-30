import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";

export const FormularioMaterias = ({ materia }) => {
	const navigate = useNavigate();

	const [alerta, setAlerta] = useState({});
	const { auth } = useContext(AuthContext);

	const [form, setform] = useState({
		nombre: materia?.nombre ?? "",
		codigo: materia?.codigo ?? "",
		descripcion: materia?.descripcion ?? "",
		creditos: materia?.creditos ?? ""
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (materia?._id) {
			await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/meteria/${materia?.codigo}`,
				form,
				{
					headers: {
						method: "PUT",
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			navigate("/dashboard/materias");
		} else {
			try {
				form.id = auth._id;
				await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/materias/registro`,
					form,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setAlerta({
					respuesta: "Materia registrada con exito",
					exito: true,
				});
				setTimeout(() => {
					navigate("/dashboard/materias");
				}, 3000);
			} catch (error) {
				setAlerta({ respuesta: error.response.data.res, exito: false });
				setTimeout(() => {
					setAlerta({});
				}, 5000);
			}
		}
	};

	const handleChange = (e) => {
		setform({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="nombre:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Nombre:
				</label>
				<input
					id="nombre"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Nombre de la materia"
					name="nombre"
					onChange={handleChange}
					value={form.nombre}
				/>
			</div>
			<div>
				<label
					htmlFor="codigo:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Código:
				</label>
				<input
					id="codigo"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Código de la materia"
					name="codigo"
					onChange={handleChange}
					value={form.codigo}
				/>
			</div>
			<div>
				<label
					htmlFor="descripcion:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Descripción:
				</label>
				<input
					id="descripcion"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Descripción de la materia"
					name="descripcion"
					onChange={handleChange}
					value={form.descripcion}
				/>
			</div>
			<div>
				<label
					htmlFor="creditos:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Créditos:
				</label>
				<input
					id="creditos"
					type="number"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Créditos de la materia"
					name="creditos"
					onChange={handleChange}
					value={form.creditos}
				/>
			</div>
			{alerta.respuesta && (
				<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
			)}
			<input
				type="submit"
				className="bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all"
				value={
					materia?._id ? "Actualizar materia" : "Registrar materia"
				}
			/>
		</form>
	);
};
