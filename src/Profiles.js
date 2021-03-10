import React from "react";
import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect } from "react";

function Profiles() {
  //   const [allNinjas, setAllNinjas] = useEffect([]);

  useEffect(() => {
    fetch("https://api.tretton37.com/ninjas")
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        // setAllNinjas(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <NinjaProfileCard />
    </>
  );
}

export default Profiles;
