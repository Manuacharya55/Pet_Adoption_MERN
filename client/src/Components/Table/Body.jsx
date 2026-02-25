import React from 'react'

const Body = ({ tableBody, tableKeys, onAction }) => {
  const getBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "badge badge-success";
      case "rejected":
        return "badge badge-error";
      case "pending":
        return "badge badge-pending";
      default:
        return "badge";
    }
  };

  return (
    <tbody>
      {tableBody.length == 0
        ? "No data yet"
        : tableBody.map((curele, idx) => (
          <tr key={idx}>
            {tableKeys.map((key, index) => (
              <td key={index}>
                <span className="tr-label">{key} : </span>
                {key === "status" ? (
                  <span className={getBadgeClass(curele[key])}>
                    {curele[key]}
                  </span>
                ) : (
                  curele[key]
                )}
              </td>
            ))}
            <td>
              <button
                className="view-details-btn"
                onClick={() => onAction && onAction(curele)}
              >
                view details
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default Body