import { Suspense, lazy } from 'react';
import { Routes,Route} from 'react-router-dom';
import Mainlayout from './layout/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));


function App() {
  return (
    
    <div>
      <Suspense fallback={<div className="min-h-screen bg-[#020205]" />}>
        <Routes>
          <Route element={<Mainlayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
    


  )
}

export default App
