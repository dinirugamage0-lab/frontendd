import React, { useState } from 'react';

function ItemList({ items, deleteItem, updateItem }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editQuantity, setEditQuantity] = useState(1);
  const [editDescription, setEditDescription] = useState('');

  const startEdit = (item) => {
    setEditId(item._id);
    setEditName(item.name);
    setEditCategory(item.category);
    setEditQuantity(item.quantity);
    setEditDescription(item.description);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditCategory('');
    setEditQuantity(1);
    setEditDescription('');
  };

  const saveEdit = (id) => {
    if (!editName.trim()) {
      alert('Name cannot be empty');
      return;
    }
    updateItem(id, { name: editName, category: editCategory, quantity: editQuantity, description: editDescription });
    setEditId(null);
    setEditName('');
    setEditCategory('');
    setEditQuantity(1);
    setEditDescription('');
  };

  if (items.length === 0) {
    return (
      <div className="item-list">
        <h2>Items</h2>
        <div className="no-items">No items found. Add one above!</div>
      </div>
    );
  }

  return (
    <div className="item-list">
      <h2>Items ({items.length})</h2>
      {items.map((item) => (
        <div key={item._id} className="item">
          {editId === item._id ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1 }}>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
              <input
                type="number"
                value={editQuantity}
                onChange={(e) => setEditQuantity(parseInt(e.target.value))}
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button className="btn btn-success" onClick={() => saveEdit(item._id)}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div className="item-info">
                <div className="item-name">{item.name}</div>
                {/* ✅ Display new fields */}
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                  <span style={{
                    background: '#e8f4f8',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    marginRight: '8px',
                    fontSize: '12px',
                    color: '#2980b9',
                    fontWeight: '600'
                  }}>
                    {item.category || 'No Category'}
                  </span>
                  <span style={{ marginRight: '8px' }}>Qty: <strong>{item.quantity || 1}</strong></span>
                </div>
                {item.description && (
                  <div style={{ fontSize: '13px', color: '#888', marginTop: '4px', fontStyle: 'italic' }}>
                    {item.description}
                  </div>
                )}
                <div className="item-date">
                  Added: {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
              <div className="item-actions">
                <button className="btn btn-warning" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemList;