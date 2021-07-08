import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { DATA } from "../data";
import { THEME } from "../theme";
import { toggleBooked } from "../store/actions/post";

export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const postId = navigation.getParam("postId");

  const post = DATA.find((p) => p.id === postId);

  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === postId)
  );

  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  const removeHandler = () => {
    Alert.alert(
      "Post remove",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Remove", style: "destructive", onPress: () => {} },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title='Delete'
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam("date");
  const booked = navigation.getParam("booked");
  const toggleHandler = navigation.getParam("toggleHandler");
  const iconName = booked ? "ios-star" : "ios-star-outline";
  return {
    headerTitle: "Post date is " + new Date(date).toLocaleDateString(),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Take photo' iconName={iconName} onPress={toggleHandler} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: "open-regular",
  },
});
