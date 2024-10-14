import { useState } from 'react';
import './App.css';

function App() {

  return (
    <div className='main-container'>
      <h1>Generative AI Web App</h1>
      <div className='form-container'>
        <div>
          <label>Enter Query: </label>
          <input type='text' className='query-input' placeholder='Enter the query'></input>
        </div>

      </div>
    </div>
  )
}

export default App
