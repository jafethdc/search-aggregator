import React, {useState, useEffect} from 'react'

function useForm({initialValues = {}, validate = () => ({})}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = ({target}) =>
    setValues(oldValues => ({
      ...oldValues,
      [target.name]: target.value,
    }))

  const handleBlur = ({target}) =>
    setTouched(oldTouched => ({...oldTouched, [target.name]: true}))

  const handleSubmit = onSubmit => event => {
    event.preventDefault()
    onSubmit(values)
  }

  useEffect(() => {
    setErrors(validate(values))
  }, [values])

  return {
    values,
    errors,
    touched,
    isValid: Object.keys(errors).length === 0,
    setValue: (name, value) =>
      setValues(oldValues => ({
        ...oldValues,
        [name]: value,
      })),
    setTouched: name =>
      setTouched(oldTouched => ({...oldTouched, [name]: true})),
    inputProps: {
      onChange: handleChange,
      onBlur: handleBlur,
    },
    handleSubmit,
  }
}

export default useForm
