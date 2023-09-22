import React, { useState, useEffect } from 'react'
import Table from '../Table'

/** Define the sorting configuration interface */
interface SortConfig<T> {
  key: keyof T
  direction: 'asc' | 'desc'
}

/** Define the props interface for DynamicTable */
interface DynamicTableProps<T> {
  data: T[]
}

/** DynamicTable component */
function DynamicTable<T>(props: DynamicTableProps<T>) {

  /** State to hold sorted data */
  const [sortedData, setSortedData] = useState<T[]>([])

  /** State to hold sorting configuration */
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)

  /** Effect to sort data based on sortConfig */
  useEffect(() => {
    let sortedData = [...props.data]

    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    setSortedData(sortedData)
  }, [props.data, sortConfig])


  /** 
   * Function to handle sorting 
   * when a column header is clicked 
   */
  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return <Table<T> data={sortedData} handleSort={handleSort} />
}

export default DynamicTable
