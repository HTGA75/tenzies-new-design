// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { useState } from "react"
import Card from "./Card"
import ReactConfetti from "react-confetti"

function App() {

  const [condConfetti, setCondConfetti] = useState(false)

  const handleConfetti = () => {
    setCondConfetti(prevState => !prevState)
  }

  return (
    <>
      {condConfetti && <ReactConfetti 
        style={{ zIndex: -1 }}
        width={window.innerWidth}
        height={window.innerHeight}
      />}
      <Card 
        handleConfetti = {handleConfetti}
      />
    </>
  )
}

export default App
