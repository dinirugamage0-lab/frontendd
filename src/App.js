import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';

// API Base URL - Change this to your deployed backend URL after deployment
const API_URL = 'http://localhost:3000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all items from the backend
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setItems(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items. Make sure the backend is running!');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add a new item
  const addItem = async (newItem) => {
    try {
      const res = await axios.post(API_URL, newItem);
      setItems([res.data, ...items]);
      setError(null);
    } catch (err) {
      setError('Failed to add item.');
      console.error('Error adding item:', err);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter((item) => item._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete item.');
      console.error('Error deleting item:', err);
    }
  };

  // Update an item
  const updateItem = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setItems(items.map((item) => (item._id === id ? res.data : item)));
      setError(null);
    } catch (err) {
      setError('Failed to update item.');
      console.error('Error updating item:', err);
    }
  };

  return (
    <div className="container">
      <h1>📦 Item Manager</h1>

      {error && <div className="error">{error}</div>}

      <AddItem addItem={addItem} />

      {loading ? (
        <div className="loading">Loading items...</div>
      ) : (
        <ItemList items={items} deleteItem={deleteItem} updateItem={updateItem} />
      )}
    </div>
  );
}

export default App;
