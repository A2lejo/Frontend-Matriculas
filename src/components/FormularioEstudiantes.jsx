import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";

export const FormularioEstudiantes = ({ estudiante }) => {
	const navigate = useNavigate();

	const [alerta, setAlerta] = useState({});
	const { auth } = useContext(AuthContext);

	const [form, setform] = useState({
		nombre: estudiante?.nombre ?? "",
		apellido: estudiante?.apellido ?? "",
		cedula: estudiante?.cedula ?? "",
		fechaNacimiento: estudiante?.fechaNacimiento ?? "",
		ciudad: estudiante?.ciudad ?? "",
		direccion: estudiante?.direccion ?? "",
		telefono: estudiante?.telefono ?? "",	
		email: estudiante?.email ?? "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (estudiante?._id) {
			await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/estudiante/${estudiante?.cedula}`,
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

			navigate("/dashboard/estudiantes");
		} else {
			try {
				form.id = auth._id;
				await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/estudiantes/registro`,
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
					respuesta: "Estudiante registrado con exito",
					exito: true,
				});
				setTimeout(() => {
					navigate("/dashboard/estudiantes");
				}, 5000);
			} catch (error) {
				setAlerta({ respuesta: error.response.data.res, exito: false });
				setTimeout(() => {
					setAlerta({});
				}, 3000);
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
					placeholder="Nombre del estudiante"
					name="nombre"
					onChange={handleChange}
					value={form.nombre}
				/>
			</div>
			<div>
				<label
					htmlFor="apellido:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Apellido:
				</label>
				<input
					id="apellido"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Apellido del estudiante"
					name="apellido"
					onChange={handleChange}
					value={form.apellido}
				/>
			</div>
			<div>
				<label
					htmlFor="cedula:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Cédula:
				</label>
				<input
					id="cedula"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Cédula del estudiante"
					name="cedula"
					onChange={handleChange}
					value={form.cedula}
				/>
			</div>
			<div>
				<label
					htmlFor="fechaNacimiento:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Fecha de Nacimiento:
				</label>
				<input
					id="fechaNacimiento"
					type="date"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Fecha de Nacimiento"
					name="fechaNacimiento"
					onChange={handleChange}
					value={form.fechaNacimiento}
				/>
			</div>
			<div>
				<label
					htmlFor="ciudad:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Ciudad:
				</label>
				<input
					id="ciudad"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Cuidad"
					name="ciudad"
					onChange={handleChange}
					value={form.ciudad}
				/>
			</div>
			<div>
				<label
					htmlFor="direccion:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Dirección:
				</label>
				<input
					id="direccion"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Dirección"
					name="direccion"
					onChange={handleChange}
					value={form.direccion}
				/>
			</div>
			<div>
				<label
					htmlFor="telefono:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Telefono:
				</label>
				<input
					id="telefono"
					type="number"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Teléfono del propietario"
					name="telefono"
					onChange={handleChange}
					value={form.telefono}
				/>
			</div>
			<div>
				<label
					htmlFor="email:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Email:
				</label>
				<input
					id="email"
					type="email"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="email del propietario"
					name="email"
					onChange={handleChange}
					value={form.email}
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
					estudiante?._id ? "Actualizar estudiante" : "Registrar estudiante"
				}
			/>
		</form>
	);
};
