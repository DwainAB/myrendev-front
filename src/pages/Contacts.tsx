import React, { useEffect, useState } from "react";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import StraightBar from "../components/Atomes/StraightBar/StraightBar";
import { Flex } from "../components/styles/Flex.styled";
import ContactCard from "../components/ContactCard/ContactCard";
import { useNavigationContext } from "../helpers/NavigationContext";
import { StyledDesktopPage } from "./styles/Desktop.styled";
import { StyledFlexRow } from "../components/styles/FlexRow.styled";
import MobileDetailsCard from "../components/MobileDetailsCard/MobileDetailsCard";
import SectionTitle from "../components/Atomes/SectionTitle/SectionTitle";
import { User, Appointment, Filter, Client } from "../types";
import { FaSearch } from "react-icons/fa";
import { useAuthDataContext } from "../helpers/AuthDataContext";
import useVerifyToken from "./hooks/useVerifyToken";
import useGetClients from "./hooks/useGetClients";
import AddClient from "../components/AddClient/AddClient";
import { useAddClientContext } from "../helpers/AddClientContext";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import AddAvailability from "../components/AddAvailability/AddAvailability";

function Contacts() {
  const [navigationState, setNavigationState] = useNavigationContext();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [listContacts, setListContacts] = useState<Client[]>([]);
  const [authData, setAuthData] = useAuthDataContext();
  const { verifyToken } = useVerifyToken();
  const { getClients } = useGetClients();
  const [addClient, setAddClient] = useAddClientContext();

  useEffect(() => {
    const getClientsData = async () => {
      setListContacts(await getClients(setAuthData));
    };

    getClientsData();
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
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setListContacts(data.clients))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {isMobile ? (
        <>
          <NavigationBar />
          <Flex>
            <MobileHeader />
            <StraightBar />
            {listContacts.map((client) => {
              return <ContactCard data={client} key={client.clientEmail} />;
            })}
          </Flex>
        </>
      ) : (
        <>
          <NavigationBar />
          <StyledDesktopPage>
            <AddClient />
            <AddAvailability />
            <StyledFlexRow className="rowContainer">
              <Flex className="desktopColumnContainer">
                <MobileHeader />
                <StraightBar />
                <StyledFlexRow className="searchBar">
                  <FaSearch />
                  <input
                    type="text"
                    name="contactSearch"
                    id=""
                    placeholder="Rechercher dans les contacts ..."
                  />
                </StyledFlexRow>
                <StyledFlexRow
                  className="createContactButton"
                  onClick={() => {
                    setAddClient((prevAddClient) => ({
                      ...prevAddClient,
                      isDisplayed: true,
                    }));
                  }}
                >
                  <Flex className="add">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" />
                    </svg>
                  </Flex>
                  <span>Ajouter un client</span>
                </StyledFlexRow>
                {listContacts.map((client) => (
                  <React.Fragment key={client.clientEmail}>
                    <ContactCard data={client} />
                  </React.Fragment>
                ))}
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

export default Contacts;
