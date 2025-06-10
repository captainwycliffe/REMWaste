import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlacementPage from './pages/PlacementPage'
import DatePickerPage from './pages/DatePickerPage';
import Layout from "./Layout"
import Checkout from './pages/Checkout'

export default function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/permit-check" element={<PlacementPage />} />
        <Route path="/date" element={<DatePickerPage />} />
        <Route path="/payment" element={<Checkout />} />
      </Route>
    </Routes>
  )
}
