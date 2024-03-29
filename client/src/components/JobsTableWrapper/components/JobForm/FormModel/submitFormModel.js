export default {
  formId: 'newJobForm',
  formField: {
    date: {
      name: 'date',
      label: 'Date',
      requiredErrorMsg: 'Date is required',
    },
    jobId: {
      name: 'jobId',
      label: 'Job ID',
      requiredErrorMsg: 'Job ID is required',
    },
    workTime: {
      name: 'workTime',
      label: 'Work time',
      requiredErrorMsg: 'Work time is required',
    },
    tips: {
      name: 'tips',
      label: 'Tips',
    },
    comments: {
      name: 'comments',
      label: 'Comments',
    },
    teammates: {
      name: 'teammates',
      label: 'Teammates',
    },
    extraHour: {
      name: 'extraHour',
      label: 'Exta 1h',
    },
    minTime: {
      name: 'minTime',
      label: 'Min 5h',
    },
    image: {
      name: 'image',
      label: 'image',
      requiredErrorMsg: 'required at least 1 file',
    },
    role: {
      name: 'role',
      label: 'Role',
      requiredErrorMsg: 'required',
    },
    boxes: {
      name: 'boxes',
      label: 'TV Box',
    },
  },
};
