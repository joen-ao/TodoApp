import { useState, useEffect } from "react";
import Todo from "./todo";
import "./todoApp.css";
import Modal from "./modal";

export default function TodoApp() {
  const [title, setTitle] = useState(""); // Se declara un estado title que representa el valor del campo de entrada del título de la tarea.
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    return storedTodos || [];
  }); // Se declara un estado todos que representa la lista de tareas (Todos).
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleChange(event) {
    // Actualiza el estado title cuando el usuario escribe en el campo de entrada.
    const value = event.target.value;
    setTitle(value);
  }

  function handleSubmit(e) {
    // Maneja el envío del formulario para agregar una nueva tarea a la lista.
    e.preventDefault();

    // Validar que el título tenga al menos dos caracteres
    if (title.trim().length < 3) {
      setIsModalOpen(true);
      return;
    }

    const newTodo = {
      // creando objeto de todo
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      completed: false,
    };

    const temp = [...todos]; // copia el array todos
    temp.unshift(newTodo); // unshift agrega un elemento al inicio de nuestro array

    setTodos(temp);
    setTitle("");
  }

  function handleUpdate(id, value) {
    // Actualiza el título de una tarea existente en la lista.
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos(temp);
  }

  function handleDelete(id) {
    const temp = todos.filter((item) => item.id !== id);
    setTodos(temp);
  }

  return (
    <div>
      <div className="todoTitleApp">Todo App</div>
      <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="todoInput"
            value={title}
            placeholder="ej: Botar la basura ..."
          />
          <input
            onClick={handleSubmit}
            type="submit"
            value="Crear todo"
            className="buttonCreate"
          />
        </form>

        <div className="todosContainer">
          {todos.map((item) => (
            <Todo
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              todos={todos} // Pasar todos como prop al componente Todo
              setTodos={setTodos} // Pasar la función setTodos como prop al componente Todo
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <h2>Por favor ingresa un título válido (mínimo 3 caracteres).</h2>
      </Modal>
    </div>
  );
}
