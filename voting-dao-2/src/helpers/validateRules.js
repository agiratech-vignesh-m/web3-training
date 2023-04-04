import { mixed, addMethod } from "yup";
import * as yup from "yup";
addMethod(mixed, "isDateValid", isDateValid);

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
}

function handleErrorMeg(msg, schema) {
  try {
    schema.validateSync(msg, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}

function isDateValid(msg) {
  return mixed().test("isDateValid", msg, function (value) {
    value = parseInt(value, 10);
    if (!value || isNaN(value)) return false;
    var isValid = new Date(value).getTime() > 0;
    return isValid;
  });
}

export function CreateProposalValidation(values) {
  return handleErrorMeg(values, CreateProposalSchema);
}

const CreateProposalSchema = yup.object().shape({
  title: yup.string().required('Title is required').nullable(),
  description: yup.string().max(500, 'Max 500 characters').required('Description is required'),
  start_date:
    yup.date()
    // .default(() => new Date())
      .required("Start Date is required")
      .typeError('Enter valid date')
      .min(new Date(), "Start Date must be greater than current date and time").nullable(),
  end_date:
    yup.date()
    .required("End Date is required")
      .typeError('Enter valid date')
      // .when(
      //   "start_date",
      //   (start_date, schema) => start_date && schema.min(start_date, "End Date must be greater than Start Date")).nullable(),
      .when('start_date', {
        is: (start_date=> {
          return ( start_date !=="Invalid Date" && !!start_date) ? true : false;
        }),
        then: yup.date().min(yup.ref('start_date'),
        "End Date must be greater than Start Date").required('End Date is required').typeError('Enter valid date').nullable()
    }).nullable(),
  quorumPercentage: yup.number().required('Set Quorum percentage is required').min(1, 'Minimum 1%').max(100, 'Maximum 100%').typeError('Enter valid percentage').nullable()
})
