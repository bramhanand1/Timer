import React from 'react';
import { View,
     Text,
      Button,
       Alert, 
       TextInput,
        StyleSheet, 
        ScrollView } from 'react-native';

interface TimerProps {
  timer: {
    id: number;
    time: number;
    customTime: string;
    Running: boolean;
  };
  updateTimerState: (id: number, newState: Partial<typeof timer>) => void;
}

const Timer: React.FC<TimerProps> = ({ timer, updateTimerState }) => {
  const { id, time, customTime, Running } = timer;

  const startTimer = () => {
    if (time > 0) updateTimerState(id, { Running: true });
  };

  const pauseTimer = () => {
    updateTimerState(id, { Running: false });
  };

  const resetTimer = () => {
    updateTimerState(id, { time: 60, Running: false }); 
  };

  const handleSetCustomTime = () => {
    const newTime = parseInt(customTime);
    if (!isNaN(newTime) && newTime > 0) {
      updateTimerState(id, { time: newTime, isRunning: false, customTime: '' });
    }
  };

  return (
    
    <View style={styles.timerContainer}>
      <Text style={styles.timerTitle}>Timer {id}</Text>
      <Text style={styles.timerText}>{time} seconds remaining</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter custom time (seconds)"
        keyboardType="numeric"
        value={customTime}
        onChangeText={(value) => updateTimerState(id, { customTime: value })}
      />
      <Button title="Set" onPress={handleSetCustomTime} />

      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} color="red"/>
        <Button title="Pause" onPress={pauseTimer} color="red"/>
        <Button title="Reset" onPress={resetTimer} color="red"/>
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    color:'green'
  },
});

export default Timer;
