import { useState } from 'react';
import MovieSeats from './MovieSeats';

const SearchBar = () => {
  // handling input field
  const [input, setInput] = useState(3);
  // handling status for MovieSeats component show and hide
  const [status, setStatus] = useState(false);

  // setting data on input state from input field
  const inputChange = e => {
    setInput(e.target.value);
    setStatus(false);
  };

  // submit button functionality

  const searchBar = () => {
    if (input < 3 || input > 10) {
      alert('value must be 3 to 10 only');
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  return (
    <>
      <div className="searbar">
        <label htmlFor="rowNum">Type Row Number</label>
        <br />
        <input
          value={input}
          type="number"
          id="rowNum"
          placeholder="type number of row"
          onChange={inputChange}
        />
        <button className="input_submit" onClick={() => searchBar()} type="button">
          Submit
        </button>
      </div>
      {status ? <MovieSeats rowNumber={input} /> : null}
    </>
  );
};

export default SearchBar;
