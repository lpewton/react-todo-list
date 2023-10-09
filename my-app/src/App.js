import React, { useState, useEffect } from 'react';
import './App.css';

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

  const addElement = () => {
    if (inputValue.trim() !== '') {
      setElements([...elements, inputValue]);
      setInputValue('');
    }
  };

  const deleteElement = (index) => {
    const updatedElements = [...elements];
    updatedElements.splice(index, 1);
    setElements(updatedElements);
  };

  return (
    <div className='App'>
      <h1 className='App-header'>My Chores</h1>
      <div>
      <ul className='List'>
        {elements.map((element, index) => (
          <li key={index} className='ListItem'>
            <div className='TaskName'>
            {element}
        </div>
        <input
          type="checkbox"
        />
            <button onClick={() => deleteElement(index)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
      <div className='NewChore'>
        <input
          type="text"
          placeholder="Enter new chore"
          value={inputValue}
          onChange={handleInputChange}
          className='newChoreInput'
        />
        <button onClick={addElement}>Add</button>
      </div>
    </div>
  );
}

export default App;