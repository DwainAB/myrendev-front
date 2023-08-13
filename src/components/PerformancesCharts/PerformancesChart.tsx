import React from "react";
import { FaStar } from "react-icons/fa";
import { StyledPerformancesChart } from "./styles/PerformancesCharts.styled";
import { Flex } from "../styles/Flex.styled";
import { StyledFlexRow } from "../styles/FlexRow.styled";

function PerformancesChart() {
  return (
    <StyledPerformancesChart percentage={30}>
      <Flex className="columnContainer">
        <h2>Performances globales</h2>
        <Flex className="globalNoteColumn">
          <span>5.0</span>
          <StyledFlexRow>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </StyledFlexRow>
        </Flex>
        <Flex className="chartsColumn">
          <Flex className="chartContainer">
            <span>Ponctualité</span>
            <div className="emptyBar"></div>
            <div className="fullfilledBar"></div>
          </Flex>
          <Flex className="chartContainer">
            <span>Amabilité</span>
            <div className="emptyBar"></div>
            <div className="fullfilledBar"></div>
          </Flex>
          <Flex className="chartContainer">
            <span>Qualité de l'intervention</span>
            <div className="emptyBar"></div>
            <div className="fullfilledBar"></div>
          </Flex>
        </Flex>
      </Flex>
    </StyledPerformancesChart>
  );
}

export default PerformancesChart;
