import React, { useState, useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Retrieve the list of elements from localStorage when the component mounts
    try {
      const storedElements = JSON.parse(localStorage.getItem('elements'));
      if (storedElements && Array.isArray(storedElements)) {
        setElements(storedElements);
        console.log('There are elements')
        console.log(localStorage)
      } else {
        console.log('No valid data found in localStorage.');
      }
    } catch (error) {
      console.error('Error while parsing data from localStorage:', error);
    }
  }, []); // The empty dependency array ensures this runs only once on component mount

  useEffect(() => {
    // Update localStorage whenever the 'elements' state changes
    try {
      localStorage.setItem('elements', JSON.stringify(elements));
    } catch (error) {
      console.error('Error while setting data in localStorage:', error);
    }
  }, [elements]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddElement = () => {
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
          <li key={index}>
            {element}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter text here"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddElement}>Add</button>
      </div>
    </div>
  );
}

export default App;