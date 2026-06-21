import React from 'react'
import { Routes,Route} from 'react-router-dom';
import Mainlayout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';



function App() {
  return (
    
    <div>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
         
        </Route>
      </Routes>  
    </div>
    


  )
}

export default App
