import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const FocusedStatusBar = (props) => {
  const isFocused = useIsFocused();

  if (isFocused) {
    return <StatusBar animated={true} {...props} />;
  } else {
    null;
  }
};

export default FocusedStatusBar;
