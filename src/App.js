import "./index.css";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdate(id) {
    setItems((i) =>
      i.map((e) => (e.id === id ? { ...e, packed: !e.packed } : e))
    );
  }

  function handleClearAll() {
    const confirmed = window.confirm(
      "Are you sure you want to delete everything?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app-container">
      <Header />
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onClear={handleClearAll}
      />
      <Stats items={items} />
    </div>
  );
}

function Header() {
  return <h1 className="heading">My Travel List ✈</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, value, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
    setValue(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <p>What do you need for your travel 😎? </p>
      <select value={value} onChange={(e) => setValue(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add Item</button>
    </form>
  );
}
function List({ items, onDelete, onUpdate, onClear }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div>
      <ul>
        {sortedItems.map((item) => (
          <Item
            items={item}
            key={item.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
      <div className="list">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={onClear}>Clear all</button>
      </div>
    </div>
  );
}

function Item({ items, onDelete, onUpdate }) {
  return (
    <div
      className="list"
      style={items.packed ? { textDecoration: "line-through" } : {}}
    >
      <li>
        <input
          type="checkbox"
          value={items.packed}
          onChange={() => onUpdate(items.id)}
        />
        <span>
          {items.value} {items.description}{" "}
        </span>
        <button onClick={() => onDelete(items.id)}>❌</button>
      </li>
    </div>
  );
}
function Stats({ items }) {
  const allItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((packedItems / allItems) * 100);

  if (!allItems) {
    return <p className="stats">You are yet to pack any items😒</p>;
  }
  if(allItems === packedItems) {
    return <p className="stats">Well done!! You have packed all your Items👌</p>
  }

  return (
    <div className="stats">
      <footer>
        You have {allItems} number of items on your list,you have packed{" "}
        {packedItems} items ({percentagePacked}%)
      </footer>
    </div>
  );
}

export default App;
