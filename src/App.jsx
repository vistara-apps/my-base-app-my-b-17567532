import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import RightPanel from './components/RightPanel'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <Feed />
        <RightPanel />
      </div>
    </div>
  )
}

export default App
