const insertionSort = async (array, setArray, setMessage, sleep, speed, isStopped) => {
  let arr = array.map(el => ({ ...el }))
  const n = arr.length

  arr[0].color = 'green'
  setArray([...arr])

  for (let i = 1; i < n; i++) {
    if (isStopped.current) return

    let key = arr[i].value
    let j = i - 1

    setMessage(`Inserting key: ${key} into the sorted portion`)
    arr[i].color = 'amber'
    setArray([...arr])
    await sleep(speed)

    while (j >= 0 && arr[j].value > key) {
      if (isStopped.current) return

      setMessage(`Shifting ${arr[j].value} one position right`)
      arr[j + 1].value = arr[j].value
      arr[j + 1].color = 'red'
      arr[j].color = 'red'
      setArray([...arr])
      await sleep(speed)

      arr[j + 1].color = 'blue'
      arr[j].color = 'blue'
      j--
    }

    arr[j + 1].value = key
    arr[j + 1].color = 'green'

    for (let k = 0; k <= i; k++) {
      arr[k].color = 'green'
    }

    setArray([...arr])
    await sleep(speed)
  }

  setMessage('Array sorted!')
}

export default insertionSort