import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

interface PosterProps {
  path: string;
}
const PosterView = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  margin-left: 30px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <PosterView source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
