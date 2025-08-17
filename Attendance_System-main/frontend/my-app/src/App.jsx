import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import { useState } from 'react';
import PrivateRoute from './pages/PrivateRoute';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}/>
        <Route path="/scan" element={ 
          <PrivateRoute isAuthenticated={isLoggedIn}>
              <Scanner setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
