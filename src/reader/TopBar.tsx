//* - Top Bar - back - Table of content icon
//* - (DropDown - (Night Mode - Brigtness controller Slider - FontSize( Medium / large))
//* - Bookmark page

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native-web";
import React, { FunctionComponent, useEffect, useRef } from "react";
import theme from "./Assets/theme";

// //FUNCTION TO CHECK FOE PROPS UPDATE
// const propsDidUpdate = (callback: any, deps: any) => {
//   const hasMount = useRef(false);

//   useEffect(() => {
//     if (hasMount.current) {
//       callback();
//     } else {
//       hasMount.current = true;
//     }
//   }, deps);
// };

type props = {
  bg: string;
  shown: boolean;
  title: string;
  onNavPress?: any;
  onBackPress?: any;
  onBookMark?: any;
  onSettings?: any;
  onSearch?: any;
};
const Topbar: FunctionComponent<props> = ({
  bg,
  shown,
  title,
  onNavPress,
  onBackPress,
  onBookMark,
  onSettings,
  onSearch,
}) => {
  return (
    <View style={[styles.header, { backgroundColor: bg }]}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        {/* <Icon name="chevron-left" size={44} /> */}
        <Text>Left</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onNavPress}>
        {/* <Icon name="navicon" size={34} /> */}
        <Text>Nav</Text>
      </TouchableOpacity>
      {/* <Text style={styles.title}>{title}</Text> */}
      <TouchableOpacity style={styles.backButton} onPress={onBookMark}>
        {/* <Icon name="heart" size={34} /> */}
        <Text>heart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!shown}
        style={styles.backButton}
        // onPressOut={(event) => console.log('clicked', event.nativeEvent)}
        onPress={(event: any) => onSettings(event)}
      >
        {/* <Icon name="gear" size={32} /> */}
        <Text>Gear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onSearch}>
        {/* <Icon1 name="ios-search-outline" size={30} /> */}
        <Text>Seacrh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    flex: 5,
    color: "#000",
  },
  header: {
    paddingHorizontal: 5,
    right: 0,
    left: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    zIndex: 2,
  },
  backButton: {
    width: 34,
    height: 34,
    marginVertical: 20,
    marginHorizontal: 3,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
});
