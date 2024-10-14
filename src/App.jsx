import { useState } from 'react';
import OpenAI from "openai";
import './App.css';


function App() {

  const [query, setQuery] = useState('');
  const [noofquestions, setnoofQuestions] = useState(4);
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);


  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  }

  const handleQuestions = (e) => {
    setnoofQuestions(e.target.value);
  }

  const handleDiffulty = (e) => {
    setDifficulty(e.target.value);
  }

  const createQuestionsWithOpenAIApi = async () => {
    setIsLoading(true);
    const promptMessage = `Generate ${noofquestions} ${difficulty} questions with 4 options in an array format on the topic: ${query}. 
    
    Each question should be structured in JSON format with the following keys:
            - 'question': The text of the question.
            - 'options': An array of 4 options, each option as a string.
            - 'correct_option': The correct option (must match one of the options).
            - 'difficulty': The difficulty level of the question ('easy', 'medium', or 'hard').
            Output the result as an array of JSON objects with the structure described. Dont put anything else. Only valid Array.
            Example format:
            [
            {
                "question": "What is the capital of France?",
                "options": ["Paris", "London", "Berlin", "Rome"],
                "correct_option": "Paris",
                "difficulty": "easy"
            }
            ]
    `;
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: promptMessage,
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 300, 
      });
      setIsLoading(false);
      const response = chatCompletion?.choices[0]?.message?.content;
      const generatedQuestions = JSON.parse(response);
      console.log(generatedQuestions);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setQuestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuestionsWithOpenAIApi();
  }

  return (
    <div className='main-container'>
      <h1>Generative AI Web App</h1>
      <div className='form-container'>
        <div>
          <label>Enter Query: </label>
          <input type='text' 
            className='query-input' 
            placeholder='Enter Query'
            onChange={handleQueryChange}>
            
          </input>
        </div>
        <div>
          <label>No of Questions: </label>
          <input type='range' 
                  min={1} 
                  max={10} 
                  className='question-input'
                  value={noofquestions}  
                  onChange={handleQuestions}>
          </input>
        </div>
        <div>
          <label>Difficulty: </label>
          <select className='difficult-input' onChange={handleDiffulty}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <button className='submit-button' onClick={handleSubmit} disabled={isLoading}>Generate Questions
        
        {isLoading ? "Generating..." : "Generate Questions"}
        
        </button>

      </div>
    </div>
  )
}

export default App
