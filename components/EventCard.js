import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { CircleButton, RectButton } from "./Button";
import { SubInfo, Pax, EventTitle } from "./SubInfo";
import { db, auth } from "../firebase";
import { getDoc, updateDoc,doc } from "firebase/firestore";

const EventCard = ({ data }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = auth.currentUser; // Get the currently authenticated user

  const toggleFavorite = async () => {
    if (!currentUser) {
      // User is not authenticated, handle this case (e.g., prompt to log in)
      return;
    }
  
    try {
      const userDocRef = doc(db, "Users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const favorites = userData.favorites || [];
  
        if (favorites.includes(data.id)) {
          // Event is already a favorite, remove it from favorites
          const updatedFavorites = favorites.filter((eventId) => eventId !== data.id);
          await updateDoc(userDocRef, { favorites: updatedFavorites });
          setIsFavorite(false);
        } else {
          // Event is not a favorite, add it to favorites
          const updatedFavorites = [...favorites, data.id];
          await updateDoc(userDocRef, { favorites: updatedFavorites });
          setIsFavorite(true);
        }
      }
    } catch (error) {
      // Handle the error here (e.g., show an error message to the user)
      console.error("Error toggling favorite:", error);
    }
  };


  return (
    <View
      key={data.id}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View style={{ width: "100%", height: 250 }}>
        <Image
          source={{ uri: data.image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />

        <CircleButton imgUrl={assets.filled} right={10} top={10} handlePress={toggleFavorite}/>

      </View>

      <SubInfo eventID={data.id} />

      <View style={{ width: "100%", padding: SIZES.font }}>
        <EventTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pax persons={data.persons} />
          
          <RectButton
            text={"Learn more"}
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("Details", { data })}
          />
        </View>
      </View>
    </View>
  );
};

export default EventCard;