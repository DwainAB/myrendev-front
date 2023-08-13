import React from "react";
import moment, { Moment } from "moment";
import { FaStar } from "react-icons/fa";
import { StyledComment } from "./styles/Comment.styled";
import { Flex } from "../styles/Flex.styled";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { User, Appointment, Filter, Client } from "../../types";

function Comment({ data }: { data: Appointment }) {
  function formatDate(date: Date) {
    moment.locale("fr");
    return moment(date).format("DD/MM/YYYY");
  }
  return (
    <>
      <StyledComment>
        <Flex className="columnContainer">
          <StyledFlexRow className="rowInfos">
            <img src="src/assets/customer.png" alt="" />
            <Flex className="nameColumn">
              <span>{data.clientName}</span>
              <StyledFlexRow className="rowStars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </StyledFlexRow>
            </Flex>
            <span>Rendez-vous du {formatDate(data.date)}</span>
          </StyledFlexRow>
          <p>{data.comment}</p>
        </Flex>
      </StyledComment>
    </>
  );
}

export default Comment;
