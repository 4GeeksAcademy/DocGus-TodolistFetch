import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [lista, setLista] = useState([])
	const [task, setTask] = useState("")

	const obtenerTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/DocGus")
			console.log(response)
			if (response.status == 404) {
				crearUsuario()
				return
			}
			const data = await response.json()
			console.log(data.todos)
			setLista(data.todos)
		} catch (error) {
			console.log(error)
		}
	}
	//funcion fetch
	const crearUsuario = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/DocGus", {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			})
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	const agregarTarea = async (e) => {
		e.preventDefault()
		if (task == "") {
			alert("Debe ingresar la tarea")
		} else {
			try {
				const response = await fetch("https://playground.4geeks.com/todo/todos/DocGus", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"label": task,
						"is_done": false
					})
				})
				console.log(response)
				if (response.status == 201) {
					obtenerTareas()
					setTask("")
				}
			} catch (error) {
				console.log(error)

			}

		}

	}

	const eliminarTarea = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			})
			console.log(response)
			if (response.status == 204) {
				obtenerTareas()
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		obtenerTareas()
	}, [])  //se ejecuta una sola ves ya que los corchetes estan vacios y no muestran variable

	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">To do List</h1>
			<div className="mb-3">
				<input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} />
				<button className="btn btn-success" onClick={(e) => agregarTarea(e)}>Agregar Tarea</button>
			</div>
			<ul className="list-group">
				{lista.map((tarea, index) => (
					<li className="list-group-item" key={index}>

						{tarea.label}
						<button className="btn btn-danger float-end icono-oculto" onClick={() => eliminarTarea(tarea.id)}><i className="fa fa-trash"></i></button>
					</li>
				))}

			</ul>
		</div>
	);
};

export default Home;