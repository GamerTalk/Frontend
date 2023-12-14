import React from 'react'

interface Prop { 
  level:number
}

const Scale = (props: Prop) => {
  const { level } = props;
  const scaleWidth = `${level * 20}%`;
  const backgroundColor =
  level <= 2 ? '#1E90FF' : level <= 4 ? '#FFD700' : '#00FF00';
  return (
    <div className="rounded-xl m-0 w-12 bg-white border-1 border-black">
      <div className="w-[20%] h-2.5 rounded-xl" style={{ width: scaleWidth, background: backgroundColor}}></div>
    </div>
  )
}

export default Scale