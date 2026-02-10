import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import './App.css';


function App() { 

  return (
      <BrowserRouter>
        <Routes>
          <Route 
            path ="/"
            element= {
              <ProtectedRoute>
                <MainLayout>
                  <Home/>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path = "/login" element = {<Login/>} />
          <Route path="/register" element ={<Register/>} />
        </Routes>
        
      </BrowserRouter>
  )
}

export default App
