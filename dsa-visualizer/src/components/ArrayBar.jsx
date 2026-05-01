// ArrayBar.jsx
// This is ONE single bar in the chart
// It receives its height (value) and color as props
// The parent component (SortingPage) controls these props during animation

// Props explained:
// value  = the number this bar represents (determines height)
// color  = current state of this bar ('blue' | 'amber' | 'red' | 'green' | 'purple')
// maxVal = the biggest value in the array (used to calculate height as a percentage)

function ArrayBar({ value, color, maxVal }) {

  // COLOR MAP — each state has a meaning:
  // blue   = default / unsorted
  // amber  = currently being COMPARED
  // red    = being SWAPPED
  // green  = SORTED / in final position
  // purple = special marker (pivot in QuickSort, minimum in SelectionSort)
  const colorMap = {
    blue:   'bg-blue-500',
    amber:  'bg-amber-400',
    red:    'bg-red-500',
    green:  'bg-green-500',
    purple: 'bg-purple-500',
  }

  // Height = what percentage of the container this bar takes up
  // Example: value=75, maxVal=100 → height = 75%
  // We use percentage so bars always fit the container regardless of screen size
  const heightPercent = (value / maxVal) * 100

  return (
    // outer div = the column (full height, flex column, items at bottom)
    // items-end = bars grow UPWARD from the bottom (like a real bar chart)
    <div className="flex flex-col items-center justify-end h-full">
      
      {/* The actual colored bar */}
      {/* style={{ height }} sets the height dynamically based on value */}
      {/* transition-all duration-150 = smooth color change animation */}
      <div
        className={`w-full ${colorMap[color]} transition-all duration-150 rounded-t-sm`}
        style={{ height: `${heightPercent}%` }}
      />
    </div>
  )
}

export default ArrayBar