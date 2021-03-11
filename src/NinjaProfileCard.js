import { useState } from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import styled from "styled-components";
import placeholder from "./assets/placeholder.png";

function NinjaProfileCard({ ninja }) {
  const [loading, setLoading] = useState(true);
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
      {loading && <div>Loading...</div>}

      {failed ? (
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
            <SocialLink href={`https://github.com/${ninja.linkedIn}`}>
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
  max-width: 270px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;

  > img {
    height: 250px;
    width: 100%;
    margin-top: 12px;
    object-fit: contain;
  }
`;

const NinjaProfileCardInfo = styled.div`
  > h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }

  > p {
    font-size: 12px;
    opacity: 0.7;
    margin: 0;
  }
`;

const NinjaProfileProfileInfo = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
`;

const NinjaImage = styled.img``;

const NinjaSocialIcons = styled.div`
  .MuiSvgIcon-root:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const PlaceHolderImage = styled.img`
  max-height: 230px;
`;

const SocialLink = styled.a``;
