import { useState, useEffect, useCallback } from "react";
let thisError = {}

const useForm = (initialValues = {}, callback, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(thisError);
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      if (Object.keys(errors).length === 0 && isSubmitting)
        callback();
    }
    setIsSubmit(false);
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    setIsSubmit(false);
    onChangeValidation();
  }, [values]);

  const onChangeValidation = () => {
    if (isSubmitting) {
      setErrors(false);
      if (validate === undefined) setErrors({});
      if (validate === null) setErrors({});
      if (validate !== undefined && validate) setErrors(validate(values));
    }
  }

  const handleSubmit = useCallback((e) => {
    // console.log("handleworks")
    if (e) e.preventDefault();

    setValues(values => ({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    }));
    setIsSubmit(true);
    setIsSubmitting(true);
    setErrors(false);
    if (validate === undefined) setErrors({});
    if (validate === null) setErrors({});
    if (validate !== undefined && validate) setErrors(validate(values));
  }, [values]);

  const setUpdateValue = useCallback((field, value) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));
  }, []);

  const handleChange = useCallback((e) => {
    // e.persist();
    let text = e.target.value;
    if (e.target.name === 'description')
      setValues(values => ({
        ...values,
        [e.target.name]: text?.length <= 500 ? text : text.toString().slice(0, 500)
      }));
    else if (e.target.name === 'title')
      setValues(values => ({
        ...values,
        [e.target.name]: text?.length <= 100 ? text : text.toString().slice(0, 100)
      }));
    else
      setValues(values => ({
        ...values,
        [e.target.name]: text
      }));
  }, []);

  const handlePercentageNumberChange = useCallback((e) => {
    // console.log("e",e.target.value);
    e.persist();
    if (isNaN(e.target.value)) return

    if (e.target.value === '')
      setValues(values => ({
        ...values,
        [e.target.name]: null
      }));
    else
      setValues(values => ({
        ...values,
        [e.target.name]: e.target.value?.length <= 5 ? e.target.value : e.target.value.toString().slice(0, 5)
      }));
  }, []);

  return {
    setUpdateValue,
    handlePercentageNumberChange,
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    errors,
  };
};

export default useForm;
