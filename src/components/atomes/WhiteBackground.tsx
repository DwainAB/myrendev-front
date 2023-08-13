import { StyledWhiteBackground } from "./styles/WhiteBackground.styled";
import { useAuthPage } from "../../helpers/AuthPageContext";

function WhiteBackground() {
  const [authPage] = useAuthPage();
  return (
    <>
      {authPage.styled == true ? (
        <StyledWhiteBackground></StyledWhiteBackground>
      ) : null}
    </>
  );
}

export default WhiteBackground;
