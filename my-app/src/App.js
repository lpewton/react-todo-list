import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>My Chores</h1>
      <ul>
        <li>Do the laundry</li>
        <li>Fetch tomatoes</li>
        <li>Buy new sheets</li>
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter new chore"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button>Add Chore</button>
      </div>
    </div>
  );
}

export default App;
