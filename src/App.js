import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Layout from "./components/Layout";
import axios from "axios";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  async function onFormSubmit(url) {
    setFormSubmitted(true);
    setLoading(true);
    try {
      const result = await axios.get(`${process.env.REACT_APP_SERVER}`, {
        params: {
          url,
        },
      });
      setLoading(false);
      setData(result.data);
      console.log(result);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  return (
    <div className="container">
      {formSubmitted ? (
        loading ? (
          error ? (
            <h1>Error! Please try again...</h1>
          ) : (
            <h1>Loading...</h1>
          )
        ) : (
          <Layout data={data}/>
        )
      ) : (
        <Form onFormSubmit={onFormSubmit} />
      )}
    </div>
  );
}

export default App;
