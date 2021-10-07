import logo from "./logo.svg";
import "./App.css";
import myimg from "./myimg.png";

export function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={myimg} alt="test_image" />
        <p style={{ "fontFamily": '"Work Sans"' }}>hello world</p>
      </header>
    </div>
  );
}

