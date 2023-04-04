import { useState, useEffect, useCallback } from "react";
let thisError = {}
// interface setSTateType {
//   [name: string];
// }
// daskd
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
    setIsSubmit(true);
    setIsSubmitting(true);
    setErrors(false);
    if (validate === undefined) setErrors({});
    if (validate === null) setErrors({});
    if (validate !== undefined && validate) setErrors(validate(values));
  }, [values]);

  const handleCurrentVal = (obj) => {
    setValues(obj);
  };

  const resetForm = useCallback(() => {
    setIsSubmitting(false);
    setErrors({});
    setValues(initialValues);
    // eslint-disable-next-line
  }, []);

  const setUpdateValue = useCallback((field, value) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));
  }, []);

  const handleChange = useCallback((e) => {
    // e.persist();
    if (e.target.name === 'description')
      setValues(values => ({
        ...values,
        [e.target.name]: e.target.value?.length <= 500 ? e.target.value : e.target.value.toString().slice(0, 500)
      }));
    else
      setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
      }));
  }, []);

  const handleNumberChange = useCallback((e) => {
    e.persist();
    if (isNaN(e.target.value)) return;
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleDecimalNumberChange = useCallback((e) => {
    e.persist();
    // const floatRegExp = new RegExp('^([0-9]+([.][0-9]*)?|[.][0-9])$')
    // console.log('e.target.value', e.target.value);
    // console.log('test', e.target.value.match(/^\d+(\.\d+)?$/));
    if (isNaN(+e.target.value)) return;
    // if (!e.target.value.match(/^\d+(\.\d+)?$/)) return;
    // if(e.target.value==='' ||  e.target.value.match(/^\d+(\.\d+)?$/))
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    if(!rx_live.test(e.target.value)) return;
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value ?
      !(e.target.value.indexOf(".") == -1)?
       e.target.value?.length <= 10 ? e.target.value : e.target.value.toString().slice(0, 10) :
       e.target.value?.length <= 7 ? e.target.value : e.target.value.toString().slice(0, 7)
        : null
    }));
  }, []);

  const handlePercentageNumberChange = useCallback((e) => {
    // console.log("e",e.target.value);
    e.persist();
    if (isNaN(e.target.value)) return

    if(e.target.value === '')
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

  const handleKeyPress = useCallback((e) => {
    if (!/^\d{1,10}(\.\d{0,4})?$/.test(e.target.value)) {
      e.persist();
      return null;
    }
    let thisName = e.target.name;
    let thisValue = e.target.value;
    setValues(values => ({
      ...values,
      [thisName]: thisValue
    }));
    // eslint-disable-next-line
  },
    // eslint-disable-next-line
    [values]
  );

  const handleDateChange = useCallback((date, name = "date") => {
    date = new Date(date);
    let value = date.getTime();
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = useCallback((e, name = "select") => {
    let value = e ? e.value : null;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleRadioChange = useCallback((e) => {
    console.log("radiobtn", e)
    let value = e.target.value;
    let name = e.target.name;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleMultiSelectChange = useCallback((e, name = "mselect") => {
    let itemIds = [];
    if (e !== null && e.length > 0) {
      e.forEach((item) => {
        itemIds.push(item.value);
      });
    }

    setValues(values => ({
      ...values,
      [name]: itemIds,
      [name + "Label"]: e
    }));

    // eslint-disable-next-line
  }, []);

  const handleCheckboxChange = useCallback((value, name = "checkbox") => {
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleFileChange = useCallback((e) => {
    // e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.files[0]
    }));
    // eslint-disable-next-line
  }, []);

  const handleSelectDefault = useCallback((e, name = "select") => {
    let value = e ? e.target.value : null;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleChangeReview = useCallback((i, input) => (e) => {
    // e.persist();
    if (isNaN(e.target.value)) return;
    let dishes = [...values.dishes];
    if (input === 'quantity') {
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        let qty = e.target.value?.length <= 2 ? e.target.value : e.target.value.toString().slice(0, 2);
        // qty = qty==0? 1 : qty;
        dishes[i].quantity = +qty;
        dishes[i].totalamount = (qty * dishes[i].unitprice).toFixed(2);
      }
    }
    setValues({ ...values, dishes: [...dishes] })
  }, [])

  const handleChangeCount = useCallback((i, type) => (e) => {
    // if (isNaN(e.target.value)) return;
    let dishes = [...values.dishes];
    // if (input === 'quantity') {
    // const re = /^[0-9\b]+$/;
    // if(e.target.value === '' || re.test(e.target.value)) {
    let qty = type === 'add' ? dishes[i].quantity + 1 : dishes[i].quantity === 1 ? 1 : dishes[i].quantity - 1;
    // qty = qty==0? 1 : qty;
    dishes[i].quantity = +qty;
    dishes[i].totalamount = (+qty * dishes[i].unitprice).toFixed(2);
    // }
    // }
    setValues({ ...values, dishes: [...dishes] })
  }, [])

  return {
    handleChange,
    handleNumberChange,
    handleDecimalNumberChange,
    handlePercentageNumberChange,
    handleDateChange,
    handleSelectChange,
    handleKeyPress,
    handleMultiSelectChange,
    handleSubmit,
    setUpdateValue,
    resetForm,
    handleCurrentVal,
    handleCheckboxChange,
    handleFileChange,
    handleRadioChange,
    handleSelectDefault,
    handleChangeReview,
    handleChangeCount,
    values,
    isSubmitting,
    errors,
  };
};

export default useForm;
