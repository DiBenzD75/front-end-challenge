import React, { CSSProperties } from 'react'

interface TableProps<T> {
  data: T[]
  handleSort: (key: keyof T) => void
}

/** Table component */
function Table<T>(props: TableProps<T>) {

  const tableStyle: CSSProperties = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid #ddd',
  }

  const thStyle: CSSProperties = {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  }

  const tdStyle: CSSProperties = {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  }
console.log("props", props)

  return props.data?.length>0 ? (
    <table style={tableStyle}>
      <thead style={tableStyle}>
        <tr>
          {/* Generate table headers dynamically based on data keys */}
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
        {/* Generate table rows dynamically based on sorted data */}
        {props.data && props.data.map((item, index) => (
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
  ) : (<>Load data...</>)
}

export default Table
