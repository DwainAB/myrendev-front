import React, { useEffect, useState } from "react";
import { StyledCustomerNavigationBar } from "./styles/CustomerNavigationBar.styled";
import { StyledFlexRow } from "../../../../components/styles/FlexRow.styled";
import { Flex } from "../../../../components/styles/Flex.styled";
import { FaBars } from "react-icons/fa";
import { useNavigationContext } from "../../../../helpers/NavigationContext";
import { useAuthDataContext } from "../../../../helpers/AuthDataContext";
import { useNavigate } from "react-router-dom";

function CustomerNavigationBar() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [navigationState, setNavigationState] = useNavigationContext();
  const [authData, setAuthData] = useAuthDataContext();

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

  return navigationState.isDisplayed ? (
    <StyledCustomerNavigationBar activepage={navigationState.navigationPage}>
      <div className="navigationContainer">
        <div className="navHeader">
          <StyledFlexRow className="row">
            <Flex className="userInfos">
              <img src="src/assets/profile.png" alt="" />
              <span>
                {"Agenda de l'entreprise " + authData.loginData.companyName}
              </span>
            </Flex>
            <FaBars />
          </StyledFlexRow>
        </div>
        <ul>
          <Flex
            onClick={() => (
              isMobile
                ? setNavigationState({
                    isDisplayed: false,
                    navigationPage: 1,
                  })
                : setNavigationState({
                    isDisplayed: true,
                    navigationPage: 1,
                  }),
              navigate("/")
            )}
          >
            <li>
              <StyledFlexRow className="navSectionRow">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0 2.89 0 4V18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.89 17.1 2 16 2ZM16 18H2V7H16V18ZM9 16V14H5V11H9V9L13 12.5L9 16Z"
                    fill="white"
                  />
                </svg>
                <span>Agenda</span>
              </StyledFlexRow>
            </li>
          </Flex>

          <Flex
            onClick={() => (
              isMobile
                ? setNavigationState({
                    isDisplayed: false,
                    navigationPage: 2,
                  })
                : setNavigationState({
                    isDisplayed: true,
                    navigationPage: 2,
                  }),
              navigate("/notes")
            )}
          >
            <li>
              <StyledFlexRow className="navSectionRow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.23 16L10 13.45L5.77 16L6.89 11.19L3.16 7.96L8.08 7.54L10 3L11.92 7.53L16.84 7.95L13.11 11.18L14.23 16ZM10 0C4.47 0 0 4.5 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                    fill="white"
                  />
                </svg>
                <span>Notes et avis</span>
              </StyledFlexRow>
            </li>
          </Flex>

          {/* <Flex
            onClick={() => (
              isMobile
                ? setNavigationState({
                    isDisplayed: false,
                    navigationPage: 3,
                  })
                : setNavigationState({
                    isDisplayed: true,
                    navigationPage: 3,
                  }),
              navigate("/anciens")
            )}
          >
            <li>
              <StyledFlexRow className="navSectionRow">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0 2.89 0 4V18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.89 17.1 2 16 2ZM16 18H2V7H16V18ZM9 9V11H13V14H9V16L5 12.5L9 9Z"
                    fill="white"
                  />
                </svg>
                <span>Anciens rendez-vous</span>
              </StyledFlexRow>
            </li>
          </Flex> */}

          <Flex
            onClick={() => (
              isMobile
                ? setNavigationState({
                    isDisplayed: false,
                    navigationPage: 3,
                  })
                : setNavigationState({
                    isDisplayed: true,
                    navigationPage: 3,
                  }),
              navigate("/contacts")
            )}
          >
            <li>
              <StyledFlexRow className="navSectionRow">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 14C3 12 7 10.9 9 10.9C11 10.9 15 12 15 14V15H3M12 6C12 6.79565 11.6839 7.55871 11.1213 8.12132C10.5587 8.68393 9.79565 9 9 9C8.20435 9 7.44129 8.68393 6.87868 8.12132C6.31607 7.55871 6 6.79565 6 6C6 5.20435 6.31607 4.44129 6.87868 3.87868C7.44129 3.31607 8.20435 3 9 3C9.79565 3 10.5587 3.31607 11.1213 3.87868C11.6839 4.44129 12 5.20435 12 6ZM0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0H2C0.89 0 0 0.9 0 2Z"
                    fill="white"
                  />
                </svg>
                <span>Contacts</span>
              </StyledFlexRow>
            </li>
          </Flex>

          <Flex
            onClick={() => (
              isMobile
                ? setNavigationState({
                    isDisplayed: false,
                    navigationPage: 4,
                  })
                : setNavigationState({
                    isDisplayed: true,
                    navigationPage: 4,
                  }),
              navigate("/filtres")
            )}
          >
            <li>
              <StyledFlexRow className="navSectionRow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="13"
                  viewBox="0 0 19 13"
                  fill="none"
                >
                  <path
                    d="M3.16919 7.62207H15.1692V5.62207H3.16919M0.169189 0.62207V2.62207H18.1692V0.62207M7.16919 12.6221H11.1692V10.6221H7.16919V12.6221Z"
                    fill="white"
                  />
                </svg>
                <span>Vos filtres</span>
              </StyledFlexRow>
            </li>
          </Flex>
        </ul>
      </div>
    </StyledCustomerNavigationBar>
  ) : null;
}

export default CustomerNavigationBar;
