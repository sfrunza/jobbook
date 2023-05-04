import * as Yup from 'yup';
import submitFormModel from './submitFormModel';

const {
  formField: { date, jobId, workTime, tips, image, role },
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
        'invalid',
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
      // [image.name]: Yup.array()
      //   .min(1, 'required at least 1 file')
      //   .required(`${image.requiredErrorMsg}`),
      [role.name]: Yup.string().nullable().required(`${role.requiredErrorMsg}`),
      [image.name]: Yup.array()
        .notRequired()
        .when('role', {
          is: (value) => value === 'foreman',
          then: Yup.array()
            .min(1, 'required at least 1 file')
            .required(`${image.requiredErrorMsg}`),
        }),
    },
    [['tips', 'tips']]
  ),
  Yup.object().shape(
    {
      [date.name]: Yup.string().nullable().required(`${date.requiredErrorMsg}`),
      [jobId.name]: Yup.string()
        .nullable()
        .required(`${jobId.requiredErrorMsg}`),
      [workTime.name]: Yup.number().test(
        'is-decimal',
        'invalid',
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
