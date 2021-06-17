import React from "react";
import styled from "styled-components";

const Text = styled("span")`
  font-weight: bold;
  font-size: 32px;
`;

const AcceptanceModal = (props) => {
  const { toggleModal, selectedSkuId } = props;

  return (
    <div>
      <Text>
        The request has been successfully received. Sku code: {selectedSkuId}
      </Text>
      <div>
        <button onClick={toggleModal}>Okay</button>
      </div>
    </div>
  );
};

export default AcceptanceModal;
