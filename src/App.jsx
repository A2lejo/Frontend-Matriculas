import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@layouts/Auth";
import { LandinPage } from "@pages/LandinPage";
import { Register } from "@pages/auth/Register";
import Login from "@pages/auth/Login";
import Perfil from "@pages/Perfil";
import { NotFound } from "@pages/NotFound";
import Dashboard from "@layouts/Dashboard";

import Estudiantes from "@pages/Estudiantes";
import Materias from "@pages/Materias";
import Matriculas from "@pages/Matriculas";

import ActualizarEstudiantes from "@pages/ActualizarEstudiantes";
import ActualizarMaterias from "@pages/ActualizarMaterias";
import ActualizarMatriculas from "./pages/ActualizarMatriculas";

import RegistarEstudiante from "./pages/RegistrarEstudiante";
import RegistrarMateria from "./pages/RegistrarMateria";
import RegistrarMatricula from "./pages/RegistrarMatricula";

import VisualizarEstudiantes from "@pages/VisualizarEstudiantes";
import VisualizarMaterias from "@pages/VisualizarMaterias";
import VisualizarMatriculas from "@pages/VisualizarMatriculas";

import { AuthProvider } from "@context/AuthProvider";
import { PrivateRoute } from "@routes/PrivateRoutes";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route index element={<LandinPage />} />

						<Route path="/" element={<Auth />}>
							<Route index path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
							<Route path="*" element={<NotFound />} />
						</Route>

						<Route
							path="dashboard/*"
							element={
								<PrivateRoute>
									<Routes>
										<Route element={<Dashboard />}>
											<Route
												index
												element={<Perfil />}
											/>
											<Route
												path="estudiantes"
												element={<Estudiantes />}
											/>
											<Route
												path="estudiantes/registrar"
												element={<RegistarEstudiante />}
											/>
											<Route
												path="estudiantes/visualizar/:cedula"
												element={<VisualizarEstudiantes />}
											/>
											<Route
												path="estudiantes/actualizar/:id"
												element={<ActualizarEstudiantes />}
											/>
											<Route
												path="materias"
												element={<Materias />}
											/>
											<Route
												path="materias/registrar"
												element={<RegistrarMateria />}
											/>
											<Route
												path="materias/visualizar/:codigo"
												element={<VisualizarMaterias />}
											/>
											<Route
												path="materias/actualizar/:id"
												element={<ActualizarMaterias />}
											/>
											<Route
												path="matriculas"
												element={<Matriculas />}
											/>
											<Route
												path="matriculas/registrar"
												element={<RegistrarMatricula />}
											/>
											<Route
												path="matriculas/visualizar/:id"
												element={<VisualizarMatriculas />}
											/>
											<Route
												path="matriculas/acutalizar/:id"
												element={<ActualizarMatriculas />}
											/>
										</Route>
									</Routes>
								</PrivateRoute>
							}
						/>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
