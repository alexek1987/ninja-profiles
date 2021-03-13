import { useState } from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import styled from "styled-components";
import placeholder from "./assets/placeholder.jpg";

function NinjaProfileCard({ ninja }) {
  const [loading, setLoading] = useState(ninja.imagePortraitUrl ? true : false);
  const [failed, setFailed] = useState(false);

  const onLoadHandler = () => {
    setLoading(false);
  };

  const onErrorHandler = () => {
    setFailed(true);
    setLoading(false);
  };

  return (
    <NinjaProfileCardContainer>
      {loading && <LoadingDiv>Loading...</LoadingDiv>}

      {failed || !ninja.imagePortraitUrl ? (
        <PlaceHolderImage src={placeholder} />
      ) : (
        <NinjaImage
          onLoad={onLoadHandler}
          onError={onErrorHandler}
          src={ninja.imagePortraitUrl}
        />
      )}
      <NinjaProfileProfileInfo>
        <NinjaProfileCardInfo>
          <h2>{ninja.name}</h2>
          <p>Office: {ninja.office}</p>
        </NinjaProfileCardInfo>
        <NinjaSocialIcons>
          {ninja.linkedIn && (
            <SocialLink href={`https://www.linkedin.com/${ninja.linkedIn}`}>
              <LinkedInIcon />
            </SocialLink>
          )}
          {ninja.gitHub && (
            <SocialLink href={`https://github.com/${ninja.gitHub}`}>
              <GitHubIcon />
            </SocialLink>
          )}
          {ninja.twitter && (
            <SocialLink href={`https://twitter.com/${ninja.twitter}`}>
              <TwitterIcon />
            </SocialLink>
          )}
        </NinjaSocialIcons>
      </NinjaProfileProfileInfo>
    </NinjaProfileCardContainer>
  );
}

export default NinjaProfileCard;

const NinjaProfileCardContainer = styled.div`
  overflow: hidden;
  background: #fbfbfd;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  min-width: 250px;
  margin-left: 7px;
  margin-right: 7px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
`;

const NinjaProfileCardInfo = styled.div`
  > h2 {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    font-family: "Roboto", sans-serif;
  }

  > p {
    font-size: 12px;
    opacity: 0.7;
    margin: 0;
    font-family: "Roboto", sans-serif;
  }
`;

const NinjaProfileProfileInfo = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
`;

const NinjaImage = styled.img`
  height: 250px;
  width: 100%;
  margin-top: 12px;
  object-fit: contain;
`;

const NinjaSocialIcons = styled.div`
  .MuiSvgIcon-root:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const PlaceHolderImage = styled.img`
  height: 250px;
  width: 90%;
  margin-top: 12px;
  margin-left: 5%;
`;

const SocialLink = styled.a``;

const LoadingDiv = styled.div`
  font-family: "Roboto", sans-serif;
  text-align: center;
`;
