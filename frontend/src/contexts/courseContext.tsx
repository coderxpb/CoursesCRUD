import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { deleteRequest, getRequest } from '../utils/httpHandlers';

const removeKey = (k: string, { [k]: _, ...o }) => o;

interface ISubject {
  name: string;
  id: string;
}

interface ContextType {
  courses: Record<string, ISubject>;
  addCourse(name: string): void;
  removeCourse(id: string): void;
}

const CourseContext = createContext<ContextType>({} as ContextType);

const CourseContextProvider = ({ children }: { children: ReactElement }) => {
  const [courses, setCourses] = useState<Record<string, ISubject>>({});
  const [loadCourses, setLoadCourses] = useState(true);

  //fetch course json
  useEffect(() => {
    if (loadCourses) {
      (async () => {
        getRequest('/courses').then(data => {
          setCourses(data);
          setLoadCourses(false);
        });
      })();
    }
  }, [loadCourses]);

  const addCourse = (name: string) => {
    //api call to add course
    setLoadCourses(true);
  };

  const removeCourse = (id: string) => {
    deleteRequest('/courses', { id }).then(data => {
      setLoadCourses(true);
    });
    setLoadCourses(true);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        removeCourse,
      }}>
      {children}
    </CourseContext.Provider>
  );
};

const useCourse = () => useContext(CourseContext);

export { CourseContextProvider, useCourse };
