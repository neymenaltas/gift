import styled from "styled-components";

const SpinnerDiv = styled("div")`
   {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #111;
    border-top: 2px solid gold;
    border-bottom: 2px solid gold;
    animation: spinnerAnimation 1s linear infinite;
  }

  @keyframes spinnerAnimation {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => <SpinnerDiv />;

export default Spinner;
