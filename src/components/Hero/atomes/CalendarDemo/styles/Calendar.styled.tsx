import styled from "styled-components";
import calendar1 from "../../../../../assets/calendar-1.png";
import calendar2 from "../../../../../assets/calendar-2.png";

export const StyledCalendar = styled.div`
  padding: 0;
  margin: 0;
  background-image: url(${calendar1});
  background-size: cover;
  background-position: left top;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-left: 7.5vw;
  margin-top: 5vh;
  min-height: 40vh;
  max-width: 40vw;
  box-shadow: 5px 5px 30px 10px rgba(0, 0, 0, 0.25);
`;

export const StyledCalendar2 = styled.div`
  position: relative;
  bottom: 15vh;
  left: 22.5vw;
  padding: 0;
  margin: 0;
  background-image: url(${calendar2});
  background-size: cover;
  background-position: left top;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-left: 7.5vw;
  min-height: 30vh;
  max-height: 30vh;
  max-width: 30vw;
  box-shadow: 5px 5px 30px 10px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
