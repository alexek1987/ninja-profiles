import React from "react";
import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState } from "react";

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
      {allNinjas.map((ninja, index) => (
        <div>
          <NinjaProfileCard ninja={ninja} index={index} />
        </div>
      ))}
    </>
  );
}

export default Profiles;
