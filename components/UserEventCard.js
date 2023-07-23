import { Alert, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { CircleButton, RectButton } from "./Button";
import { SubInfo, Pax, EventTitle } from "./SubInfo";
import { db, auth } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";

const UserEventCard = ({ data }) => {
  const navigation = useNavigation();
  const deleteEvent = async (eventId) => {
    try {
      const eventRef = doc(db, "Event", eventId);
      await deleteDoc(eventRef);
      console.log("Event deleted successfully");
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
    <TouchableOpacity
      onPress={() => {navigation.navigate("Details", { data })
        console.log("UserEventCard pressed");
      }}
    >
      
   <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      
      <View style={{ width: "100%", height: 15 }}>
        
      </View>

      <SubInfo eventID={data.id} />

      <View style={{ width: "100%", padding: SIZES.font }}>
        <EventTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
          titleStyle={{ marginLeft: 10 }}
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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: SIZES.base }}>
            <CircleButton
              imgUrl={assets.deleteIcon}
              handlePress={() => confirmDelete(data.id)}
              right={40}
              bottom = {-11}
            />
            </View>

            <View style={{ marginRight: 5 }}>
            <CircleButton
              imgUrl={assets.edit}
              handlePress={() => navigation.navigate("Edit", { event : data })}
              right={-5}
              bottom = {-10}
            />
           
            </View>

          </View>
        </View>
      </View>
    </View>
   
    </TouchableOpacity>
  );
};

export default UserEventCard;