import React, { useContext } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ThemeContext } from "./context/ThemeStore";

const themes = {
  dark: {
    textColor: "white",
    backgroundColor: "#1e1f1e",
    buttonColor: "#0f5052",
    buttonTextColor: "white",
    linearBackground:
      "linear-gradient(0deg, rgba(94,117,117,1) 0%, rgba(21,51,21,1) 100%)",
    fontSize: "20px",
  },
  warm: {
    textColor: "black",
    backgroundColor: "#f2de9c",
    buttonColor: "#ed3a21",
    buttonTextColor: "white",
    linearBackground:
      "linear-gradient(0deg, rgba(224,138,138,1) 26%, rgba(154,60,47,1) 100%)",
    fontSize: "20px",
  },
  light: {
    textColor: "black",
    backgroundColor: "#d8e6d8",
    buttonColor: "#5fa65f",
    buttonTextColor: "white",
    linearBackground:
      "linear-gradient(0deg, rgba(173,206,207,1) 0%, rgba(255,255,255,1) 100%)",
    fontSize: "20px",
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body {
  background-color: ${({ theme }) => theme.backgroundColor};
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: gray;
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}


h1, h2, h3, h4, h5, h6 {
  color: ${({ theme }) => theme.textColor};
}

p {
  color: ${({ theme }) => theme.textColor};
  font-size: ${(props) => props.fontSize};
}

span {
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ fontSize }) => fontSize};
}

button {
  background-color: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.buttonTextColor};
  padding: .8rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

#header {
  background: ${({ theme }) => theme.linearBackground};
}

#modal {
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

#modal:empty {
  display: none;
}

#modal > div:first-child {
  background-color: white;
  max-width: 500px;
  text-align: center;
  border-radius: 30px;
  padding: 15px;
  background: ${({ theme }) => theme.backgroundColor};
}

`;

const Theme = ({ children }) => {
  const { theme, fontSize } = useContext(ThemeContext);

  const size = "" + fontSize + "px";

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle fontSize={size} />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
