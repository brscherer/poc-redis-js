import { useEffect, useState } from 'react';

function App() {
  const [command, setCommand] = useState('SET');
  const [hash, setHash] = useState('');
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

  const appendValueHandler = async () => {
    try {
      await fetch(`http://localhost:3000/append/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });
      setResponse('OK');
    } catch (error) {
      console.error('Error appending value:', error);
      setResponse('Error appending value.');
    }
  };

  const deleteValueHandler = async () => {
    try {
      await fetch(`http://localhost:3000/delete/${key}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse('OK');
    } catch (error) {
      console.error('Error deleting value:', error);
      setResponse('Error deleting value.');
    }
  };

  const hSetValueHandler = async () => {
    try {
      await fetch('http://localhost:3000/hset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash, key, value }),
      });
      setResponse('OK');
    } catch (error) {
      console.error('Error setting value on hash:', error);
      setResponse('Error setting value on hash.');
    }
  };

  const hGetValueHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/hget/${hash}/${key}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      setResponse(`Value: ${data}`);
    } catch (error) {
      console.error('Error getting hash value:', error);
      setResponse('Error getting hash value.');
    }
  };

  const onSubmit = () => {
    setResponse("")
    if (command === "GET") return getValueHandler()
    if (command === "APPEND") return appendValueHandler()
    if (command === "DELETE") return deleteValueHandler()
    if (command === "HSET") return hSetValueHandler()
    if (command === "HGET") return hGetValueHandler()
    return setValueHandler()
  }

  const shouldShowValueField = ["SET", "APPEND", "HSET"].includes(command)
  const shouldShowHashField = ["HSET", "HGET"].includes(command)

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
          <option value="APPEND">APPEND</option>
          <option value="DELETE">DELETE</option>
          <option value="HGET">HGET</option>
          <option value="HSET">HSET</option>
        </select>
        {
          shouldShowHashField && (
            <input
              type="text"
              placeholder="Hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
            />
          )
        }
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        {
          shouldShowValueField && (
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
