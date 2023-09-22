import React, { useState, useEffect } from 'react'
import DynamicTable from '../DynamicTable'
import data from '../../Data/data.json'

/** Define the DeviceData interface */
interface DeviceData {
  id: number
  location: string
  type: string
  device_health: string
  last_used: string
  price: string
  color: string
}

const Devices: React.FC = () => {
  /** State to hold the device data */
  const [devices, setDevices] = useState<DeviceData[]>([])

  /**
   * Use useEffect to set the state only once
   * upon component mount
   */
  useEffect(() => {
    // Use imported data to set the state
    setDevices(data)
    // Empty dependency array ensures this runs only once
  }, [])

  return (
    <div>
      <DynamicTable<DeviceData> data={devices} />
    </div>
  ) 
}

export default Devices
