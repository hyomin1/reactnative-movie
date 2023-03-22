import { NativeStackScreenProps } from "@react-navigation/native-stack";

import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;
const VSeperator = styled.View``;
const HSeperator = styled.View`
  margin-bottom: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    "nowPlaying",
    moviesApi.getNowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    "upcoming",
    moviesApi.getUpcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    "trending",
    moviesApi.getTrending
  );
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const onRefresh = async () => {};
  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );
  const renderHMeida = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      overview={item.overview}
      release_date={item.release_date}
    />
  );
  const movieKeyExtractor = (item) => item.id + "";

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            showsPagination={false}
            autoplay={true}
            autoplayTimeout={3.5}
            style={{ marginBottom: 20 }}
            containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.origianl_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData.results}
              renderItem={renderVMedia}
              keyExtractor={movieKeyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={VSeperator}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMeida}
      ItemSeparatorComponent={HSeperator}
    />
  );
};

export default Movies;
