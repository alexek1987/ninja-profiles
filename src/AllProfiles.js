import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "./useFetch";

function AllProfiles() {
  const { loading, error, data, setData } = useFetch(
    "https://api.tretton37.com/ninjas"
  );

  const [filters, setFilters] = useState({});

  // handler for all states regarding filtering
  const onChangeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (value === "0") {
      value = Number(value);
    }
    // setFilters({ ...filters, [name]: value });
    setFilters({ [name]: value });
  };

  useEffect(() => {
    switch (filters["names"]) {
      case "ascend":
        {
          let sortedNamesArray = [...data];

          sortedNamesArray = sortedNamesArray.sort((a, b) => {
            const charA = a.name[0];
            const charB = b.name[0];
            if (charA > charB) {
              return 1;
            } else {
              return -1;
            }
          });
          setData(sortedNamesArray);
        }
        break;

      case "decend":
        {
          let sortedNamesArray = [...data];

          sortedNamesArray = sortedNamesArray.sort((a, b) => {
            const charA = a.name[0];
            const charB = b.name[0];
            if (charA > charB) {
              return -1;
            } else {
              return 1;
            }
          });
          setData(sortedNamesArray);
        }
        break;
      default:
        break;
    }
  }, [filters["names"]]);

  return (
    <>
      <NinjaLabel htmlFor="offices">Offices</NinjaLabel>
      <NinjaSelect
        name="office"
        id="offices"
        onChange={onChangeHandler}
        value={filters["office"]}
      >
        <NinjaOption value={0}>Alla</NinjaOption>
        <NinjaOption value="Lund">Lund</NinjaOption>
        <NinjaOption value="Stockholm">Stockholm</NinjaOption>
        <NinjaOption value="Helsingborg">Helsingborg</NinjaOption>
        <NinjaOption value="Ljubljana">Ljubljana</NinjaOption>
      </NinjaSelect>

      <NinjaLabel htmlFor="names">Names</NinjaLabel>
      <NinjaSelect
        id="names"
        name="names"
        onChange={onChangeHandler}
        value={filters["names"]}
      >
        <NinjaOption value={0}>Default</NinjaOption>
        <NinjaOption value="ascend">Ascending</NinjaOption>
        <NinjaOption value="decend">Decending</NinjaOption>
      </NinjaSelect>

      <NinjaLabel htmlFor="links">Social Links</NinjaLabel>
      <NinjaSelect
        id="links"
        name="links"
        onChange={onChangeHandler}
        value={filters["links"]}
      >
        <NinjaOption value={0}>All</NinjaOption>
        <NinjaOption value="gitHub">Github</NinjaOption>
        <NinjaOption value="twitter">Twitter</NinjaOption>
        <NinjaOption value="linkedIn">LinkedIn</NinjaOption>
      </NinjaSelect>

      <AllProfilesContainer>
        {data.map((ninja, index) =>
          (filters.office && filters.office === ninja.office) ||
          (filters.links && ninja[filters.links]) ||
          (!filters.office && !filters.links) ? (
            <NinjaCard key={index}>
              <NinjaProfileCard ninja={ninja} />
            </NinjaCard>
          ) : null
        )}
      </AllProfilesContainer>
    </>
  );
}

export default AllProfiles;

const AllProfilesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const NinjaCard = styled.div`
  height: 360px;
  padding: 0 auto;
  flex-basis: 23%;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  @media (max-width: 1224px) {
    flex-basis: 25%;
  }
  @media (max-width: 1024px) {
    flex-basis: 33%;
  }
  @media (max-width: 960px) {
    flex-basis: 42%;
  }

  @media (max-width: 768px) {
    flex-basis: 70%;
  }
`;

const NinjaSelect = styled.select``;
const NinjaOption = styled.option``;
const NinjaLabel = styled.label``;
