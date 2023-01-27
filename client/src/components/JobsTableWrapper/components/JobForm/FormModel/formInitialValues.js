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
  },
} = submitFormModel;

export default {
  [date.name]: '',
  [jobId.name]: '',
  [workTime.name]: 'Work time',
  [tips.name]: '',
  [comments.name]: '',
  [teammates.name]: [],
  [extraHour.name]: false,
  [minTime.name]: false,
};
