import React from 'react'
import { useSelector } from 'react-redux'

const Logs = () => {
  const logs = useSelector((s) => s.logs.logs)
  return (
    <div>
      <div className="w-1/2 inline-block text-center text-2xl">Время</div>
      <div className="w-1/2 inline-block text-center text-2xl">Действие</div>
      {logs.reverse().map((el) => (
        <div key={el.time} className="flex justify-between text-center border-2 rounded border-gray-600 py-2 my-2">
          <div className="w-1/2">{el.time}</div>
          <div className="w-1/2">{el.event}</div>
        </div>
      ))}
    </div>
  )
}

export default Logs
