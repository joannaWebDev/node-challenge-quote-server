import './App.css';
import React, {useState, useEffect} from "react";

function App() {
  const [quotesData, setQuotesData] = useState([]);

  useEffect(() => {
    fetch ('http://localhost:3000/quotes/random')//va directamente al servidor que hemos creado
    .then((response) => response.json())
    .then((data) => {
      setQuotesData(data);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {quotesData.quote}
        </p>
        <h5>{quotesData.author}</h5>
      </header>
    </div>
  )
}

export default App;
