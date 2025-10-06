import { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currenctCourseGoals) => [
      ...currenctCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currenctCourseGoals) => {
      return currenctCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandler() {
    setModalVisible(true);
  }

  function endAddGoalHandler() {
    setModalVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
        <View style={styles.appContainer}>
          <Button title="Add new Goal" onPress={startAddGoalHandler} />
          <GoalInput
            visible={modalVisible}
            onAddGoal={addGoalHandler}
            onCancel={endAddGoalHandler}
          />
          <View style={styles.goalsContainer}>
            <FlatList
              data={courseGoals}
              renderItem={(itemData) => {
                // console.log(itemData);
                return (
                  <GoalItem
                    text={itemData.item.text}
                    id={itemData.item.id}
                    onDeleteItem={deleteGoalHandler}
                  />
                );
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
            />
          </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
