import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import {Toaster} from 'react-hot-toast';
import ProtectedRoutes from './components/ProtectedRoutes';
         
function App() {
  return (
    <div >
      <Toaster position='top-center' reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' excat element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
          <Route path='/login' excat element={<Login/>} />
          <Route path='/register' excat element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
