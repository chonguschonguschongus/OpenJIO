import { View, Text } from "react-native";
import { useState } from "react";

import { Pax, EventTitle } from "./SubInfo";

import { COLORS, SIZES, FONTS } from "../constants";

const DetailsDesc = ({ data }) => {
  const [text, setText] = useState(data.description.slice(0, 100));
  const [readMore, setReadMore] = useState(false);
  const eventDate = data.EndDate ? data.EndDate.toDate().toLocaleDateString() : '';

  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EventTitle
          title={data.name}
          subTitle={"Creator : " + data.creator}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />

        <Pax persons={data.persons} />
      </View>

      <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
        <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          Description
        </Text>

        <View style={{ marginTop: SIZES.base }}>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.regular,
              color: COLORS.secondary,
              lineHeight: SIZES.large,
            }}
          >
            {text}
            {!readMore && "..."}
            <Text
              onPress={() => {
                if (!readMore) {
                  setText(data.description);
                  setReadMore(true);
                } else {
                  setText(data.description.slice(0, 50));
                  setReadMore(false);
                }
              }}
              style={{
                fontSize: SIZES.small,
                fontFamily: FONTS.semiBold,
                color: COLORS.primary,
              }}
            >
              {readMore ? "  Show less" : "Read more"}
            </Text>
          </Text>
        </View>

        <View style={{ marginTop: 25 }}>
          <Text
            style={{
              fontSize: SIZES.font,
              fontFamily: FONTS.semiBold,
              color: COLORS.primary,
            }}
          >
            Date
          </Text>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.regular,
              color: COLORS.secondary,
              lineHeight: SIZES.large,
            }}
          >
            {eventDate} {/* Display the formatted event date */}
          </Text>
        </View>
      </View>
    </>
  );
};

export default DetailsDesc;