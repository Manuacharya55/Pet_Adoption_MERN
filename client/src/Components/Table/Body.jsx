import React from 'react'

const Body = ({tableBody,tableKeys}) => {
  return (
    <tbody>
          {tableBody.length == 0
            ? "No data yet"
            : tableBody.map((curele,idx) => (
                <tr key={curele?._id} >
                  {tableKeys.map((data,index) => (
                    <td key={index}><span className="tr-label">{data} : </span> {curele[data]}</td>
                  ))}
                  <td>
                    <button>view details</button>
                  </td>
                </tr>
              ))}
        </tbody>
  )
}

export default Body