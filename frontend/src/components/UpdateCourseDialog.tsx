import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useCourse } from '../contexts/courseContext';
import _, { toNumber } from 'lodash'
import React from 'react'

interface IUpdateCourse {
  initialCourse: string[] | undefined;
  addCourse(id: string): void;
  removeCourse(id: string): void;
  updateCourses(): void;
  closeDialog(): void;
  open: boolean;
}

export const UpdateCourseDialog = (props: IUpdateCourse) => {
  const { open, initialCourse, closeDialog, updateCourses, addCourse, removeCourse } = props;
  const { courses } = useCourse();

  const onSave = () => {
    updateCourses();
    closeDialog();
  };

  const onCancel = () => {
    closeDialog();
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? addCourse(e.target.value) : removeCourse(e.target.value);

  return (
    <Dialog open={open}>
      <DialogTitle>Update Courses</DialogTitle>
      <DialogContent>
        <FormGroup>
          {_.map(courses, course => (
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={initialCourse? initialCourse.includes(course.id): false}
                  value={course.id}
                  onChange={onCheckboxChange}
                />
              }
              label={course.name}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};