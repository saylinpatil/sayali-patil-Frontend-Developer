import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header'
import Rockets from './components/Rockets/Rockets';

function App() {
  return (  
    <div className="App">
       <Header />
       <Rockets /> 
    </div> 
  );
}

export default App;
