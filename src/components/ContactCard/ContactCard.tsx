import React, { useState } from "react";
import { StyledContactCard } from "./styles/ContactCard.styled";
import { Flex } from "../styles/Flex.styled";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { FaLink } from "react-icons/fa";
import { User, Appointment, Filter, Client } from "../../types";
import { useAddScheduleContext } from "../../helpers/AddScheduleContext";
import { useCustomerContext } from "../../helpers/CustomerContext";

function ContactCard({ data }: { data: Client }) {
  const [customerState, setCustomerState] = useCustomerContext();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [addSchedule, setAddSchedule] = useAddScheduleContext();

  //Fonction qui permet d'appeler
  const handlePhoneCall = () => {
    const phoneNumber = data.clientPhone; 
    const telHref = `tel:${phoneNumber}`;
    window.location.href = telHref;
  };

  //Fonction qui permet d'envoyer une invitation de rendez-vous
  const handleSendEmail = () => {
    const emailAddress = data.clientEmail; //Adress mail du destinataire
    const emailBody = 
    `Bonjour Mr/Mme ${data.clientLastName}`; // Remplacez ceci par le contenu de l'e-mail.
  
    const mailtoHref = `mailto:${emailAddress}?body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoHref;
  };

  const handleSendInvitation = () => {
    const emailAddress = data.clientEmail; //Adress mail du destinataire
    const emailSubject = 'Veuillez choisir un RDV' //Objet du mail 
    const emailBody = //Message du mail
`Bonjour Mr/Mme ${data.clientLastName}
    
Nous vous invitons à choisir un crénaux disponible pour un rendez-vous, en cliquant sur ce lien : 
 
Nous vous souhaitons une excellente journée !`;
  
    const mailtoHref = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoHref;
  };
  
  

  return (
    <>
      <StyledContactCard
        isopened={isOpened}
        onClick={() => (isOpened ? setIsOpened(false) : setIsOpened(true))}
      >
        <Flex className="containerColumn">
          <StyledFlexRow className="contactNameRow">
            <img src="src/assets/customer.png" alt="" />
            <Flex className="contactNameColumn">
              <span>
                {data.clientFirstName} {data.clientLastName}
              </span>
              <StyledFlexRow className="linkRow">
                <FaLink />
                <span>vers le dernier rendez-vous</span>
              </StyledFlexRow>
            </Flex>
          </StyledFlexRow>
          {isOpened ? (
            <StyledFlexRow className="buttonsRow">
              <Flex onClick={handlePhoneCall}>Téléphoner</Flex>
              <Flex onClick={handleSendEmail}>Envoyer un mail</Flex>
              <Flex
                onClick={
                 // setAddSchedule({ isDisplayed: true }),
                 // setCustomerState((prev) => ({ ...prev, clientDetails: data }))
                 handleSendInvitation
                }
              >
                Envoyer une invitation
              </Flex>
            </StyledFlexRow>
          ) : null}
        </Flex>
      </StyledContactCard>
    </>
  );
}

export default ContactCard;
