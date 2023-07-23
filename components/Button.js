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

export const UploadButton = ({ 
  imgUrl, 
  handlePress, 
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        height: 200,
        backgroundColor: COLORS.white,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,  // Add border width
        borderColor: COLORS.primary,  // Add border color
        ...props,
      }}
      onPress={handlePress}
    >
     <Image
        style={{
          width: 140, // Adjust the width and height of the image to fit inside the circle
          height: 140,
          borderRadius: 0, // Half of the width/height to make the image circular
        }}
        source={imgUrl}
        resizeMode="contain" // Use "cover" to fill the entire circle with the image
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
        padding: 3,
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

