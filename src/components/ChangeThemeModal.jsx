import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeStore";
import ThemeNameEnums from "../enums/ThemeName";

const ExampleText = styled("div")`
  margin: 12px;
`;

const SlideContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px;
  width: 100%;
`;

const Slide = styled("input")`
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
  ::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }
`;

const LightButton = styled("button")`
  height: 30px;
  background: #5fa65f;
  color: white;
  padding: 0;
  width: 80px;
  border-radius: 0;
  margin-right: 16px;
`;

const WarmButton = styled("button")`
  height: 30px;
  background: #ed3a21;
  color: white;
  padding: 0;
  width: 80px;
  border-radius: 0;
  margin-right: 16px;
`;

const DarkButton = styled("button")`
  height: 30px;
  background: #0f5052;
  color: white;
  padding: 0;
  width: 80px;
  border-radius: 0;
`;

const DoneButton = styled("button")`
  margin-top: 12px;
`;

const SmallerText = styled("span")`
  font-size: 12px;
`;

const BiggerText = styled("span")`
  font-size: 32px;
`;

const ChangeThemeModal = (props) => {
  const { toggleModal } = props;

  const { theme, setTheme, fontSize, setFontSize } = useContext(ThemeContext);

  const [rangeValue, setRangeValue] = useState(fontSize);

  const handleRangeChange = (e) => {
    setFontSize(e.target.value);
    setRangeValue(e.target.value);
  };

  const handleChangeTheme = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize.toString());
    toggleModal();
  };

  return (
    <div>
      <ExampleText>
        <span>Manage your font size, color and background.</span>
      </ExampleText>
      <SlideContainer>
        <SmallerText>AA</SmallerText>
        <Slide
          onChange={(e) => handleRangeChange(e)}
          type="range"
          step="4"
          min="8"
          max="24"
          value={rangeValue}
          className="slider"
        />
        <BiggerText>AA</BiggerText>
      </SlideContainer>
      <div>
        <LightButton onClick={() => setTheme(ThemeNameEnums.LIGHT)}>
          <input
            style={{ cursor: "pointer", marginRight: "8px" }}
            type="checkbox"
            checked={theme === ThemeNameEnums.LIGHT}
            readOnly
          />
          Light
        </LightButton>
        <WarmButton onClick={() => setTheme(ThemeNameEnums.WARM)}>
          <input
            style={{ cursor: "pointer", marginRight: "8px" }}
            type="checkbox"
            checked={theme === ThemeNameEnums.WARM}
            readOnly
          />
          Warm
        </WarmButton>
        <DarkButton onClick={() => setTheme(ThemeNameEnums.DARK)}>
          <input
            style={{ cursor: "pointer", marginRight: "8px" }}
            type="checkbox"
            checked={theme === ThemeNameEnums.DARK}
            readOnly
          />
          Dark
        </DarkButton>
      </div>
      <DoneButton onClick={() => handleChangeTheme()}>Done</DoneButton>
    </div>
  );
};

export default ChangeThemeModal;
