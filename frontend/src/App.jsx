import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPopup from './components/LoginPopup';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPopup />} />
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/register" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
