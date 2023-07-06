import assets from "./assets";
import { db, auth } from "../firebase";
import { collection, doc, getDocs} from "firebase/firestore"

const fetchEventData = async () => {
  try {
    const eventCollectionRef = collection(db, "events");
    const eventSnapshot = await getDocs(eventCollectionRef);

    const eventData = eventSnapshot.docs.map((doc) => doc.data());
    console.log(eventData); // or do something else with the retrieved data

    return eventData;
  } catch (error) {
    console.log("Error fetching event data:", error);
  }
};

fetchEventData()

const EventData = [
  fetchEventData()
];

export { EventData };
