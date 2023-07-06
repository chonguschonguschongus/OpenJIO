import assets from "./assets";
import { db, auth } from "../firebase";
import { collection, getDocs} from "firebase/firestore"

const fetchEventData = async () => {
  try {
    const userUID = auth.currentUser.uid;
    const eventCollectionRef = collection(db, "events");
    const querySnapshot = await getDocs(
      query(eventCollectionRef, where("userID", "==", userUID))
    );

    const eventData = querySnapshot.docs.map((doc) => doc.data());
    console.log("hello"); // or do something else with the retrieved data

    return eventData;
  } catch (error) {
    console.log("Error fetching event data:", error);
  }
};

fetchEventData()

const UserEventData = [
  fetchEventData()
];

export { UserEventData };
