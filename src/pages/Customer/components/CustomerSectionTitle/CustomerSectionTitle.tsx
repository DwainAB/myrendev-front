import React from "react";
import { StyledCustomerSectionTitle } from "./styles/CustomerSectionTitle.styled";

function CustomerSectionTitle({ title }: { title: string }) {
  return (
    <StyledCustomerSectionTitle>
      <h2>{title}</h2>
    </StyledCustomerSectionTitle>
  );
}

export default CustomerSectionTitle;
