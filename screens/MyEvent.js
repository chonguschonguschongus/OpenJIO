import { useState, useEffect } from "react";
import { Text, View, Alert, FlatList, RefreshControl, StyleSheet } from "react-native";
import { COLORS, UserEventData, assets } from "../constants";
import { FocusedStatusBar} from "../components";
import { db , auth} from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import UserEventCard from "../components/UserEventCard";

const MyEvent = () => {
  const [userEventData, setEventData] = useState(UserEventData);
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
      const userUID = auth.currentUser.uid;
      const eventCollectionRef = collection(db, "Event");
      const querySnapshot = await getDocs(
        query(eventCollectionRef, where("userID", "==", userUID))
      );
  
      const retrievedEventData = querySnapshot.docs.map((doc) => ({
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
      <Text style={styles.emptyText}>No events found.</Text>
    </View>
  );

  const deleteEvent = async (eventId) => {
    try {
      const eventRef = doc(db, "Event", eventId);
      await deleteDoc(eventRef);
      console.log("Event deleted successfully");
      retrieveEventDataFromFirestore();
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  const confirmDelete = (eventId) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteEvent(eventId) },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
  <FocusedStatusBar background={COLORS.primary} />
  
  <View style={{ zIndex: 1 }}>
    <View style={styles.headerContainer}>
       <Text style={styles.headerText}>My Event</Text>
    </View>
    <View style={styles.headerContainer}></View>

    <FlatList
      data={userEventData}
      renderItem={({ item }) => <UserEventCard data={item} />}
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

export default MyEvent;
