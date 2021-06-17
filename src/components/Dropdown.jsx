import React, { useState } from "react";

import styled from "styled-components";

const DropdownArea = styled("div")`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-top: 28px;
`;

const DropdownHeader = styled("div")`
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownBody = styled("div")`
  padding: 5px;
  border-top: 1px solid #e5e8ec;
  display: none;
  &.open {
    display: block;
  }
`;

const DropdownItem = styled("div")`
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled("i")`
  padding: 10px;
  font-size: 13px;
  color: #91a5be;
  transform: rotate(0deg);
  transition: all 0.2s ease-in-out;
  &.open {
    transform: rotate(90deg);
  }
`;

const Dropdown = (props) => {
  const { items, label, selectedItem, callback } = props;

  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (label, value) => {
    callback(label, value);
    toggleDropdown();
  };

  return (
    <DropdownArea>
      <DropdownHeader onClick={toggleDropdown}>
        {selectedItem ? items.find((item) => item === selectedItem) : label}
        <Icon className={`fa fa-chevron-right icon ${isOpen && "open"}`} />
      </DropdownHeader>
      <DropdownBody className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item) => (
          <DropdownItem
            className="dropdown-item"
            onClick={(e) => handleItemClick(label, item)}
            key={item}
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownBody>
    </DropdownArea>
  );
};

export default Dropdown;
