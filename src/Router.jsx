import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import TicketPrice from './pages/TicketPrice';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/ticket-price" element={<TicketPrice />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
