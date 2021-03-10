import React from "react";
import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState } from "react";
import styled from "styled-components";

function Profiles() {
  const [allNinjas, setAllNinjas] = useState([]);

  useEffect(() => {
    fetch("https://api.tretton37.com/ninjas")
      .then((result) => result.json())
      .then((data) => {
        setAllNinjas(data);
        // console.log(data[0].office);
        console.log(allNinjas[1].office);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AllProfilesContainer>
        {allNinjas.map((ninja, index) => (
          <NinjaCard>
            <NinjaProfileCard ninja={ninja} index={index} />
          </NinjaCard>
        ))}
      </AllProfilesContainer>
    </>
  );
}

export default Profiles;

const AllProfilesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const NinjaCard = styled.div`
  height: 360px;
  padding: 0 auto;
  flex-basis: 20%;
  display: grid;
  place-items: center;
  box-sizing: border-box;
`;
