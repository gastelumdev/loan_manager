import './App.css'
import { Route, Routes } from 'react-router-dom';
import Admin from './features/admin/Admin';
import Application from './features/application/Application';
import Error_404 from './components/Error_404';
import Home from './features/home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/:id" element={<Application />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<Error_404 />} />
      </Routes>
    </>
  )
}

export default App
