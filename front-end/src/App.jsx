import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Layout from './routes/layout/Layout';
import CountryListPage from './routes/countryListPage/CountryListPage';
import CountryInfoPage from './routes/countryInfoPage/CountryInfoPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
          <Route index element={<CountryListPage/>} />
          <Route path="info/:code" element={<CountryInfoPage/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router}/>
  )
}

export default App