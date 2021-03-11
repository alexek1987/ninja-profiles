import React from "react";
import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState } from "react";
import styled from "styled-components";

function AllProfiles() {
  const [allNinjas, setAllNinjas] = useState([]);
  const [filterNinjas, setFilterNinjas] = useState("All");

  const [count, setCount] = useState(0);

  const counter = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    fetch("https://api.tretton37.com/ninjas")
      .then((result) => result.json())
      .then((data) => {
        setAllNinjas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NinjaLabel htmlFor="offices">Offices</NinjaLabel>
      <NinjaSelect
        id="offices"
        onChange={(e) => setFilterNinjas(e.target.value)}
        value={filterNinjas}
      >
        <NinjaOption value="All">Alla</NinjaOption>
        <NinjaOption value="Lund">Lund</NinjaOption>
        <NinjaOption value="Stockholm">Stockholm</NinjaOption>
        <NinjaOption value="Helsingborg">Helsingborg</NinjaOption>
        <NinjaOption value="Ljubljana">Ljubljana</NinjaOption>
      </NinjaSelect>

      <AllProfilesContainer>
        {allNinjas.map((ninja, index) =>
          filterNinjas === ninja.office ? (
            <NinjaCard>
              <NinjaProfileCard ninja={ninja} key={() => counter} />
            </NinjaCard>
          ) : filterNinjas === "All" ? (
            <NinjaCard>
              <NinjaProfileCard ninja={ninja} key={() => counter} />
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
