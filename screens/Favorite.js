import { useState, useEffect } from "react";
import { Text, View, Alert, FlatList, RefreshControl, StyleSheet } from "react-native";
import { COLORS, EventData, assets } from "../constants";
import { FocusedStatusBar} from "../components";
import { db , auth} from "../firebase";
import {  doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import EventCard from "../components/EventCard";

const Favorite = () => {
  const [eventData, setEventData] = useState(EventData);
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = auth.currentUser;

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
      if (!currentUser) {
        return; // User not authenticated, handle this case
      }
  
      const userDocRef = doc(db, "Users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const favoriteEventIds = userData.favorites || [];
  
        // Check if the favoriteEventIds array is not empty before executing the query
        if (favoriteEventIds.length === 0) {
          // No favorite events, set the eventData state to an empty array
          setEventData([]);
        } else {
          // Retrieve favorite events based on the list of favoriteEventIds
          const eventCollectionRef = collection(db, "Event");
          const querySnapshot = await getDocs(
            query(eventCollectionRef, where("__name__", "in", favoriteEventIds))
          );
  
          const retrievedEventData = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Use the auto-generated ID of the event as the ID
            ...doc.data(),
          }));
  
          setEventData(retrievedEventData);
        }
      }
    } catch (error) {
      console.log("Error retrieving event data from Firestore:", error);
    }
  };
  

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No events found.</Text>
    </View>
  );

  const ListFooterComponent = () => <View style={{ height: 50 }} />;

  return (
    <View style={{ flex: 1 }}>
  <FocusedStatusBar background={COLORS.primary} />
  
  <View style={{ zIndex: 1 }}>
    <View style={styles.headerContainer}>
       <Text style={styles.headerText}>Favorite Event</Text>
    </View>
    <View style={styles.headerContainer}></View>

    <FlatList
      data={eventData}
      renderItem={({ item }) => <EventCard data={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ alignItems: 'center'}}>
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={renderEmptyList}
      ListFooterComponent={ListFooterComponent}
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
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 30, // Add margin top to create spacing
  },
  headerText: {
    fontSize: 45,
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.gray,
  },
  IconBehaviour: {
    padding: 14,
  },
});

export default Favorite;
