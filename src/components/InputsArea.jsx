import React, { useState } from "react";
import styled from "styled-components";

const InputsArea = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InputBox = styled("input")`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-top: 8px;
  margin-right: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const SendButtonArea = styled("div")`
  display: flex;
  align-items: flex-end;
  @media (max-width: 768px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

const SendButton = styled("button")`
  height: 45px;
  width: 100px;
`;

const InputArea = ({ match, handleRequest }) => {
  const [productIds, setProductIds] = useState(
    match.params.id ? match.params.id : ""
  );
  const [merchantCode, setMerchantCode] = useState("vineyardvines");

  return (
    <InputsArea>
      <div>
        <span>Merchant Code:</span>
        <InputBox
          type="text"
          value={merchantCode}
          onChange={(e) => setMerchantCode(e.target.value)}
        />
      </div>
      <div>
        <span>Product Id(s):</span>
        <InputBox
          type="text"
          value={productIds}
          onChange={(e) => setProductIds(e.target.value)}
        />
      </div>
      <SendButtonArea>
        <SendButton onClick={() => handleRequest(merchantCode, productIds)}>
          Send
        </SendButton>
      </SendButtonArea>
    </InputsArea>
  );
};

export default InputArea;
