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
    hasExtraTime,
    extraTime,
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
  [hasExtraTime.name]: false,
  [extraTime.name]: null,
  [image.name]: [],
  [role.name]: '',
  [boxes.name]: '',
};
