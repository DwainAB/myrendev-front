import React from "react";
import { StyledSectionTitle } from "./styles/SectionTitle.styled";
import StraightBar from "../StraightBar/StraightBar";

function SectionTitle({ title }: { title: string }) {
  return (
    <StyledSectionTitle>
      <h2>{title}</h2>
    </StyledSectionTitle>
  );
}

export default SectionTitle;
