import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { StudentPage } from './pages/StudentPage';
import { CourseContextProvider } from './contexts/courseContext';

const App = () => {
  return (
    <BrowserRouter>
      <CourseContextProvider>
        <Routes>
          <Route path={'/*'} element={<HomePage />} />
          <Route path={'/student*'} element={<StudentPage />} />
        </Routes>
      </CourseContextProvider>
    </BrowserRouter>
  );
};

export default App;
