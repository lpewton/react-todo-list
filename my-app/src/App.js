import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [elements, setElements] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addElement = () => {
    if (inputValue.trim() !== '') {
      setElements([...elements, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>My Chores</h1>
      <ul>
        {elements.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter new chore"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={addElement}>Add Chore</button >
      </div>
    </div>
  );
}

export default App;
