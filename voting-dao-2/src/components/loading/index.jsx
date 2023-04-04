import React from 'react'
import './loading.scss';

const Loading = () => {

  return (
    <div className='spinner-wrapper'>
      <div className='spinner'>
        <img src={require("../../asset/ame.png")} className="loader-img" width='50' height={50} />
      </div>
    </div>
  )
}

export default Loading