import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { deleteRequest, getRequest } from '../utils/httpHandlers';

interface ISubject {
  name: string;
  _id: string;
}

interface ContextType {
  courses: Record<string, ISubject>;
  addCourse(name: string): void;
  removeCourse(_id: string): void;
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
    //@TODO: add an api call to add course later
    setLoadCourses(true);
  };

  //remove course from course data
  const removeCourse = (_id: string) => {
    deleteRequest('/courses', { _id }).then(data => {
      setLoadCourses(true);
    });
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
