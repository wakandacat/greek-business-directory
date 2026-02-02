import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Businesspage from './pages/Businesspage';
import Contact from './pages/Contact';
import './App.css'

function App() {


  return (
    <> 
       <Router>
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/business/:id" element={<Businesspage />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
      </Router>
    </>
  )
}

export default App
