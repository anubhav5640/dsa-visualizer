// generateArray.js
// Generates an array of random numbers for sorting visualization
// Each element is an OBJECT (not just a number) because we need to store
// both the VALUE and the COLOR STATE of each bar

// size = how many bars to generate
// min/max = range of random values
const generateArray = (size = 40, min = 10, max = 100) => {
  
  // Array.from({ length: size }) creates an empty array with "size" slots
  // The second argument is a function that fills each slot
  // We ignore the first argument (_) — it's the element value (undefined here)
  // We use the index (i) to give each bar a unique id
  return Array.from({ length: size }, (_, i) => ({
    id: i,           // unique identifier — React needs this for the "key" prop
    value: Math.floor(Math.random() * (max - min + 1)) + min,  // random number between min and max
    color: 'blue',   // default color — will change during sorting (blue/amber/red/green/purple)
  }))
}

export default generateArray