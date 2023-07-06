import { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, FlatList, RefreshControl, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, EventData, assets } from "../constants";
import { EventCard, HomeHeader, FocusedStatusBar, NavigationBar} from "../components";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const [eventData, setEventData] = useState(EventData);
  const [pageRefreshing, setPageRefreshing] = useState(false);

  useEffect(() => {
    retrieveEventDataFromFirestore();
  }, []);

  const handleRefresh = () => {
    setPageRefreshing(true);
    retrieveEventDataFromFirestore();
    setPageRefreshing(false);
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

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.noEventDataText}>No events found.</Text>
    </View>
  );

  const handleSearch = (value) => {
    // Filter the retrieved event data based on the search value
    const filteredData = eventData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setEventData(filteredData);
  };

  return (
    <View style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
  
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={pageRefreshing}
            onRefresh={handleRefresh}
            progressViewOffset={100} // Change the trigger point here (e.g., 100)
          />
        }
      >
        <LinearGradient
          colors={["#F5F5F5", "#ECECEC"]} // Gradient colors (start to end)
          start={[0, 150]} // Gradient start point (x, y)
          end={[200, 200]} // Gradient end point (x, y)
          style={styles.headerContainer}
        >
          <HomeHeader onSearch={handleSearch} />
        </LinearGradient>
        
  
        <View style={styles.cardContainer}>
          {eventData.length > 0 ? (
            eventData.map((item) => <EventCard key={item.id} data={item} />)
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.noEventDataText}>No events found.</Text>
            </View>
          )}
        </View>
  
        <View style={styles.backgroundContainer}>
          <View style={styles.backgroundSection}></View>
          <View style={styles.backgroundSection}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  noEventDataText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  backgroundContainer: {
    paddingHorizontal: 16,
  },
  backgroundSection: {
    height: 100,
    backgroundColor: COLORS.primary,
    marginBottom: 16,
  },
});

export default Home;