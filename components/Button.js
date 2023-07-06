import { TouchableOpacity, Image, View, Text } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants";

export const CircleButton = ({ 
  imgUrl, 
  handlePress, 
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,  // Add border width
        borderColor: COLORS.primary,  // Add border color
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        style={{ width: 24, height: 24 }}
        source={imgUrl}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
export const BarButton = ({ imgUrl, handlePress, ...props }) => {
  const { isSelected = false } = props;

  const containerStyles = {
    borderWidth: 1,
    borderColor: isSelected ? "dodgerblue" : "grey",
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        style={{ width: 40, height: 40 }}
        source={imgUrl}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export const RectButton = ({
  text,
  minWidth,
  fontSize,
  handlePress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        padding: SIZES.small,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: 20,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const TransButton = ({
  text,
  minWidth,
  fontSize,
  handlePress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#FFF",
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        padding: SIZES.small,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: 20,
          color: "#728bd4",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

