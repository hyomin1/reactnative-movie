import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaProps {
  poster_path: string;
  original_title: string;
  vote_average: number;
}

const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  margin-left: 20px;
`;

const VMedia: React.FC<VMediaProps> = ({
  poster_path,
  original_title,
  vote_average,
}) => {
  return (
    <Movie>
      <Poster path={poster_path} />
      <Title>
        {original_title.slice(0, 13)}
        {original_title.length > 13 ? "..." : null}
      </Title>
      <Votes votes={vote_average} />
    </Movie>
  );
};

export default VMedia;
