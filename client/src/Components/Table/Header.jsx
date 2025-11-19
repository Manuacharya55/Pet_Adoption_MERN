import React from 'react'

const Header = ({tableHeader}) => {
  return (
    <thead>
          <tr>
            {tableHeader?.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
  )
}

export default Header