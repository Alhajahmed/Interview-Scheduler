import { useState } from "react";

export default function useVisualMode(initial) {
  // Initialize the history state with the initial mode
  const [history, setHistory] = useState([initial]);

  // Get the current mode from the history array
  const mode = history[history.length - 1];

  // Function to transition to a new mode, with an option to replace the current mode
  const transition = (newMode, replace = false) => {
    if (replace) {
      // Replace the last mode in history with the new mode
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      // Add the new mode to the history
      setHistory(prev => [...prev, newMode]);
    }
  };

  // Function to go back to the previous mode in history
  const back = () => {
    if (history.length > 1) {
      // Remove the last mode from history
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  };

  // Return the current mode and functions for transitioning and going back
  return { mode, transition, back };
}