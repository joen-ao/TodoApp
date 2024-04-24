import { useState } from "react";
import Modal from "./modal"; // Asegúrate de tener un componente Modal disponible en tu proyecto

export default function Todo({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setNewValue] = useState(item.title);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault(); // anula el efecto de recargar la página cuando se envía el formulario

    // Validar que el título tenga al menos dos caracteres
    if (newValue.trim().length < 3) {
      setIsEditModalOpen(true);
      return;
    }

    onUpdate(item.id, newValue);
    setIsEdit(false);
  }

  function handleChange(e) {
    const value = e.target.value;
    setNewValue(value);
  }

  function handleDelete() {
    setIsDeleteModalOpen(true); // Abre el modal de confirmación
  }

  function handleConfirmDelete() {
    onDelete(item.id);
    setIsDeleteModalOpen(false); // Cierra el modal después de confirmar la eliminación
  }

  function handleCancelDelete() {
    setIsDeleteModalOpen(false); // Cierra el modal si el usuario cancela la eliminación
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
