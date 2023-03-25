import React from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

interface HListProps {
  title: string;
  data: any[];
}
const ListContainer = styled.View`
  margin-bottom: 20px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 10px;
`;

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <VMedia
            poster_path={item.poster_path}
            original_title={item.original_title ?? item.original_name}
            vote_average={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
