import styled from "styled-components";
import reviews1 from "../../../../../assets/note-1.png";
import reviews2 from "../../../../../assets/note-2.png";

export const StyledReviews = styled.div`
  padding: 0;
  margin: 0;
  background-image: url(${reviews1});
  background-size: cover;
  background-position: center 40%;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-left: 7.5vw;
  margin-top: 5vh;
  min-height: 40vh;
  max-width: 40vw;
  box-shadow: 5px 5px 30px 10px rgba(0, 0, 0, 0.25);
`;

export const StyledReviews2 = styled.div`
  position: relative;
  bottom: 15vh;
  left: 22.5vw;
  padding: 0;
  margin: 0;
  background-image: url(${reviews2});
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
