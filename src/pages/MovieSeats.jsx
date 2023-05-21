import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieSeat = ({ rowNumber }) => {
  // setting state for storing api data for use
  const [data, setData] = useState([]);
  // string seat number in states
  const [selectedSeat, setSelectedSeat] = useState([]);
  // stroing only ids in this array from selectedSeat to post them on api
  const ticketID = [];
  // navigate
  const navigate = useNavigate();

  // fetching data first time

  async function logJSONData() {
    const response = await fetch(`https://codebuddy.review/seats?count=${rowNumber}`);
    const jsonData = await response.json();
    setData(jsonData.data);
  }

  useEffect(() => {
    logJSONData();
  }, []);

  const inputChange = (e, seatID, seatNo, seatRow, isReserved) => {
    const hasClass = e.currentTarget.matches('#active');
    if (!hasClass) {
      e.currentTarget.id += 'active';
    } else {
      e.currentTarget.id = '';
    }

    if (e.target.checked) {
      // if user select more than 5 seats
      if (selectedSeat.length >= 5) {
        alert('you can not booked more than 5 tickets');
        e.currentTarget.id = '';
        return;
      }

      // stroing seat number in an array
      setSelectedSeat(prev => [...prev, { seatID, seatNumber: seatNo, isReserved, row: seatRow }]);
    } else {
      // filtering data if user unselect a seat
      const filterSeat = selectedSeat.filter(seatNumber => seatNumber.seatNumber !== seatNo);
      setSelectedSeat(filterSeat);
    }
  };

  // show ticket price at the end

  const showTicketPrice = async () => {
    // filter ticket id's from selectedSeat state
    selectedSeat.forEach(item => {
      ticketID.push({ id: item.seatID });
    });
    // post data to api
    await fetch('https://codebuddy.review/submit', {
      method: 'POST',
      body: JSON.stringify(ticketID),
    });
    navigate('/ticket-price', { state: { selectedSeat } });
  };

  return (
    <>
      <div className="instruction">
        <span>Reserved</span>
        <div className="data book" />
        <span>Empty</span>
        <div className="data" />
      </div>
      <div className="movie_container">
        {data.seats?.map((item, index) => (
          <div className="movie_row">
            {item.seats.map((seatCount, idx) => (
              <>
                <span
                  key={seatCount.id}
                  className="data"
                  id={seatCount.isReserved ? 'booked' : ''}
                  onChange={e =>
                    inputChange(
                      e,
                      seatCount.id,
                      seatCount.seatNumber,
                      seatCount.row,
                      seatCount.isReserved,
                      index,
                      idx,
                    )
                  }
                >
                  {seatCount.seatNumber}
                  <input type="checkbox" disabled={seatCount.isReserved} />
                </span>
              </>
            ))}
          </div>
        ))}
        {selectedSeat.length > 0 ? (
          <button type="button" className="book_tickets" onClick={showTicketPrice}>
            Book Tickets
          </button>
        ) : null}
      </div>
    </>
  );
};

export default MovieSeat;
