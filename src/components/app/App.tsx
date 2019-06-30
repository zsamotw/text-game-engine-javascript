import React from 'react'
import './App.css'
import AppGamefield from '../app-gamefield/App-gamefield';

const App: React.FC=()=> {
    return (<div className='app'> <div className='title'>Game</div> <AppGamefield/> </div>)
}

export default App