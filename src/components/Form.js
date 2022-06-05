import "../styles/Form.css";
import { useState } from "react";

function Form({ onFormSubmit }) {
  const [url, setUrl] = useState("");

  function handleUrlSubmit(e) {
    e.preventDefault();
    onFormSubmit(url);
  }

  return (
    <div className="url-form">
      <input
        type="text"
        placeholder="Enter complete url e.g.('https://example.com')"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleUrlSubmit}>Submit</button>
    </div>
  );
}

export default Form;
