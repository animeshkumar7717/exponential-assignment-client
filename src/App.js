import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; 
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

  console.log('BACKEND_URL', BACKEND_URL);
  console.log(' process.env.REACT_APP_BACKEND_URL',  process.env.REACT_APP_BACKEND_URL);
  
  useEffect(() => {
    if (!userId) {
      const newUserId = uuidv4();
      setUserId(newUserId);
      localStorage.setItem("userId", newUserId);
    }

    axios.get(`${BACKEND_URL}/click?userId=${userId}`)
      .then(({ data }) => {
        setCounter(data.counter);
        setPrizes(data.prizes);
      });
  }, [userId, BACKEND_URL]);

  const handleClick = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/click?userId=${userId}`);
    setCounter(data.counter);
    setPrizes(data.prizes);
  };

  return (
    <div className="container">
      <h1>Counter: {counter}</h1>
      <h2>Prizes: {prizes}</h2>
      <button className="click-button" onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
