import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import "./index.css"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<Login />} />
        <Route path ="product" element= {<Product />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
}

export default App;
