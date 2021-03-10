import logo from './logo.svg';
import './App.css';
import myimg from "./myimg.png";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={myimg} alt="test_image" />
      </header>
    </div>
  );
}

export default App;
