import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import useFetch from "./useFetch";
import { motion } from "framer-motion";

function AllProfiles() {
  // eslint-disable-next-line
  const { loading, error, data, setData } = useFetch(
    "https://api.tretton37.com/ninjas"
  );

  console.log(data);

  const [loadMore, setLoadMore] = useState(false);
  const [indexRange, setIndexRange] = useState({ endIndex: 19 });
  const observer = useRef();

  const [filters, setFilters] = useState({});
  // handler for all states regarding filtering
  const onChangeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (value === "0") value = Number(value);
    // setFilters({ ...filters, [name]: value });
    setFilters({ [name]: value });
  };
  const lastDataElementRef = useCallback(
    (node) => {
      // when loading is true, exit the callback
      if (loading) return;
      // if there's an observer in the reference then disconnect it
      if (observer.current) observer.current.disconnect();
      // assigning an obserer to the refernce
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // set load to display loading
          setLoadMore(true);
          // setting timeout to fake a loading ui (because the data is already fetched, and no refetch needed)
          setTimeout(() => {
            // render out 20 more ninja profiles to ui
            setIndexRange((prevState) => ({
              endIndex: prevState.endIndex + 20,
            }));
            // disable the loading ui
            setLoadMore(false);
          }, 2000);
        }
      });
      // watch the last element on current page in the dom
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    // sorting names
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

    // sorted offices

    if (filters["office"]) {
      let sortedOffices = [...data];
      sortedOffices = sortedOffices.sort((a, b) => {
        if (a.office === filters["office"]) {
          return -1;
        } else {
          return 1;
        }
      });
      setData(sortedOffices);
    }

    // sorted links

    if (filters["links"]) {
      let sortedLinks = [...data];
      sortedLinks = sortedLinks.sort((a, b) => {
        if (a[filters.links]) {
          return -1;
        } else {
          return 1;
        }
      });
      setData(sortedLinks);
    }
    // eslint-disable-next-line
  }, [filters]);

  return (
    <>
      <NinjaSelectWrapper>
        <NinjaLabel htmlFor="offices">Offices</NinjaLabel>
        <NinjaSelect
          name="office"
          id="offices"
          onChange={onChangeHandler}
          value={filters["office"]}
        >
          <NinjaOption value={0}>All</NinjaOption>
          <NinjaOption value="Lund">Lund</NinjaOption>
          <NinjaOption value="Stockholm">Stockholm</NinjaOption>
          <NinjaOption value="Helsingborg">Helsingborg</NinjaOption>
          <NinjaOption value="Ljubljana">Ljubljana</NinjaOption>
          <NinjaOption value="Borlänge">Borlänge</NinjaOption>
        </NinjaSelect>

        <NinjaLabel htmlFor="names">Names</NinjaLabel>
        <NinjaSelect
          id="names"
          name="names"
          onChange={onChangeHandler}
          value={filters["names"]}
        >
          <NinjaOption value={0}>-</NinjaOption>
          <NinjaOption value="ascend">A-Ö</NinjaOption>
          <NinjaOption value="decend">Ö-A</NinjaOption>
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
      </NinjaSelectWrapper>

      <AllProfilesContainer>
        {/* eslint-disable-next-line */}
        {data.map((ninja, index) => {
          // as long as index in within the range, then check if any filters are on and render out ui according to range and filters
          if (index <= indexRange.endIndex) {
            // check if office filter exists is it equal to ninja profile's office
            return (filters.office && filters.office === ninja.office) ||
              (filters.links && ninja[filters.links]) ||
              // check of no filter
              (!filters.office && !filters.links) ? (
              <NinjaCard
                ref={index === indexRange.endIndex ? lastDataElementRef : null}
                key={index}
              >
                {/* anything wrapped inside motion.div will be animated */}
                <motion.div
                  animate={{
                    scale: [1, 1, 1, 1, 1],
                    rotate: [0, 0, 100, 100, 0],
                  }}
                >
                  <NinjaProfileCard ninja={ninja} />
                </motion.div>
              </NinjaCard>
            ) : null;
          }
        })}
        {loadMore && <LoadingDiv>Loading....</LoadingDiv>}
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

const NinjaSelect = styled.select`
  border: transparent;
  padding: 7px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  outline: none;
`;

const NinjaOption = styled.option``;

const NinjaLabel = styled.label`
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  margin-left: 8px;
  margin-right: 8px;
`;

const NinjaSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  padding: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LoadingDiv = styled.div`
  font-family: "Roboto", sans-serif;
  text-align: center;
  width: 150vw;
`;
