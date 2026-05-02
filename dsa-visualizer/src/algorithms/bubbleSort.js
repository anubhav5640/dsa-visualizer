const bubbleSort = async (array, setArray, setMessage, sleep, speed, isStopped, setLine) => {
  let arr = array.map(el => ({ ...el }))
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    setLine(0)
    for (let j = 0; j < n - 1 - i; j++) {
      if (isStopped.current) return
      setLine(1)

      setMessage(`Comparing ${arr[j].value} and ${arr[j + 1].value}`)
      arr[j].color = 'amber'
      arr[j + 1].color = 'amber'
      setArray([...arr])
      await sleep(speed)

      if (arr[j].value > arr[j + 1].value) {
        setLine(3)
        setMessage(`Swapping ${arr[j].value} and ${arr[j + 1].value}`)
        arr[j].color = 'red'
        arr[j + 1].color = 'red'
        setArray([...arr])
        await sleep(speed)
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      } else {
        setLine(2)
        await sleep(speed / 2)
      }

      arr[j].color = 'blue'
      arr[j + 1].color = 'blue'
      setArray([...arr])
    }

    setLine(4)
    arr[n - 1 - i].color = 'green'
    setArray([...arr])
  }

  setLine(5)
  arr[0].color = 'green'
  setArray([...arr])
  setMessage('Array sorted!')
}

export default bubbleSort