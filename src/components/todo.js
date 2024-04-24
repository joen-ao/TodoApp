import { useState } from "react";
import Modal from "./modal";

export default function Todo({ item, onUpdate, onDelete, todos, setTodos }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setNewValue] = useState(item.title);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (newValue.trim().length < 3) {
      setIsEditModalOpen(true);
      return;
    }

    const updatedTodos = todos.map((todo) =>
      todo.id === item.id ? { ...todo, title: newValue } : todo
    );
    setTodos(updatedTodos);
    setIsEdit(false);
  }

  function handleChange(e) {
    const value = e.target.value;
    setNewValue(value);
  }

  function handleDelete() {
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    const filteredTodos = todos.filter((todo) => todo.id !== item.id);
    setTodos(filteredTodos);
    setIsDeleteModalOpen(false);
  }

  function handleCancelDelete() {
    setIsDeleteModalOpen(false);
  }

  function TodoElement() {
    return (
      <div className="todoInfo">
        <span className="todoTitle">{item.title}</span>
        <button className="button" onClick={() => setIsEdit(true)}>
          Editar
        </button>
        <button className="buttonDelete" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    );
  }

  return (
    <div className="todo">
      {isEdit ? (
        <form className="todoUpdateForm" onSubmit={handleSubmit}>
          <input
            type="text"
            className="todoInput"
            onChange={handleChange}
            value={newValue}
          />
          <button className="button" type="submit">
            Actualizar
          </button>
        </form>
      ) : (
        <TodoElement />
      )}

      <Modal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
      >
        <h2>Por favor ingresa un título válido (mínimo 3 caracteres).</h2>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} closeModal={handleCancelDelete}>
        <h2>¿Estás seguro de que quieres eliminar este todo?</h2>
        <div>
          <button className="buttonDelete" onClick={handleConfirmDelete}>
            Sí, eliminar
          </button>
          <button className="buttonModal" onClick={handleCancelDelete}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}
