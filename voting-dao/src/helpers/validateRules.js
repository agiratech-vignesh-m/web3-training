import { object, string, mixed, addMethod, ref, array, number } from "yup";
import * as yup from "yup";
// import { validation_message } from '../config/constant'
addMethod(mixed, "isDateValid", isDateValid);


const WEBSITE_URL = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const EXT_TYPE = ["doc", "docx", "pdf", "xlsx", "csv", "msg", "jpeg"];

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

// Validation section
const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

const emailRegex = RegExp(
  /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/
);


export function CreateProposalValidation(values) {
  return handleErrorMeg(values, CreateProposalSchema);
}

const CreateProposalSchema = yup.object().shape({
  title: yup.string().required('Title is required').nullable(),
  description: yup.string().max(500, 'Max 500 characters').required('Description is required'),
  start_date:
    //  yup.string().required('Year started is required').nullable(),
    yup.string(),
      // .required("Start date is required")
      // .typeError('Enter valid date'),
      // .min(new Date(), "Minimum current date")
      // .max(new Date(), "Maximum current date"),
      end_date:
      //  yup.string().required('Year started is required').nullable(),
      yup.date()
        .required("End date is required")
        .typeError('Enter valid date')
        .min(new Date(), "Minimum current date"),
  // .max(+(new Date().getFullYear), `Allowed maximum is ${new Date().getFullYear}`),
  quorumPercentage: yup.number().required('Set quorum percentage is required').min(1, 'Minimum 1%').max(100, 'Maximum 100%').typeError('Enter valid percentage').nullable()
})
