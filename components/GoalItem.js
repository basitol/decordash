import {View, Text, StyleSheet, Pressable} from 'react-native';

const GoalItem = ({text, id, onDeleteItem}) => {
  //   const deleteGoalHandler = () => {
  //     onDeleteItem(itemData.item);
  //   };

  return (
    <Pressable
      //   android_ripple={{ color: "red" }}
      //   onPress={onDeleteItem.bind(this, id)}
      style={({pressed}) => pressed && styles.pressedItem}>
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    // margin: 8,
    marginTop: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    color: 'white',
  },
  goalText: {
    padding: 8,
    color: 'white',
    fontFamily: 'bold',
  },
  pressedItem: {
    opacity: 0.5,
  },
});
