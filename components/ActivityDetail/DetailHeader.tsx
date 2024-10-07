import React from 'react'

const DetailHeader = ({ details }) => {
  return details.map(({ label, value }, index) => (
    <div key={index} className="flex justify-between items-center mt-1 body-sm">
      <div className="text-gray-400">{label}</div>
      <div className="text-white">{value}</div>
    </div>
  ))
}

export default DetailHeader
