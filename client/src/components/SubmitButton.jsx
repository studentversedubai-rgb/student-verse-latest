import styled from 'styled-components';

export default function SubmitButton({ label = 'Submit', disabled = false }) {
  return (
    <StyledWrapper>
      <button className="btn" type="submit" disabled={disabled}>
        {label}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
    display: inline-block;
    font-family: sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    margin: 0;
    padding: 0.7rem 2rem;
    border-radius: 30em;
    border-style: none;
    position: relative;
    z-index: 1;
    overflow: hidden;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    background-color: transparent;
    box-shadow: 1px 1px 12px #000000;
    cursor: pointer;
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    transform: translateX(-101%);
    transition: all .3s ease;
    z-index: -1;
  }
  .btn:hover:not(:disabled) {
    color: #272727;
    transition: all .3s ease;
  }
  .btn:hover:not(:disabled)::before {
    transform: translateX(0);
  }
`;
