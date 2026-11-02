import { Route, Routes } from 'react-router-dom'
import ContentPage from './components/ContentPage.tsx'
import Layout from './components/Layout.tsx'
import tipsWerkgevers from './content/tipsWerkgevers.json'
import tipsWerkzoekenden from './content/tipsWerkzoekenden.json'
import uitdagingen from './content/uitdagingen.json'
import voordelen from './content/voordelen.json'
import BronnenPage from './pages/BronnenPage.tsx'
import HomePage from './pages/HomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="voordelen" element={<ContentPage page={voordelen} />} />
        <Route path="uitdagingen" element={<ContentPage page={uitdagingen} />} />
        <Route path="tips-werkzoekenden" element={<ContentPage page={tipsWerkzoekenden} />} />
        <Route path="tips-werkgevers" element={<ContentPage page={tipsWerkgevers} />} />
        <Route path="bronnen" element={<BronnenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
