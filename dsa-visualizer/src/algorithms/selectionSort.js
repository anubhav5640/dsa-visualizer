const selectionSort = async (array, setArray, setMessage, sleep, speed, isStopped) => {
  let arr = array.map(el => ({ ...el }))
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    arr[minIdx].color = 'purple'
    setArray([...arr])

    for (let j = i + 1; j < n; j++) {
      if (isStopped.current) return

      setMessage(`Finding minimum — comparing ${arr[j].value} with current min ${arr[minIdx].value}`)
      arr[j].color = 'amber'
      setArray([...arr])
      await sleep(speed)

      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].color = minIdx <= i ? 'green' : 'blue'
        minIdx = j
        arr[minIdx].color = 'purple'
        setArray([...arr])
      } else {
        arr[j].color = 'blue'
        setArray([...arr])
      }
    }

    if (minIdx !== i) {
      setMessage(`Placing minimum ${arr[minIdx].value} at position ${i}`)
      arr[i].color = 'red'
      arr[minIdx].color = 'red'
      setArray([...arr])
      await sleep(speed)
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }

    arr[i].color = 'green'
    setArray([...arr])
    await sleep(speed)
  }

  arr[n - 1].color = 'green'
  setArray([...arr])
  setMessage('Array sorted!')
}

export default selectionSort