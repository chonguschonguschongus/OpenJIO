import { useState, useEffect } from "react";
import { Text, View, SafeAreaView, FlatList, RefreshControl, StyleSheet } from "react-native";

import { COLORS, EventData, assets } from "../constants";
import { EventCard, HomeHeader, FocusedStatusBar, NavigationBar} from "../components";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { BarButton } from "../components/Button";

const Home = () => {
  const [eventData, setEventData] = useState(EventData);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    retrieveEventDataFromFirestore();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    retrieveEventDataFromFirestore();
    setRefreshing(false);
  };

  const retrieveEventDataFromFirestore = async () => {
    try {
      const eventCollectionRef = collection(db, "Event");
      const eventSnapshot = await getDocs(eventCollectionRef);

      const retrievedEventData = eventSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventData(retrievedEventData);
    } catch (error) {
      console.log("Error retrieving event data from Firestore:", error);
    }
  };

 const handleSearch = (value) => {
    // Filter the retrieved event data based on the search value
    const filteredData = eventData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setEventData(filteredData);
  };

  return (
    <SafeAreaView 
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 1 }}>
        <FlatList
            data={eventData}
            renderItem={({ item }) => <EventCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
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
          <View style={{ flex: 1, backgroundColor: COLORS.primary }}></View>
        </View>
        
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            bottom: 7,
            zIndex: 1,
          }}
        >
          <View style={styles.NavBar}>
            <BarButton
              imgUrl={assets.home}
              handlePress={() => navigation.navigate("Home")}
              style={styles.IconBehaviour}
            />
            <BarButton imgUrl={assets.liked} style={styles.IconBehaviour} />
            <BarButton
              imgUrl={assets.newactivity}
              style={styles.IconBehaviour}
            />
            <BarButton imgUrl={assets.profile} style={styles.IconBehaviour} />
            <BarButton imgUrl={assets.settings} style={styles.IconBehaviour} />
          </View>
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  NavBar: {
    flexDirection: "row",
    backgroundColor: "#eee",
    width: "100%",
    justifyContent: "space-evenly",
    borderRadius: 40,
  },

  IconBehaviour: {
    padding: 14,
  },
});

export default Home;
