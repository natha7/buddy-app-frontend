import { ScrollView, View, Text } from "react-native";
import { useState, useEffect } from "react";
import JournalEntryCard from "./JournalEntryCard";
import AddEntryBtn from "./AddEntryBtn";
import DeletePlantBtn from "./DeletePlantBtn";
import useUser from "../hooks/useUser";

export default function JournalSection(props) {
  const { gardenPlant } = props;
  const gardenPlantId = gardenPlant.garden_plant_id;
  const [entries, setEntries] = useState(gardenPlant.journal_entries);
  const [journalEntries, setJournalEntries] = useState([]);
  const userId = useUser();

  useEffect(() => {
    if (entries.length === 0) {
      setJournalEntries(() => {
        return [];
      });
    }
    setJournalEntries(() => {
      const sortedEntries = entries.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (b.date < a.date) return 1;
        else return 0;
      });
      return sortedEntries;
    });
  }, [entries]);

  return (
    <View style={{ height: 400, width: "auto" }}>
      <Text>Journal:</Text>
      <ScrollView>
        {journalEntries.length > 0 ? (
          journalEntries.map((entry) => {
            return <JournalEntryCard key={entry._id} entry={entry} />;
          })
        ) : (
          <View
            style={{
              display: "flex",
              backgroundColor: "#78A55A33",
              borderRadius: 20,
              height: 100,
              width: 330,
              margin: "auto",
              marginTop: 10,
            }}>
            <View style={{ margin: "auto" }}>
              <Text>No journal entries yet.</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <DeletePlantBtn userAndPlantId={{ userId, gardenPlantId }} plantInfo={gardenPlant} />
        <AddEntryBtn plantId={gardenPlant.garden_plant_id} setEntries={setEntries} />
      </View>
    </View>
  );
}
