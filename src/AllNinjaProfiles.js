import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import useFetch from "./useFetch";
import { motion } from "framer-motion";

function AllNinjaProfiles() {
  // eslint-disable-next-line
  const { loading, error, data, setData } = useFetch(
    "https://api.tretton37.com/ninjas"
  );
  // states and observer related to infinite scroll
  const [loadMore, setLoadMore] = useState(false);
  const [indexRange, setIndexRange] = useState({ endIndex: 19 });
  const observer = useRef();

  // state related to filtering
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
      <FilterNinjaSelectWrapper>
        <p>Filter ninjas:</p>
        <FilterNinjaLabel htmlFor="offices">Offices</FilterNinjaLabel>
        <FilterNinjaSelect
          name="office"
          id="offices"
          onChange={onChangeHandler}
          value={filters["office"]}
        >
          <FilterNinjaOption value={0}>All</FilterNinjaOption>
          <FilterNinjaOption value="Lund">Lund</FilterNinjaOption>
          <FilterNinjaOption value="Stockholm">Stockholm</FilterNinjaOption>
          <FilterNinjaOption value="Helsingborg">Helsingborg</FilterNinjaOption>
          <FilterNinjaOption value="Ljubljana">Ljubljana</FilterNinjaOption>
          <FilterNinjaOption value="Borlänge">Borlänge</FilterNinjaOption>
        </FilterNinjaSelect>

        <FilterNinjaLabel htmlFor="names">Names</FilterNinjaLabel>
        <FilterNinjaSelect
          id="names"
          name="names"
          onChange={onChangeHandler}
          value={filters["names"]}
        >
          <FilterNinjaOption value={0}>-</FilterNinjaOption>
          <FilterNinjaOption value="ascend">A-Ö</FilterNinjaOption>
          <FilterNinjaOption value="decend">Ö-A</FilterNinjaOption>
        </FilterNinjaSelect>

        <FilterNinjaLabel htmlFor="links">Social Links</FilterNinjaLabel>
        <FilterNinjaSelect
          id="links"
          name="links"
          onChange={onChangeHandler}
          value={filters["links"]}
        >
          <FilterNinjaOption value={0}>All</FilterNinjaOption>
          <FilterNinjaOption value="gitHub">Github</FilterNinjaOption>
          <FilterNinjaOption value="twitter">Twitter</FilterNinjaOption>
          <FilterNinjaOption value="linkedIn">LinkedIn</FilterNinjaOption>
        </FilterNinjaSelect>
      </FilterNinjaSelectWrapper>

      <AllNinjaProfilesContainer>
        {/* eslint-disable-next-line */}
        {data.map((ninja, index) => {
          // as long as index in within the range, then check if any filters are on and render out ui according to range and filters
          if (index <= indexRange.endIndex) {
            // check if office filter exists and is it equal to ninja profile's office
            return (filters.office && filters.office === ninja.office) ||
              // check if links exist and then render out ui
              (filters.links && ninja[filters.links]) ||
              // check if no filter
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
      </AllNinjaProfilesContainer>
    </>
  );
}

export default AllNinjaProfiles;

const AllNinjaProfilesContainer = styled.div`
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

const FilterNinjaSelect = styled.select`
  border: transparent;
  padding: 7px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  outline: none;
`;

const FilterNinjaOption = styled.option``;

const FilterNinjaLabel = styled.label`
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  margin-left: 8px;
  margin-right: 8px;
`;

const FilterNinjaSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  padding: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    > p {
      margin-bottom: 5px;
    }
  }
`;

const LoadingDiv = styled.div`
  font-family: "Roboto", sans-serif;
  text-align: center;
  width: 150vw;
`;
