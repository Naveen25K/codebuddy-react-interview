import { useLocation, useNavigate } from 'react-router-dom';

const TicketPrice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketData = location.state.selectedSeat;
  let totalPrice = 0;
  return (
    <>
      <div className="ticket_price">
        <h1>Ticket Details</h1>
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Seat Row Number</th>
              <th>Seat Number</th>
              <th>Ticket Price</th>
            </tr>
          </thead>
          <tbody>
            {ticketData?.map((tickets, ind) => {
              const ticketPrice = tickets.row * 10 + 20;
              totalPrice += ticketPrice;
              return (
                <tr key={tickets.seatID}>
                  <td>{ind + 1}</td>
                  <td>{tickets.row}</td>
                  <td>{tickets.seatNumber}</td>
                  <td>{`${ticketPrice} $`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2>Total Price : {totalPrice} $</h2>
        <button type="button" className="back_to_home" onClick={() => navigate('/')}>
          Back To Home
        </button>
      </div>
    </>
  );
};

export default TicketPrice;
