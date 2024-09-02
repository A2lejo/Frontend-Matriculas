import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";
import perfil from "@assets/iconos/perfil.png";

export const CardPerfil = () => {
	const { auth } = useContext(AuthContext);
	return (
		<div
			className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg"
		>
			<div>
				<img
					src={perfil}
					alt="img-client"
					className="m-auto border-black border-2 rounded-full"
					width={120}
					height={120}
				/>
			</div>
			<div className="self-start">
				<b>Nombre:</b>
				<p className="inline-block ml-3">{auth.nombre}</p>
			</div>
			<div className="self-start">
				<b>Apellido:</b>
				<p className="inline-block ml-3">{auth.apellido}</p>
			</div>
			<div className="self-start">
				<b>Email:</b>
				<p className="inline-block ml-3">{auth.email}</p>
			</div>
		</div>
	);
};
