import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setItems);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const item = { id: editingId || 0, name, price: parseFloat(price) };

    const request = editingId
      ? fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        })
      : fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

    request.then(refresh);
    setName("");
    setPrice("");
    setEditingId(null);
  }

  function startEdit(item) {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
  }

  // DELETE
  function handleDelete(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(refresh);
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Items</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          step="0.01"
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — ${item.price}
            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
