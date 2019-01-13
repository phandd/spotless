import React from 'react'

const Loading = ({ loading }) => {
  return (
    loading ?
    <div className="loading">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    : 
    null
  )
}

export default Loading