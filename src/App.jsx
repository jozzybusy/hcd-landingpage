import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/about/AboutPage.jsx'
import ProductDetailPage from './pages/product/ProductDetailPage.jsx'
import OpenCoursesPage from './pages/courses/OpenCoursesPage.jsx'
import CasesListPage from './pages/cases/CasesListPage.jsx'
import CaseDetailPage from './pages/cases/CaseDetailPage.jsx'
import TeachingGalleryPage from './pages/teaching/TeachingGalleryPage.jsx'
import ContactPage from './pages/contact/ContactPage.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/courses" element={<OpenCoursesPage />} />
          <Route path="/cases" element={<CasesListPage />} />
          <Route path="/cases/:slug" element={<CaseDetailPage />} />
          <Route path="/teaching" element={<TeachingGalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
