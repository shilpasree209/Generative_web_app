import { useState } from 'react';
import './App.css';

function App() {

  return (
    <div className='main-container'>
      <h1>Generative AI Web App</h1>
      <div className='form-container'>
        <div>
          <label>Enter Query: </label>
          <input type='text' 
            className='query-input' 
            placeholder='Enter Query'>
            
          </input>
        </div>
        <div>
          <label>No of Questions: </label>
          <input type='range' 
                  min={1} 
                  max={10} 
                  className='question-input' >
          </input>
        </div>
        <div>
          <label>Difficulty: </label>
          <select className='difficult-input'>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
          {/* <input type='text' 
                className='query-input' 
                placeholder='Enter Query'>
                
          </input> */}
        </div>

      </div>
    </div>
  )
}

export default App
