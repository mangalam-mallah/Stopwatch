import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

function App(): React.JSX.Element {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const countRef = useRef<NodeJS.Timeout | null>(null); // NodeJS.Timeout | null for TypeScript users

  // Start timer
  const handleStart = () => {
    if (isActive) {
      console.warn("Timer is already running");
      return;
    }
    
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  // Pause timer
  const handlePause = () => {
    if (countRef.current) {
      clearInterval(countRef.current);
      countRef.current = null; // Reset ref to null
      setIsPaused(true);
    } else {
      console.warn("No timer to pause");
    }
  };

  // Continue timer
  const handleContinue = () => {
    if (isPaused) {
      setIsPaused(false);
      countRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
  };

  // Reset timer
  const handleReset = () => {
    if (countRef.current) {
      clearInterval(countRef.current);
      countRef.current = null; // Reset ref to null
    }
    setIsPaused(false);
    setIsActive(false);
    setTimer(0);
  };

  // Format time to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatTime(timer)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleStart} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePause} style={styles.button}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 48,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default App;
