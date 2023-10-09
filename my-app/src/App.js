import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [elements, setElements] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // Store the tasks in the browser 'localstorage'
  useEffect(() => {
    try {
      const storedElements = JSON.parse(localStorage.getItem('elements'));
      if (storedElements && Array.isArray(storedElements)) {
        setElements(storedElements);
      }
    } catch (error) {
      console.error('Error while parsing data from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('elements', JSON.stringify(elements));
    } catch (error) {
      console.error('Error while setting data in localStorage:', error);
    }
  }, [elements]);

  const InputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Store the checkbox state in the browser 'localstorage'
  useEffect(() => {
    const storedValue = localStorage.getItem('checkboxState');
    if (storedValue === 'true') {
      setIsChecked(true);
    } else if (storedValue === 'false') {
      setIsChecked(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkboxState', isChecked.toString());
  }, [isChecked]);

  const addElement = () => {
    if (inputValue.trim() !== '') {
      setElements([...elements, { task: inputValue, checked: false }]);
      setInputValue('');
    }
  };

  const CheckboxChange = (index) => {
    const updatedElements = [...elements];
    updatedElements[index].checked = !updatedElements[index].checked;
    setElements(updatedElements);
  };

  const deleteElement = (index) => {
    const updatedElements = [...elements];
    updatedElements.splice(index, 1);
    setElements(updatedElements);
  };

  // Code
  return (
    <div className='App'>
      <h1>My Chores</h1>
      <div>
        <ul className='List'>
          {elements.map((element, index) => (
            <li key={index} className='ListItem'>
              <div className='TaskName'>{element.task}</div>
              <input
                type="checkbox"
                checked={element.checked}
                onChange={() => CheckboxChange(index)}
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
          onChange={InputChange}
          className='newChoreInput'
        />
        <button onClick={addElement}>Add</button>
      </div>
      <h6>Tasks Remaining: {elements.filter((element) => !element.checked).length}</h6>
      </div>
  );
}

export default App;