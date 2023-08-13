import React, { useEffect, useState } from "react";
import { StyledFiltersEditor } from "./styles/FiltersEditor.styled";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { Flex } from "../styles/Flex.styled";
import { Filter } from "../../types";
import useGetFilters from "../AddAvailability/hooks/useGetFilters";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import { useAddFilterContext } from "../../helpers/AddFilterContext";

function FiltersEditor() {
  const [addFilterState, setAddFilterState] = useAddFilterContext();
  const [authData, setAuthData] = useAuthDataContext();

  const [filters, setFilters] = useState<Filter[]>([]);
  const { getFilters } = useGetFilters();

  useEffect(() => {
    const getFiltersData = async () => {
      setFilters(await getFilters(setAuthData));
    };

    getFiltersData();
  }, []);

  return (
    <>
      <StyledFiltersEditor>
        <StyledFlexRow className="createFilterButton">
          <Flex
            className="add"
            onClick={() =>
              setAddFilterState((prevAddFilterState) => ({
                ...prevAddFilterState,
                isDisplayed: true,
              }))
            }
          >
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
          <span>Ajouter un filtre</span>
        </StyledFlexRow>
        {filters.map((filter) => (
          <Flex
            className="filterElement"
            style={{ backgroundColor: filter.color }}
          >
            <span>
              {filter.title} - {filter.duration}h
            </span>
          </Flex>
        ))}
      </StyledFiltersEditor>
    </>
  );
}

export default FiltersEditor;
