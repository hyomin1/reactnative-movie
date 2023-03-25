import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi } from "../api";
import HList from "../components/HList";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
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
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(
    ["movies", "nowPlaying"],
    moviesApi.getNowPlaying
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.getUpcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.getTrending);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const onRefresh = async () => {
    //refetchNowPlaying();
    //refetchUpcoming();
    //refetchTrending();
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path || ""}
                poster_path={movie.poster_path || ""}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <HMedia
          poster_path={item.poster_path || ""}
          original_title={item.original_title}
          overview={item.overview}
          release_date={item.release_date}
        />
      )}
      ItemSeparatorComponent={HSeperator}
    />
  ) : null;
};

export default Movies;
