import React, { useEffect, useState } from "react";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import StraightBar from "../components/Atomes/StraightBar/StraightBar";
import PerformancesChart from "../components/PerformancesCharts/PerformancesChart";
import { Flex } from "../components/styles/Flex.styled";
import Comment from "../components/Comment/Comment";
import { User, Appointment, Filter, Client } from "../types";
import { useNavigationContext } from "../helpers/NavigationContext";
import { StyledFlexRow } from "../components/styles/FlexRow.styled";
import { StyledDesktopPage } from "./styles/Desktop.styled";
import SectionTitle from "../components/Atomes/SectionTitle/SectionTitle";
import { useAuthDataContext } from "../helpers/AuthDataContext";
import useVerifyToken from "./hooks/useVerifyToken";
import NavigationBar from "../components/NavigationBar/NavigationBar";

function Reviews() {
  const [schedules, setSchedules] = useState<Appointment[]>([]);

  const [navigationState, setNavigationState] = useNavigationContext();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const [authData, setAuthData] = useAuthDataContext();

  const { verifyToken } = useVerifyToken();

  useEffect(() => {
    verifyToken(setAuthData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.loginData == null]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (!isMobile) {
        setNavigationState((prevNavigationState) => ({
          ...prevNavigationState,
          isDisplayed: true,
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  useEffect(() => {
    setNavigationState((prevNavigationState) => ({
      ...prevNavigationState,
      isDisplayed: true,
    }));
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <NavigationBar />
          <Flex>
            <MobileHeader />
            <StraightBar />
            <PerformancesChart />
            <StraightBar />
            {authData.appointments.map((appointment) =>
              appointment.comment ? <Comment data={appointment} /> : null
            )}
            <StraightBar />
          </Flex>
        </>
      ) : (
        <>
          <NavigationBar />
          <StyledDesktopPage>
            <StyledFlexRow className="rowContainer">
              <Flex className="desktopColumnContainer">
                <MobileHeader />
                <StraightBar />
                <PerformancesChart />
                <StraightBar />
                {authData.appointments.map((appointment) =>
                  appointment.comment ? <Comment data={appointment} /> : null
                )}
                <StraightBar />
              </Flex>
              <Flex className="sideBarRight">
                <MobileHeader />
                <StraightBar />
              </Flex>
            </StyledFlexRow>
          </StyledDesktopPage>
        </>
      )}
    </>
  );
}

export default Reviews;
