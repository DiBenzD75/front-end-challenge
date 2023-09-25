import React, { useState, useEffect } from 'react'
import DynamicTable from '../UI/DynamicTable'

/**
 * The Devices component loads data from a JSON file 
 * and displays it in a table.
 * 
 * @template T The generic type parameter that describes the shape of the data objects.
 * This allows the component to be reusable and adaptable to different data structures.
 * @param {string} dataPath - The path to the JSON file containing the data.
 */
const Devices = <T,>({ dataPath }: { dataPath: string }) => {

  /** State to hold the device data */
  const [devices, setDevices] = useState<T[]>([])

  /**
   * Use useEffect to set the state only once
   * upon component mount
   */
  useEffect(() => {
    fetch(dataPath)
      .then((response) => response.json())
      .then((data: T[]) => setDevices(data))
      .catch((error) => console.error('Data load Error:', error))
  }, [dataPath])

  return (<DynamicTable<T> data={devices} />)
}

export default Devices
