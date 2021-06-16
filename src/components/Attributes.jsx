import React from "react";
import Dropdown from "./Dropdown";
import useProducts from "../context/ProductStore";

const Attributes = () => {
  const {
    state: { products, activeProductIndex, selectedSku },
    dispatch,
  } = useProducts();

  const attributes = products[activeProductIndex].attrList;

  const handleChange = (label, value) => {
    const obj = {};
    obj[label] = value;
    dispatch({ type: "CHANGE_SELECTED_SKU", payload: obj });
  };

  return Object.keys(attributes).map((item, index) => {
    return (
      <Dropdown
        key={index}
        label={item}
        items={attributes[item]}
        selectedItem={selectedSku.attrs[item]}
        callback={handleChange}
      />
    );
  });
};

export default Attributes;
