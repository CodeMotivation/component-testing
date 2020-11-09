
import './App.css';
import { Datatable } from './Datatable';
import json from './data.json';

function App() {
  return (
    <div className="App">
      <Datatable data={json.draft_orders}></Datatable>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
