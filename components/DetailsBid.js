import { View, Text, Image } from "react-native";
import { Rating } from "./SubInfo";
import { COLORS, SIZES, FONTS } from "../constants";

const DetailsBid = ({ bid }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SIZES.base,
        marginVertical: SIZES.base,
      }}
    >
      <Image
        source={{uri: bid.image}}
        resizeMode="contain"
        style={{ width: 48, height: 68 }}
      />

      <View>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: COLORS.primary,
          }}
        >
          {bid.name} is joining this Jio
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.secondary,
            marginTop: 3,
          }}
        >
          {bid.date}
        </Text>
      </View>

      <Rating stars={bid.ratings} />
    </View>
  );
};

export default DetailsBid;
