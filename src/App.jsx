import { useEffect, useState, useNavigate } from 'react'
import axios from 'axios';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import Tugas3A from './pages/Tugas3A.jsx'
import Tugas3B from './pages/Tugas3B.jsx'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/prodi' element={<Tugas3A />} />
            <Route path='/mahasiswa/:npm' element={<Tugas3B />} />
          </Routes>
        </BrowserRouter>
      </div>

      <br /><hr />
      <ul className="read-the-docs references">
        References:
        <li><a href='https://stackoverflow.com/questions/51576155/pass-a-variable-reference-in-react'>Trick to change default set behaviour</a></li>
        <li><a href='https://react.dev/learn/thinking-in-react'>Input and OnChange</a></li>
        <li><a href='https://stackoverflow.com/questions/54002792/in-general-is-it-better-to-use-one-or-many-useeffect-hooks-in-a-single-component'>Multiple useEffect</a></li>
        <li><a href='https://stackoverflow.com/questions/40803828/how-can-i-map-through-an-object-in-reactjs'>Mapping Objects</a></li>
        <li><a href='https://stackoverflow.com/questions/37571418/reactnative-how-to-center-text'>React Styling</a></li>
        <li><a href='https://ui.dev/react-router-url-parameters'>Route Parameters</a></li>
        <li><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find'>Array Find</a></li>
        <li><a href='https://css-tricks.com/run-useeffect-only-once/'>Run useEffect Just Once</a></li>
        <li><a href=''>...</a></li>
      </ul>
    </>
  )
}

export default App
