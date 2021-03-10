import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import styled from "styled-components";

function NinjaProfileCard({ ninja, index }) {
  return (
    <NinjaProfileCardContainer>
      <img src={ninja.imagePortraitUrl} />
      <NinjaProfileProfileInfo>
        <NinjaProfileCarText>
          <h2>{ninja.name}</h2>
          <p>Office: {ninja.office}</p>
        </NinjaProfileCarText>
        <NinjaSocialIcons>
          <LinkedInIcon />
          <GitHubIcon />
          <TwitterIcon />
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

  > img {
    height: 250px;
    width: 100%;
    margin-top: 10px;
    object-fit: contain;
  }
`;

const NinjaProfileCarText = styled.div`
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

const NinjaSocialIcons = styled.div``;
