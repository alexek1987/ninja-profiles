import NinjaProfileCard from "./NinjaProfileCard";
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import useFetch from "./useFetch";

function AllProfiles() {
  const { loading, error, data, setData } = useFetch(
    "https://api.tretton37.com/ninjas"
  );

  console.log(data);

  const [filters, setFilters] = useState({});

  const [loadMore, setLoadMore] = useState(false);
  const [indexRange, setIndexRange] = useState({ endIndex: 19 });
  const observer = useRef();

  const lastDataElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoadMore(true);
          setTimeout(() => {
            setIndexRange((prevState) => ({
              endIndex: prevState.endIndex + 20,
            }));
            setLoadMore(false);
          }, 2000);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadMore]
  );

  // handler for all states regarding filtering
  const onChangeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (value === "0") {
      value = Number(value);
    }
    // setFilters({ ...filters, [name]: value });
    setFilters({ [name]: value });
    console.log(filters);
  };

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
        {data.map((ninja, index) => {
          if (index <= indexRange.endIndex) {
            return (filters.office && filters.office === ninja.office) ||
              (filters.links && ninja[filters.links]) ||
              (!filters.office && !filters.links) ? (
              <NinjaCard
                ref={index === indexRange.endIndex ? lastDataElementRef : null}
                key={index}
              >
                <NinjaProfileCard ninja={ninja} />
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
