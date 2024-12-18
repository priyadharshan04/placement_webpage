
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Input = ({ type, id, name, value, onChange, required, label }) => {
    return (
      <StyledWrapper>
        <div className="inputGroup">
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete="off"
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </StyledWrapper>
    );
  };
  Input.propTypes = {
    type: PropTypes.string.isRequired,       // Type of input (e.g., text, number, etc.)
    id: PropTypes.string.isRequired,         // ID for input and label association
    name: PropTypes.string.isRequired,       // Name attribute for the input
    value: PropTypes.oneOfType([             // Value of the input
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,     // Function to handle input changes
    required: PropTypes.bool,                // Whether the input is required
    label: PropTypes.string.isRequired,      // Label text for the input
    className: PropTypes.string,             // Optional custom class name
  };
  
 
const StyledWrapper = styled.div`
  .inputGroup {
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0 1em 0;
    position: relative;


  }
    input[type="number"] {
  -moz-appearance: textfield; /* For Firefox */
  -webkit-appearance: none;  /* For Chrome, Safari, Edge */
  appearance: none;          /* Standard property */
}
  input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Hides the spin buttons in WebKit browsers */
  margin: 0; /* Removes extra margin */
}

  .inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    border: 2px solid rgb(200, 200, 200);
    background-color: transparent;
    border-radius: 7px;
    width: 80%;
      
  }
     .inputGroup input:after{

     }

  .inputGroup label {
    font-size: 100%;
    position: absolute;
    left: 0;
    top:0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
    
  }

  .inputGroup :is(input:focus, input:valid)~label {
    transform: translateY(-50%) scale(.9);
    margin: 0em;
    margin-left: 1.3em;
    padding: 0.4em;
    background-color: white;
  }

  .inputGroup :is(input:focus, input:valid) {
    border-color: rgb(150, 150, 200);
  }`;

export default Input;
