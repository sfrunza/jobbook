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
  },
} = submitFormModel;

export default {
  [date.name]: new Date(),
  [jobId.name]: '',
  [workTime.name]: '',
  [tips.name]: '',
  [comments.name]: '',
  [teammates.name]: [],
  [extraHour.name]: false,
  [minTime.name]: false,
  [image.name]: null,
};
