import DataForm from './pages/DataForm';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
        <Route path="/" element={<DataForm/>} />
        <Route path="/:id" element={<DataForm/>} />
    </Routes>
  )
}

export default App
