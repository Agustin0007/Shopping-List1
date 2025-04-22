import { useState } from 'react'
import { FaCheck, FaTimes, FaShoppingCart, FaPen, FaTrash } from 'react-icons/fa'

export default function ShoppingListItem({ item, onDelete, onEdit, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(item.name)
  const [editQuantity, setEditQuantity] = useState(item.quantity)

  const handleSave = () => {
    if (editValue.trim() === '' || editQuantity < 1) return
    
    onEdit(item.id, {
      ...item,
      name: editValue.trim(),
      quantity: editQuantity
    })
    setIsEditing(false)
  }

  return (
    <div className={`list-item ${item.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <input
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(Number(e.target.value))}
            min="1"
          />
          <button className="save-button" onClick={handleSave}>
            <FaCheck />
            Save
          </button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            <FaTimes />
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="item-content">
            <FaShoppingCart className="item-icon" />
            <span className="item-text">{item.name}</span>
            <span className="item-quantity">
              <FaTimes />
              {item.quantity}
            </span>
          </div>
          <div className="item-actions">
            <button 
              className="action-button complete-button"
              onClick={() => onToggleComplete(item.id)}
            >
              <FaCheck />
            </button>
            <button 
              className="action-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              <FaPen />
            </button>
            <button 
              className="action-button delete-button"
              onClick={() => onDelete(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  )
}