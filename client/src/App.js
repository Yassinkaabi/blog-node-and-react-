import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Blogs from './components/blog/Blogs';
import Home from './pages/Home'
import Create from './components/blog/Create';
import Update from './components/blog/Update';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog/create' element={<Create />} />
          <Route path='/posts/update/:id' element={<Update />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
