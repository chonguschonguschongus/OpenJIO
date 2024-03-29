import { View, Text, Image } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS, assets } from "../constants";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const EventTitle = ({ title, subTitle, titleSize, subTitleSize }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.Regular,
          fontSize: subTitleSize,
          color: COLORS.primary,
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
};

export const Pax = ({ persons }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source= {assets.audience}
        resizeMode="contain"
        style= {{ width: 20, height: 20, marginRight: 2 }}
      />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
        }}
      >
        {persons}
      </Text>
    </View>
  );
};

export const Rating = ({ stars }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={assets.star}
        resizeMode="contain"
        style={{ width: 20, height: 20, marginRight: 2 }}
      />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
        }}
      >
        {stars}
      </Text>
    </View>
  );
};

export const ImageCMP = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 48,
        height: 48,
        marginLeft: index === 0 ? 0 : -SIZES.font,
      }}
    />
  );
};

export const People = ({ peopleImages }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {peopleImages.map((imgUrl, index) => (
        <ImageCMP imgUrl={{ uri: imgUrl }} index={index} key={`People-${index}`} />
      ))}
    </View>
  );
};


export const EndDate = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",
        borderWidth: 0.2, // Add border width
        borderColor: COLORS.primary, // Add border color
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        Date
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        26th January
      </Text>
    </View>
  );
};

export const SubInfo = ({ eventID }) => {

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 12,
        marginTop: 0,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >

    </View>
  );
};
