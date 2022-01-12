import './App.css';
import Weather from './Weather';
function App() {
  return (
    <div className="App">
      <div className="container">
       <Weather defaultCity="Krakow"/>

        <a
          href="https://github.com/natkaulaP/weather-app-react"
          target="_blank"
          rel="noopener noreferrer"
          className="contact"
        >
          Open-source code by <span className="label">Urszula Paruch</span>
        </a>
      </div>
    </div>
  );
}

export default App;
