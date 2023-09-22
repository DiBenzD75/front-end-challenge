import React from 'react'

interface TableProps<T> {
  data: T[]
  handleSort: (key: keyof T) => void
}

/**
 * Table component
 * Generate table headers and rows dynamically
 * based on data keys
 */
function Table<T>(props: TableProps<T>) {
  return props.data?.length > 0 ? (
    <table>
      <thead>
        <tr>
          {Object.keys(props.data[0] as Record<string, any>).map(
            (key, index) => (
              <th key={index} onClick={() => props.handleSort(key as keyof T)}>
                {key}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((item, index) => (
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
