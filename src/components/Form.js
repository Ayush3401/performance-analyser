
import '../styles/Form.css';

function Form({onFormSubmit}) {
  
  function handleUrlSubmit(e){
    e.preventDefault();
    onFormSubmit(true)
  }

  return (
    <div className='url-form'>
      <input type="text" placeholder="Enter complete url e.g.('https://example.com')" />
      <button onClick={handleUrlSubmit}>Submit</button>
    </div>
  );
}

export default Form;
