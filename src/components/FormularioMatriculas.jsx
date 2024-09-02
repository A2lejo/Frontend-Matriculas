import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";

export const FormularioMatriculas = ({ matricula }) => {
    const navigate = useNavigate();

    const [alerta, setAlerta] = useState({});
    const { auth } = useContext(AuthContext);
    const [estudiantes, setEstudiantes] = useState([]);
    const [materias, setMaterias] = useState([]);

    const [form, setform] = useState({
        codigo: matricula?.codigo ?? "",
        descripcion: matricula?.descripcion ?? "",
        creditos: matricula?.creditos ?? "",
        estudiante: matricula?.estudiante ?? "",
        materia: matricula?.materia ?? ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (matricula?._id) {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/matricula/${matricula?._id}`,
                form,
                {
                    headers: {
                        method: "PUT",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            navigate("/dashboard/matriculas");
        } else {
            try {
                console.log(form)
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/matricula/registro`,
                    form,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setAlerta({
                    respuesta: "Matricula registrada con exito",
                    exito: true,
                });
                setTimeout(() => {
                    navigate("/dashboard/matriculas");
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

    useEffect(() => {
        const consultarEstudiantes = async () => {
            try {
                const respuesta = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/estudiantes`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setEstudiantes(respuesta.data);
            } catch (error) {
                setAlerta({ respuesta: error.response.data.res, exito: false });
            }
        };
        consultarEstudiantes();
    }, []);

    useEffect(() => {
        const consultarMaterias = async () => {
            try {
                const respuesta = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/materias`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log(respuesta.data)
                setMaterias(respuesta.data);
            } catch (error) {
                setAlerta({ respuesta: error.response.data.res, exito: false });
            }
        };
        consultarMaterias();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor="codigo"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Código:
                </label>
                <input
                    id="codigo"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    placeholder="Código de la matricula"
                    name="codigo"
                    onChange={handleChange}
                    value={form.codigo}
                />
            </div>
            <div>
                <label
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Descripción:
                </label>
                <input
                    id="descripcion"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    placeholder="Descripción de la matricula"
                    name="descripcion"
                    onChange={handleChange}
                    value={form.descripcion}
                />
            </div>
            <div>
                <label
                    htmlFor="creditos"
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
            <div>
                <label
                    htmlFor="estudiante"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Estudiante:
                </label>
                <select
                    id="estudiante"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    name="estudiante"
                    onChange={handleChange}
                    value={form.estudiante}
                >
                    <option value=""> Selecionar Estudiante </option>
                    {estudiantes.map((estudiante) => (
                        <option key={estudiante._id} value={estudiante._id}>
                            {estudiante.nombre + " " + estudiante.apellido}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label
                    htmlFor="materia"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Materias:
                </label>
                <select
                    id="materia"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    name="materia"
                    onChange={handleChange}
                    value={form.materia}
                >
                    <option value=""> Selecionar Materia </option>
                    {materias.map((materia) => (
                        <option key={materia._id} value={materia._id}>
                            {materia.nombre}
                        </option>
                    ))}
                </select>
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
                    matricula?._id ? "Actualizar matricula" : "Registrar matricula"
                }
            />
        </form>
    );
};