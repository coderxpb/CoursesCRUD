import { SubjectCard } from '../components/CustomCard';
import { useCourse } from '../contexts/courseContext';

interface IProps {
  courseID: string;
  removeCourse(courseID:string): void;
}

//takes a courseID and renders a card after getting the name from the courseContext
export const CourseRenderer = (props: IProps) => {
  const { courses } = useCourse();
  const { courseID, removeCourse } = props;

  return courses[courseID] ? (
    <SubjectCard
      key={courseID}
      name={courses[courseID].name}
      id={courseID}
      onDeleteClicked={() => removeCourse(courseID)}
    />
  ) : <div></div>;
};
