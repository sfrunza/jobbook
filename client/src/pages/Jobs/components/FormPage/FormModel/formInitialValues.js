import submitFormModel from './submitFormModel';
const {
  formField: { date, jobId, workTime, tips, comments, teammates },
} = submitFormModel;

export default {
  [date.name]: '',
  [jobId.name]: '',
  [workTime.name]: 'Work time',
  [tips.name]: '',
  [comments.name]: '',
  [teammates.name]: [],
};
