import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './core/header/header';
import About from './pages/about/about';
import Main from './pages/main/main';
import Rules from './pages/rules/rules';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" exact="true" element={<Main />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
