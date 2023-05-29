import { useState } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";

import { COLORS, EventData } from "../constants";
import { EventCard, HomeHeader, FocusedStatusBar } from "../components";

const Home = () => {
  const [eventData, setEventData] = useState(EventData);

  const handleSearch = (value) => {
    if (!value.length) return setEventData(EventData);

    const filteredData = EventData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length) {
      setEventData(filteredData);
    } else {
      setEventData(EventData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={eventData}
            renderItem={({ item }) => <EventCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }}></View>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
