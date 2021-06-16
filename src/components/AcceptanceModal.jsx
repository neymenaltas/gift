import React from "react";

const AcceptanceModal = (props) => {
  const { toggleModal, selectedSkuId } = props;

  return (
    <div>
      <h3>
        The request has been successfully received. Sku code: {selectedSkuId}
      </h3>
      <button onClick={toggleModal}>Okay</button>
    </div>
  );
};

export default AcceptanceModal;
