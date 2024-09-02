import logoDarkMode from "@assets/dark.png"
import logoFacebook from "@assets/facebook.png"
import logoGithub from "@assets/github.png"
import logoLinkedind from "@assets/linkedin.png"
import { useState } from "react"
import { Link } from "react-router-dom"

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" : ""}>
            <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800 min-h-screen">
                <section>
                    <nav className="p-10 mb-12 flex justify-between">
                        <h1 className="text-2xl font-bold dark:text-white">
                            Registro de matriculas
                        </h1>
                        <ul className="flex items-center">
                            <li>
                                <img
                                    onClick={() => setdarkMode(!darkMode)}
                                    className="cursor-pointer"
                                    src={logoDarkMode}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                />
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white"
                                    href="#"
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="text-center">
                        <h2 className="text-5xl py-1 text-teal-600 font-medium md:text-6xl">
                            Matriculas
                        </h2>
                        <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
                            Registra tus matriculas
                        </h3>
                        <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white">
                            Esta aplicación te permite registrar las matriculas, los estudiante y las materias que decees 
                            y llevar un control de las mismas de manera sencilla y rapida, puedes revisar todos los registros
                            realizados.
                        </p>
                    </div>

                    <div className="text-5xl flex justify-center gap-16 py-3">
                        <img
                            src={logoFacebook}
                            alt="logo-redes"
                            width={50}
                            height={50}
                            className={
                                "dark:border-2 border-teal-300 rounded-full"
                            }
                        />

                        <img
                            src={logoGithub}
                            alt="logo-redes"
                            width={50}
                            height={50}
                            className={
                                "dark:border-2 border-teal-300 rounded-full"
                            }
                        />

                        <img
                            src={logoLinkedind}
                            alt="logo-redes"
                            width={50}
                            height={50}
                            className={
                                "dark:border-2 border-teal-300 rounded-full"
                            }
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}
