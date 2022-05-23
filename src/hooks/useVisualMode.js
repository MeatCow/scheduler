import { useState } from 'react'

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  /**
   * Pushes a new Mode to the state stack
   * @param {*} newMode 
   * @param {boolean} replace Replace the top item instead of adding to stack
   */
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      return setHistory([...history.slice(0, -1), newMode])
    }
    setHistory(prev => [...prev, newMode]);
  }

  /**
   * Sets the mode to the previous mode 
   */
  const back = () => {
    if (history.length === 1) {
      return;
    }

    const historyCopy = [...history.slice(0, -1)];
    setHistory(historyCopy);
    setMode(historyCopy[historyCopy.length - 1])
  }

  return { mode, transition, back };
}

export { useVisualMode }