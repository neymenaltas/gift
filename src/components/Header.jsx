import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import ChangeThemeModal from "./ChangeThemeModal";
import { Link } from "react-router-dom";

const HeaderContainer = styled("div")`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled("div")`
  display: flex;
`;

const Button = styled("button")`
  position: absolute;
  right: 10px;
  height: 60pc;
  width: 90px;
  padding: 0;
  cursor: pointer;
`;

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <HeaderContainer id="header">
      <Logo>
        <Link to="/">
          <img
            src="https://www.smartgiftit.com/_next/image?url=https%3A%2F%2Fsmartgift-apollo-resources.s3.amazonaws.com%2Fbusiness-site%2Flogo_on_light_5e72bfd033.svg&w=3840&q=75"
            alt={"header"}
          />
        </Link>
      </Logo>
      <Button onClick={() => setShowModal(!showModal)}>Change Theme</Button>
      {showModal ? (
        <Modal>
          <ChangeThemeModal toggleModal={toggleModal}></ChangeThemeModal>
        </Modal>
      ) : null}
    </HeaderContainer>
  );
};

export default Header;
