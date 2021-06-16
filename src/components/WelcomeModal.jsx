import React from "react";

const WelcomeModal = (props) => {
  const { toggleModal } = props;

  return (
    <div>
      <h3>
        Hola! We’re so excited you are a part of SmartGift. We love all our
        customers, and that includes you too!
      </h3>
      <button onClick={toggleModal}>Thanks</button>
    </div>
  );
};

export default WelcomeModal;
