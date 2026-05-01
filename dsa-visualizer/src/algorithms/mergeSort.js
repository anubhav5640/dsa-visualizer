const mergeSort = async (array, setArray, setMessage, sleep, speed, isStopped) => {
  let arr = array.map(el => ({ ...el }))

  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      if (isStopped.current) return

      arr[left + i].color = 'amber'
      arr[mid + 1 + j].color = 'purple'
      setArray([...arr])
      setMessage(`Merging — comparing ${leftArr[i].value} and ${rightArr[j].value}`)
      await sleep(speed)

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k].value = leftArr[i].value
        i++
      } else {
        arr[k].value = rightArr[j].value
        j++
      }

      arr[k].color = 'green'
      setArray([...arr])
      await sleep(speed)
      k++
    }

    while (i < leftArr.length) {
      if (isStopped.current) return
      arr[k].value = leftArr[i].value
      arr[k].color = 'green'
      setArray([...arr])
      await sleep(speed)
      i++
      k++
    }

    while (j < rightArr.length) {
      if (isStopped.current) return
      arr[k].value = rightArr[j].value
      arr[k].color = 'green'
      setArray([...arr])
      await sleep(speed)
      j++
      k++
    }
  }

  const sort = async (arr, left, right) => {
    if (left >= right || isStopped.current) return
    const mid = Math.floor((left + right) / 2)

    setMessage(`Dividing array from index ${left} to ${right}`)
    for (let i = left; i <= right; i++) arr[i].color = 'amber'
    setArray([...arr])
    await sleep(speed)

    for (let i = left; i <= right; i++) arr[i].color = 'blue'
    setArray([...arr])

    await sort(arr, left, mid)
    await sort(arr, mid + 1, right)
    await merge(arr, left, mid, right)
  }

  await sort(arr, 0, arr.length - 1)

  if (!isStopped.current) {
    arr.forEach(el => el.color = 'green')
    setArray([...arr])
    setMessage('Array sorted!')
  }
}

export default mergeSort