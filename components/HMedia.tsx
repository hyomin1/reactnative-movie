import Poster from "./Poster";
import React from "react";
import styled from "styled-components/native";

interface HMediaProps {
  poster_path: string;
  original_title: string;
  release_date: string;
  overview: string;
}
const HMovie = styled.View`
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  original_title,
  release_date,
  overview,
}) => {
  return (
    <HMovie>
      <Poster path={poster_path} />
      <HColumn>
        <Title>{original_title}</Title>
        <Release>
          {new Date(release_date).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
        <Overview>
          {overview !== "" && overview.length > 13
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;
