import moment from 'moment';
import submitFormModel from './submitFormModel';
const {
  formField: {
    date,
    jobId,
    workTime,
    tips,
    comments,
    teammates,
    extraHour,
    minTime,
    image,
    role,
    boxes,
  },
} = submitFormModel;

export default {
  [date.name]: moment(),
  [jobId.name]: '',
  [workTime.name]: '',
  [tips.name]: '',
  [comments.name]: '',
  [teammates.name]: [],
  [extraHour.name]: false,
  [minTime.name]: false,
  [image.name]: [],
  [role.name]: '',
  [boxes.name]: '',
};
