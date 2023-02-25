import * as Yup from 'yup';
import submitFormModel from './submitFormModel';

const {
  formField: { date, jobId, workTime, tips },
} = submitFormModel;

export default [
  Yup.object().shape(
    {
      [date.name]: Yup.string().nullable().required(`${date.requiredErrorMsg}`),
      [jobId.name]: Yup.string()
        .nullable()
        .required(`${jobId.requiredErrorMsg}`),
      [workTime.name]: Yup.number().test(
        'is-decimal',
        'invalid decimal',
        (value) =>
          (value + '').match(/^\d*\.{1}\d*$/) || typeof value === 'number'
      ),
      [tips.name]: Yup.number()
        .nullable()
        .notRequired()
        .when('tips', {
          is: (value) => value?.length,
          then: (value) =>
            (value + '').match(/^\d*\.{1}\d*$/) || typeof value === 'number',
        }),
    },
    [['tips', 'tips']]
  ),
];
