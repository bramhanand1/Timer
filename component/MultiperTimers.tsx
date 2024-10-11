import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import Timer from './Timer'; 

interface TimerData {
  id: number;
  time: number;        
  initialTime: number; 
  customTime: string;   
  Running: boolean;   
}

const MultipleTimers: React.FC = () => {
  const [timers, setTimers] = useState<TimerData[]>([
    { id: 1, time: 10, initialTime: 10, customTime: '', Running: false },
    { id: 2, time: 20, initialTime: 20, customTime: '', Running: false },
    { id: 3, time: 30, initialTime: 30, customTime: '', Running: false },
    { id: 4, time: 40, initialTime: 30, customTime: '', Running: false },
    { id: 5, time: 50, initialTime: 50, customTime: '', Running: false },
  ]);

  
  useEffect(() => {
    const intervals = timers.map((timer, index) => {
      if (timer.Running && timer.time > 0) {
        return setInterval(() => {
          setTimers((prevTimers) => {
            const updatedTimers = [...prevTimers];
            if (updatedTimers[index].time > 0) {
              updatedTimers[index].time -= 1;
            }
            if (updatedTimers[index].time === 0) {
              notifyUser(updatedTimers[index].id);
            }
            return updatedTimers;
          });
        }, 1000);
      }
      return null;
    });

    return () => intervals.forEach((interval) => interval && clearInterval(interval));
  }, [timers]);

  const notifyUser = (id: number) => {
    Alert.alert(`Timer ${id} is finished !`);
  };

  // Function to update timers
  const updateTimerState = (id: number, newState: Partial<TimerData>) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => (timer.id === id ? { ...timer, ...newState } : timer))
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Multiple Timers</Text>
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          timer={timer}
          updateTimerState={updateTimerState}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default MultipleTimers;
