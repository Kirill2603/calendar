import { useState, useEffect } from 'react'

type Coordinates = {
  latitude: number
  longitude: number
  timestamp: number
}

export const usePosition = () => {

  const [position, setPosition] = useState<Coordinates>()
  const [error, setError] = useState<string | null>(null)

  const onChange = (coords: GeolocationPosition) => {
    setPosition({
      latitude: coords.coords.latitude,
      longitude: coords.coords.longitude,
      timestamp: coords.timestamp,
    })
  }

  const onError = (error: GeolocationPositionError) => {
    setError(error.message)
  }

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }

    navigator.geolocation.getCurrentPosition(onChange, onError)
  }, [])

  return { position, error }
}