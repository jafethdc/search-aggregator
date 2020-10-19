import React, {useState, useEffect} from 'react'
import {
  Grommet,
  Button,
  Form,
  TextInput,
  Select,
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Anchor,
  FormField,
} from 'grommet'
import useForm from '../lib/useForm'

const ENGINE_OPTIONS = [
  {label: 'Google', value: 'google'},
  {label: 'Bing', value: 'bing'},
]

const defaultInitialValues = {
  text: '',
  engine: '',
}

function validate(values) {
  const errors = {}
  if (!values.text) errors.text = 'Text cannot be empty'
  if (!values.engine) errors.engine = 'Engine cannot be empty'
  return errors
}

function SearchForm({initialValues = defaultInitialValues, onSubmit}) {
  const {
    values,
    errors,
    touched,
    isValid,
    inputProps,
    handleSubmit,
    setTouched,
    setValue,
  } = useForm({
    initialValues,
    validate,
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* <pre>{JSON.stringify({values, errors, touched}, null, 2)}</pre> */}
      <FormField htmlFor="text" error={touched.text ? errors.text : null}>
        <TextInput
          id="text"
          type="text"
          name="text"
          value={values.text}
          placeholder="Search"
          {...inputProps}
        />
      </FormField>
      <FormField htmlFor="engine" error={touched.engine ? errors.engine : null}>
        <Select
          id="engine"
          name="engine"
          options={ENGINE_OPTIONS.map(option => option.value)}
          value={values.engine}
          placeholder="Engine"
          onChange={({value}) => setValue('engine', value)}
          onClose={() => setTouched('engine')}
        />
      </FormField>

      <Button
        primary
        type="submit"
        style={{padding: '5px 10px'}}
        disabled={!isValid}
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchForm
