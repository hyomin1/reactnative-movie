import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { TouchableOpacity } from "react-native";

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
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={poster_path} />
        <Title>
          {original_title.slice(0, 13)}
          {original_title.length > 13 ? "..." : null}
        </Title>
        <Votes votes={vote_average} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
