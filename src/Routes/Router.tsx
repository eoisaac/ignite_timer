import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../components/layouts/DefaultLayout'
import { History } from '../pages/History'
import { Home } from '../pages/Home'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/historico" element={<History />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
