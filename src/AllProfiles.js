import React from "react";
import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState } from "react";
import styled from "styled-components";

function AllProfiles() {
  const [allNinjas, setAllNinjas] = useState([]);
  const [filterNinjas, setFilterNinjas] = useState("All");
  const [filterNinjaNames, setFilterNinjaNames] = useState("default");
  const [filterNinjaLinks, setFilterNinjaLinks] = useState("all");

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

  useEffect(() => {
    switch (filterNinjaNames) {
      case "ascend":
        {
          let sortedNamesArray = [...allNinjas];

          sortedNamesArray = sortedNamesArray.sort((a, b) => {
            const charA = a.name[0];
            const charB = b.name[0];
            if (charA > charB) {
              return 1;
            } else {
              return -1;
            }
          });
          setAllNinjas(sortedNamesArray);
        }
        break;

      case "decend":
        {
          let sortedNamesArray = [...allNinjas];

          sortedNamesArray = sortedNamesArray.sort((a, b) => {
            const charA = a.name[0];
            const charB = b.name[0];
            if (charA > charB) {
              return -1;
            } else {
              return 1;
            }
          });
          setAllNinjas(sortedNamesArray);
        }
        break;

      default:
        break;
    }
  }, [filterNinjaNames]);

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

      <NinjaLabel htmlFor="names">Names</NinjaLabel>
      <NinjaSelect
        id="names"
        onChange={(e) => setFilterNinjaNames(e.target.value)}
        value={filterNinjaNames}
      >
        <NinjaOption value="default">Default</NinjaOption>
        <NinjaOption value="ascend">Ascending</NinjaOption>
        <NinjaOption value="decend">Decending</NinjaOption>
      </NinjaSelect>

      <NinjaLabel htmlFor="links">Social Links</NinjaLabel>
      <NinjaSelect
        id="links"
        onChange={(e) => setFilterNinjaLinks(e.target.value)}
        value={filterNinjaLinks}
      >
        <NinjaOption value="all">All</NinjaOption>
        <NinjaOption value="gitHub">Github</NinjaOption>
        <NinjaOption value="twitter">Twitter</NinjaOption>
        <NinjaOption value="linkedIn">LinkedIn</NinjaOption>
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
