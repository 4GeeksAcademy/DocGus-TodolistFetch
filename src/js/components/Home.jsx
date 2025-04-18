import React, { useEffect, useState } from "react";

const Home = () => {
	const [lista, setLista] = useState([]);
	const [task, setTask] = useState("");

	const obtenerTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/DocGus");
			if (response.status === 404) {
				crearUsuario();
				return;
			}
			const data = await response.json();
			setLista(data.todos);
		} catch (error) {
			console.log(error);
		}
	};

	const crearUsuario = async () => {
		try {
			await fetch("https://playground.4geeks.com/todo/users/DocGus", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
		} catch (error) {
			console.log(error);

		}
	};

	const agregarTarea = async (e) => {
		e.preventDefault();
		if (task.trim() === "") {
			alert("Debe ingresar la tarea");
		} else {
			try {
				const response = await fetch("https://playground.4geeks.com/todo/todos/DocGus", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						label: task,
						is_done: false,
					}),
				});
				if (response.status === 201) {
					obtenerTareas();
					setTask("");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const eliminarTarea = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			if (response.status === 204) {
				obtenerTareas();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const eliminarUsuario = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/DocGus`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			if (response.status === 204) {
				crearUsuario();
				setLista([])
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Manejar tecla Enter
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			agregarTarea(e);
		}
	};

	useEffect(() => {
		obtenerTareas();
	}, []);

	// Tareas pendientes
	const tareasPendientes = lista.filter((t) => t.is_done === false).length;

	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">To do List</h1>
			<div className="mb-3">
				<input
					type="text"
					className="form-control"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Escribe una tarea y presiona Enter"
				/>
				<button className="btn btn-success mt-2" onClick={(e) => agregarTarea(e)}>
					Agregar Tarea
				</button>
				<button className="btn btn-danger mt-2 ms-3" onClick={() =>{
					const result = confirm("¿Realmente deseas eliminar todas las tareas?")
					if(result){
						eliminarUsuario()
					}
				}}>
					Eliminar todas las Tareas
				</button>

			</div>
			<ul className="list-group">
				{lista.map((tarea, index) => (
					<li className="list-group-item" key={index}>
						{tarea.label}
						<button className="btn btn-danger float-end icono-oculto" onClick={() => eliminarTarea(tarea.id)}>
							<i className="fa fa-trash"></i>
						</button>
					</li>
				))}
			</ul>
			<p className="mt-3">
				<strong>{tareasPendientes}</strong> tarea(s) pendiente(s)
			</p>
		</div>
	);
};

export default Home;
