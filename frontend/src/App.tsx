import { HomePage } from './pages/HomePage';
import { CourseContextProvider } from './contexts/courseContext';
import { PageContextProvider } from './contexts/pageContext';

const App = () => {
  return (
    <PageContextProvider>
      <CourseContextProvider>
        <HomePage />
      </CourseContextProvider>
    </PageContextProvider>
  );
};

export default App;
