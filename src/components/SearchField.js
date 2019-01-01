import React from 'react'

const SearchField = ({ onSearch, lastSearch }) => {
  let textInput = React.createRef();

  function handleSubmit() {
    onSearch(textInput.current.value)
  }

  return(
    <div className="search-field">
      <div className="search-input">
        <input type="text"
               defaultValue={lastSearch}
               ref={textInput}
               onKeyUp={ (e) => e.keyCode === 13 && handleSubmit() }
               placeholder="Start typing..."/>
        <button onClick={ handleSubmit }>
          <i className="search-button-icon"></i>
        </button>
      </div>
    </div>
  )
}

export default SearchField