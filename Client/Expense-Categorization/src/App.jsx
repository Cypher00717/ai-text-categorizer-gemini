import { useState } from 'react'
import axios from 'axios'
import './index.css';

function App() {
    const [result, setResult] = useState(null);
    const [input, setInput] = useState("");

    // Function to handle form submission
    // This function sends the input text to the server for categorization and updates the result state with the response
    async function handleSubmit() {
      const res = await axios.post('http://localhost:3000/api/categorize', {
        text: input
      });
      console.log(res.data);
      setResult(res.data);
    }

    return (
      <>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">AI Expense Categorization</h1>

        <textarea 
        className="w-full p-2 border"
        rows={3}
        value={input}
        onChange = {(e) => setInput(e.target.value)}
        placeholder='Enter your expense description here...' />

        <button 
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
        onClick = {handleSubmit}>
          Categorize
        </button>

        {result && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p><strong>Amount:</strong> ₹{result.amount}</p>
          <p><strong>Category:</strong> {result.category}</p>
          <p><strong>Summary:</strong> {result.summary}</p>
        </div>
       )}
      </div>
      </>
    )
     

}


export default App
