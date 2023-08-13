import { Flex } from "../styles/Flex.styled";
import { StyledDemoBar } from "./styles/DemoBar.styled";
import { useDemo } from "../../helpers/AuthPageContext";
import { StyledTitle } from "./atomes/Title/styles/Title.styled";
import Title from "./atomes/Title/Title";
import { StyledStraightBar } from "../Atomes/StraightBar/styles/StraightBar.styled";
import Description from "./atomes/Description/Description";
import AddCard from "../AddCard/AddCard";

function DemoBar() {
  const [isDemo, setIsDemo] = useDemo();

  return (
    <>
      <StyledDemoBar demostep={isDemo.demoSteps}>
        <Flex>
          <Title />
          <StyledStraightBar />
          <Description />
          <StyledStraightBar />
          <AddCard />
        </Flex>
      </StyledDemoBar>
    </>
  );
}

export default DemoBar;
