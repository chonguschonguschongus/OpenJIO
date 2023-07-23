import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  RefreshControl
} from "react-native";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { COLORS, SIZES, assets, SHADOWS, FONTS, EventData } from "../constants";
import {
  CircleButton,
  RectButton,
  SubInfo,
  DetailsDesc,
  DetailsBid,
  FocusedStatusBar,
} from "../components";
import { useState, useEffect, useMemo } from "react";

const DetailsHeader = ({ data, navigation }) => (
  <View style={{ width: "100%", height: 373 }}>
    <Image
      source={{ uri: data.image }}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    <CircleButton
      imgUrl={assets.heart}
      right={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
);

const Details = ({ route, navigation }) => {
  const { data } = route.params;
  const [eventData, setEventData] = useState(EventData);
  const [refreshing, setRefreshing] = useState(false);
  const [userJoinedEvent, setUserJoinedEvent] = useState(false);
  const [requiredPeopleCount, setRequiredPeopleCount] = useState(0);
  const [isCreator, setIsCreator] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    getRequiredPeopleCount(data.id);
    try {
      await retrieveEventDataFromFirestore();
    } catch (error) {
      console.log("Error refreshing event data:", error);
    }
    setRefreshing(false);
  };

  const getRequiredPeopleCount = async (eventId) => {
    try {
      const docRef = doc(db, "Event", eventId);
      const eventDocSnapshot = await getDoc(docRef);

      if (eventDocSnapshot.exists()) {
        const eventData = eventDocSnapshot.data();
        // Assuming that the required number of people is stored as 'requiredPeople' in the document
        const requiredPeople = eventData.persons || 0;
        setRequiredPeopleCount(requiredPeople);
      }
    } catch (error) {
      console.log("Error fetching required people count:", error);
    }
  };

  useEffect(() => {
    // Check if the current user has joined the event
    const currentUser = auth.currentUser;
    const joined = data.bids?.some((bid) => bid.id === currentUser.uid);
    setUserJoinedEvent(joined);

    setIsCreator(data.userID === currentUser.uid);

    retrieveEventDataFromFirestore();
    getRequiredPeopleCount(data.id);
  }, [data]);

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

  const handleMakeBid = async () => {
    try {
      const currentUser = auth.currentUser;
      const userDocRef = doc(db, "Users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const username = userData.username;
        const dp = userData.dp;
        const currentDate = new Date();
        const userBid = {
          id: currentUser.uid,
          name: username,
          ratings: 0,
          image: dp,
          date: currentDate.toLocaleDateString(),
        };

        const docRef = doc(db, "Event", data.id);

        const eventDocSnapshot = await getDoc(docRef);
        if (eventDocSnapshot.exists()) {
          const eventData = eventDocSnapshot.data();
          const updatedBids = eventData.bids || [];

          if (updatedBids.length >= requiredPeopleCount) {
            console.log("No more available slots to join the bid.");
            return;
          }

          const existingBidIndex = updatedBids.findIndex(
            (bid) => bid.id === currentUser.uid
          );

          if (existingBidIndex === -1) {
            updatedBids.push(userBid);
          } else {
            updatedBids[existingBidIndex] = userBid;
          }

          await updateDoc(docRef, { bids: updatedBids });
          console.log("Bid added/updated successfully");
          await retrieveEventDataFromFirestore();
          setUserJoinedEvent(true);
        }
      }
    } catch (error) {
      console.log("Error making/updating bid:", error);
    }
  };

  const handleQuitEvent = async () => {
    try {
      const currentUser = auth.currentUser;
      const docRef = doc(db, "Event", data.id);
      const eventDocSnapshot = await getDoc(docRef);

      if (eventDocSnapshot.exists()) {
        const eventData = eventDocSnapshot.data();
        const updatedBids = eventData.bids?.filter(
          (bid) => bid.id !== currentUser.uid
        );

        await updateDoc(docRef, { bids: updatedBids });
        await retrieveEventDataFromFirestore();
        console.log("User quit the event successfully");
        setUserJoinedEvent(false); // Update the state to indicate that the user has quit the event
      }
    } catch (error) {
      console.log("Error quitting the event:", error);
    }
  };

  // Compute if the event is full based on the current data
  const isFull = useMemo(() => {
    return data.bids && data.bids.length >= requiredPeopleCount;
  }, [data.bids, requiredPeopleCount]);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 10,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
       {isCreator ? ( // Render the "Edit Event" button for the creator
    <RectButton
      text={"Edit Event"}
      minWidth={170}
      handlePress={() => navigation.navigate("Edit", { event : data })}
      fontSize={SIZES.large}
      {...SHADOWS.dark}
    />
      ) : userJoinedEvent ? ( // Render the "Quit Jio" button for joined users
        <RectButton
          text={"Quit Jio"}
          minWidth={170}
          handlePress={handleQuitEvent}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
        />
      ) : isFull ? 
        <RectButton
          text={"More Event"}
          minWidth={170}
          handlePress={handleMakeBid}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
        /> : ( // Render the "Join Jio" button for non-joined users
        <RectButton
          text={"Join Jio"}
          minWidth={170}
          handlePress={handleMakeBid}
          fontSize={SIZES.large}
          bottom = '10'
          {...SHADOWS.dark}
        />
      )}
      </View>

<FlatList
  data={eventData.find(event => event.id === data.id)?.bids || []} // Use an empty array if bids is undefined
  renderItem={({ item }) => <DetailsBid bid={item} />}
  keyExtractor={(item) => item.id}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: SIZES.extraLarge * 3,
  }}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  }
  ListHeaderComponent={() => (
    <React.Fragment>
      <DetailsHeader data={data} navigation={navigation} />
      <SubInfo eventID={data.id} />
      <View style={{ padding: SIZES.font }}>
        <DetailsDesc data={data} />

        {data.bids && data.bids.length > 0 ? (
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.semiBold,
              color: COLORS.primary,
            }}
          >
            People
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.semiBold,
              color: COLORS.primary,
              textAlign: 'center',
            }}
          >
            
            {userJoinedEvent ? 'You joined the jio.' : 'Join the jio now.'}
          </Text>
        )}
        
      </View>
      
    </React.Fragment>
  )}
/>
      
    </SafeAreaView>
  );
};

export default Details;
