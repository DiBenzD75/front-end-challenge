import React from 'react'

interface TableProps<T> {
  data: T[]
  handleSort: (key: keyof T) => void
}

/**
 * This Table component dynamically generates table headers and rows 
 * based on the keys of the data objects.
 * @template T The generic type parameter that describes the shape of the data objects.
 * This allows the component to be reusable and adaptable to different data structures.
 * @param {TableProps<T>} props The props that the component expects.
 * - `data`: An array of objects that will be displayed in the table.
 * - `handleSort`: A function to handle sorting when a column header is clicked.
 * @returns {JSX.Element} A table element populated with data, 
 * or a loading message if data is not yet available.
 */
const Table = <T,>({ data, handleSort }: TableProps<T>): JSX.Element => {
  return data?.length > 0 ? (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0] as Record<string, any>).map((key, index) => (
            <th key={index} onClick={() => handleSort(key as keyof T)}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.entries(item as Record<string, any>).map(
              ([key, value], i) => (
                <td
                  key={i}
                  style={
                    key === 'color'
                      ? { backgroundColor: value, color: 'white' }
                      : {}
                  }
                >
                  {value}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <>Load data...</>
  )
}

export default Table
