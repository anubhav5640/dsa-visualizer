import { useState, useRef } from 'react'
import sleep from '../utils/sleep'

const useAnimation = (defaultSpeed = 50) => {
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(defaultSpeed)
  const isPaused = useRef(false)
  const isStopped = useRef(false)

  const pauseableSleep = async (ms) => {
    await sleep(ms)
    while (isPaused.current) {
      if (isStopped.current) return
      await sleep(100)
    }
  }

  const start = () => {
    isPaused.current = false
    isStopped.current = false
    setIsRunning(true)
  }

  const pause = () => {
    isPaused.current = true
  }

  const resume = () => {
    isPaused.current = false
  }

  const stop = () => {
    isPaused.current = false
    isStopped.current = true
    setIsRunning(false)
  }

  const finish = () => {
    setIsRunning(false)
  }

  return { isRunning, speed, setSpeed, pauseableSleep, start, pause, resume, stop, finish, isStopped }
}

export default useAnimation