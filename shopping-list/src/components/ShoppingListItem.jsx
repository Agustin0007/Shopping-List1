import { useState } from 'react'

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
            ✓
            Save
          </button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>
            ✕
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="item-content">
            🛒
            <span className="item-text">{item.name}</span>
            <span className="item-quantity">
              ×
              {item.quantity}
            </span>
          </div>
          <div className="item-actions">
            <button 
              className="action-button complete-button"
              onClick={() => onToggleComplete(item.id)}
            >
              ✓
            </button>
            <button 
              className="action-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              ✎
            </button>
            <button 
              className="action-button delete-button"
              onClick={() => onDelete(item.id)}
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  )
}