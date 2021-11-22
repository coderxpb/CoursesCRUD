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
import _, { toNumber } from 'lodash';
import React from 'react';

interface IUpdateCourse {
  initialCourses: string[] | undefined;
  addToChosenCourses(id: string): void;
  removeFromChosenCourses(id: string): void;
  updateCourses(): void;
  closeDialog(): void;
  open: boolean;
}

export const UpdateCourseDialog = (props: IUpdateCourse) => {
  const {
    open,
    initialCourses,
    addToChosenCourses,
    removeFromChosenCourses,
    closeDialog,
    updateCourses,
  } = props;

  const { courses } = useCourse();

  const onSave = () => {
    updateCourses();
    closeDialog();
  };

  const onCancel = () => {
    closeDialog();
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.checked
      ? addToChosenCourses(e.target.value)
      : removeFromChosenCourses(e.target.value);

  return (
    <Dialog open={open}>
      <DialogTitle>Update Courses</DialogTitle>
      <DialogContent>
        <FormGroup>
          {_.map(courses, course => (
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={
                    initialCourses ? initialCourses.includes(course._id) : false
                  }
                  value={course._id}
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
