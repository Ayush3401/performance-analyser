import {useState} from 'react'
import './App.css';
import Form from './components/Form';
import Layout from './components/Layout';

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  return (
    <div>
      { formSubmitted ?  <Layout/> : <Form onFormSubmit={setFormSubmitted} /> }
    </div>
  );
}

export default App;
