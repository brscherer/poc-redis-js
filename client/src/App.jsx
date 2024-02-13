// src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [command, setCommand] = useState('SET');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');

  const setValueHandler = async () => {
    try {
      await fetch('http://localhost:3000/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });
      setResponse('OK');
    } catch (error) {
      console.error('Error setting value:', error);
      setResponse('Error setting value.');
    }
  };

  const getValueHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/get/${key}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      setResponse(`Value: ${data}`);
    } catch (error) {
      console.error('Error getting value:', error);
      setResponse('Error getting value.');
    }
  };

  const onSubmit = () => {
    setResponse("")
    if (command === "GET") return getValueHandler()
    return setValueHandler()
  }

  useEffect(() => {
    setResponse("")
  }, [command])

  return (
    <div>
      <h1>Redis Client</h1>
      <div style={{ display: "flex", gap: 10}}>
        <select value={command} onChange={(e) => setCommand(e.target.value)}>
          <option value="GET">GET</option>
          <option value="SET">SET</option>
        </select>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        {
          command === "SET" && (
            <input
              type="text"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )
        }
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div>{response}</div>
    </div>
  );
}

export default App;
