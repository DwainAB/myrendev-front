import {
  StyledMobile1,
  StyledMobile2,
  StyledMobile3,
} from "./styles/Mobile.styled";
import { StyledFlexRow } from "../../../styles/FlexRow.styled";

function Mobile() {
  return (
    <>
      <StyledFlexRow>
        <StyledMobile1></StyledMobile1>
        <StyledMobile2></StyledMobile2>
        <StyledMobile3></StyledMobile3>
      </StyledFlexRow>
    </>
  );
}

export default Mobile;
