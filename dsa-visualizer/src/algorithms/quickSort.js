const quickSort = async (array, setArray, setMessage, sleep, speed, isStopped) => {
  let arr = array.map(el => ({ ...el }))

  const partition = async (arr, low, high) => {
    const pivot = arr[high].value
    arr[high].color = 'purple'
    setArray([...arr])
    setMessage(`Pivot selected: ${pivot}`)
    await sleep(speed)

    let i = low - 1

    for (let j = low; j < high; j++) {
      if (isStopped.current) return i

      arr[j].color = 'amber'
      setArray([...arr])
      setMessage(`Comparing ${arr[j].value} with pivot ${pivot}`)
      await sleep(speed)

      if (arr[j].value <= pivot) {
        i++
        arr[j].color = 'red'
        arr[i].color = 'red'
        setArray([...arr])
        await sleep(speed)
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }

      if (arr[j].color !== 'green') arr[j].color = 'blue'
      setArray([...arr])
    }

    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    arr[i + 1].color = 'green'
    arr[high].color = 'blue'
    setArray([...arr])
    await sleep(speed)

    return i + 1
  }

  const sort = async (arr, low, high) => {
    if (low >= high || isStopped.current) return
    const pi = await partition(arr, low, high)
    await sort(arr, low, pi - 1)
    await sort(arr, pi + 1, high)
  }

  await sort(arr, 0, arr.length - 1)

  if (!isStopped.current) {
    arr.forEach(el => el.color = 'green')
    setArray([...arr])
    setMessage('Array sorted!')
  }
}

export default quickSort