
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Button = (props) => {
  return (
    <StyledWrapper>
      <button   type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      >
       
        <span> {props.disabled ? "Login...":"Login" }</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height={34} width={34}>
          <circle strokeWidth={3} stroke="black" r="35.5" cy={37} cx={37} />
          <path fill="black" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
}
Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']), // Must be one of the specified types
    disabled: PropTypes.bool,                            // Must be a boolean
    onClick: PropTypes.func,                             // Must be a function (optional)
    className: PropTypes.string,                         // Optional className for additional styling
                // The button content (text, icons, etc.)
  };

const StyledWrapper = styled.div`
  button {
    cursor: pointer;
    font-weight: 700;
    font-family: Helvetica,"sans-serif";
    transition: all .2s;
    padding: 5px 20px;
    border-radius: 10px;
    background: white;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    font-size: 15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  button:hover {
    background: white;
  }

  button > svg {
    width: 24px;
    margin-left: 10px;
    transition: transform .3s ease-in-out;
  }

  button:hover svg {
    transform: translateX(5px);
  }

  button:active {
    transform: scale(0.95);
  }`;

export default Button;
