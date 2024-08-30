import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TablaRegistros({ registros }) {
    const [datos, setDatos] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const navigate = useNavigate();


    const handleGetData = async () => {
        try {
            const respuesta = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/${registros}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setDatos(respuesta.data);
            delete respuesta.data[0]._id;
            delete respuesta.data[0].fechaNacimiento;
            delete respuesta.data[0].direccion;
            delete respuesta.data[0].telefono;
            delete respuesta.data[0].materias;
            delete respuesta.data[0].estudiantes;
            delete respuesta.data[0].descripcion;
            setColumnas(Object.keys(respuesta.data[0]));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetData();

    }, []);

    const handleDelete = async () => {
        try {
            if (
                confirm(
                    "Vas a realizar la salida de un estudiante, ¿Estás seguro de realizar esta acción?"
                )
            ) {
                await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}/${registros}/${id}`,
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
                listarEstudiantes();
            }
        } catch (error) { }
    };

    return (
        <table className="w-full mt-5 table-auto shadow-lg  bg-white">
            <thead className="bg-gray-800 text-slate-400">
                <tr>
                    <th className="px-4 py-2 rounded-tl-lg">N°</th>
                    {columnas.map((columna, index) => (
                        <th
                            key={index}
                            className={`px-4 py-2  ${index === columnas.length - 1
                                }`}
                        >
                            {columna}
                        </th>
                    ))}
                    <th className="px-4 py-2 rounded-tr-lg">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {datos.map((dato, index) => (
                    <tr
                        key={index}
                        className={index === datos.length - 1 ? "rounded-b-lg" : ""}
                    >
                        <td className="px-4 py-2">{index + 1}</td>
                        {columnas.map((columna, colIndex) => (
                            <td key={colIndex} className="px-4 py-2">
                                {dato[columna]}
                            </td>
                        ))}
                        <td className="py-2 text-center">
                            <MdInfo
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                onClick={() =>
                                    navigate(
                                        `/dashboard/${registros}/visualizar/${dato.cedula || dato.codigo}`
                                    )
                                }
                            />

                            <>
                                <MdNoteAdd
                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/${registros}/actualizar/${dato.cedula || dato.codigo}`
                                        )
                                    }
                                />

                                <MdDeleteForever
                                    className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                    onClick={() =>
                                        handleDelete(datos.cedula || datos.codigo)
                                    }
                                />
                            </>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}