import logo from './logo.svg';
import './App.css';
import myimg from "./myimg.png";
import { useKcMessage } from "keycloakify";

function App() {
  
  const { msg } = useKcMessage();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={myimg} alt="test_image" />
        {msg("emailLinkIdp1", "xxx", "yyy", "zzz")}
        {msg("impersonateTitleHtml","this should appear bold")}
      </header>
    </div>
  );
}

export default App;
