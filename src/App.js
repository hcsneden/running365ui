import logo from './logo.svg';
import './App.css';
import { History } from './components/History';
import { Header } from './components/Header';
import { RecordRun } from './components/RecordRun';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <History></History>
    </div>
  );
}

export default App;
