import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [lista, setLista] = useState([])
	const [task, setTask] = useState("")

	const obtenerTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/DocGus")
			console.log(response)
			const data = await response.json()
			console.log(data.todos)
			setLista(data.todos)
		} catch (error) {
			console.log(error)
		}
	}



	const agregarTarea = (e) => {
		e.preventDefault()
		if (task == "") {
			alert("Debe ingresar la tarea")
		} else {
			setLista([...lista, task])
			setTask("")
		}

	}

	const eliminarTarea = (index) => {
		let aux = lista.filter((item, id) => {
			if (index != id) {
				return item
			}
		})
		setLista(aux)
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
						<button className="btn btn-danger float-end icono-oculto" onClick={() => eliminarTarea(index)}><i className="fa fa-trash"></i></button>
					</li>
				))}

			</ul>
		</div>
	);
};

export default Home;