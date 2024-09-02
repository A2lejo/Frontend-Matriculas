import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import { Navigate } from "react-router-dom";
import libro from "@assets/iconos/iconoDashboard.png";
import perfil from "@assets/iconos/perfil.png";

const Dashboard = () => {
	const location = useLocation();
	const urlActual = location.pathname;

	const { auth } = useContext(AuthContext);
	const { nombre } = auth;


	return (
		<div className="md:flex md:min-h-screen">
			<div className="md:w-1/5 bg-zinc-900 px-5 py-4">
				<h2 className="text-4xl font-serif text-center text-slate-200">
					Matriculas
				</h2>

				<img
					src={libro}
					alt="img-client"
					className="m-auto mt-5 p-1 border-2 border-slate-500 rounded-full"
					width={120}
					height={120}
				/>
				<p className="text-slate-400 text-center my-4 text-sm">
					{" "}
					<span className="bg-green-600 w-3 h-3 inline-block rounded-full"></span>{" "}
					Bienvenido - {nombre}
					<br />
				</p>

				<hr className="mt-5 border-slate-500" />

				<ul className="mt-5">
					<li className="text-center">
						<Link
							to="/dashboard"
							className={`${urlActual === "/dashboard"
									? "text-slate-200 bg-gray-900 rounded-md text-center scale-105"
									: "text-slate-600"
								} px-3 py-2 text-xl block mt-2 hover:bg-gray-900`}
						>
							Perfil
						</Link>
					</li>

					<li className="text-center">
						<Link
							to="/dashboard/estudiantes"
							className={`${urlActual === "/dashboard/estudiantes"
									? "text-slate-200 bg-gray-900 rounded-md text-center scale-105"
									: "text-slate-600"
								} px-3 py-2 text-xl block mt-2 hover:bg-gray-900`}
						>
							Estudiantes
						</Link>
					</li>

					<li className="text-center">
						<Link
							to="/dashboard/materias"
							className={`${urlActual === "/dashboard/materias"
									? "text-slate-100 bg-gray-900 rounded-md text-center scale-105"
									: "text-slate-600"
								} px-3 py-2 text-xl block mt-2 hover:bg-gray-900`}
						>
							Materias
						</Link>
					</li>

					<li className="text-center">
						<Link
							to="/dashboard/matriculas"
							className={`${urlActual === "/dashboard/matriculas"
									? "text-slate-100 bg-gray-900 rounded-md text-center scale-105"
									: "text-slate-600"
								} px-3 py-2 text-xl block mt-2 hover:bg-gray-900`}
						>
							Matriculas
						</Link>
					</li>


				</ul>
			</div>

			<div className="flex-1 flex flex-col justify-between h-screen bg-gray-100">
				<div className="bg-zinc-900 py-2 flex md:justify-end items-center gap-5 justify-center">
					<div className="text-md font-semibold text-slate-100">
						Usuario - {nombre}
					</div>
					<div>
						<img
							src={perfil}
							alt="img-client"
							className="border-2 border-green-300 rounded-full"
							width={50}
							height={50}
						/>
					</div>
					<div>
						<Link
							to="/"
							className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg"
							onClick={() => localStorage.removeItem("token")}
						>
							Salir
						</Link>
					</div>
				</div>
				<div className="overflow-y-scroll p-8">
					{auth ? <Outlet /> : <Navigate to="/login" />}
				</div>
				<div className="bg-zinc-900 h-12">
					<p className="text-center  text-slate-100 leading-[2.9rem] underline">
						Todos los derechos reservados
					</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
