import React, {useState, useEffect} from 'react'
import {Button, Form, TextInput, Text, Box} from 'grommet'
import Select from 'react-select'
import useForm from '../../lib/useForm'

const ENGINE_OPTIONS = [
  {label: 'Google', value: 'google'},
  {label: 'Bing', value: 'bing'},
  {label: 'Both', value: 'both'},
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

// Grommet's FormField was causing issues for focus events
// during testing, so this is a basic version of it
function FormField({children, error}) {
  return (
    <Box>
      {children}
      {error ? (
        <Text color="red" margin={{horizontal: 'small', vertical: 'xsmall'}}>
          {error}
        </Text>
      ) : null}
    </Box>
  )
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
      <FormField error={touched.text && errors.text ? errors.text : null}>
        <TextInput
          id="text"
          type="text"
          name="text"
          a11yTitle="Search"
          value={values.text}
          placeholder="Search"
          {...inputProps}
        />
      </FormField>
      <FormField error={touched.engine && errors.engine ? errors.engine : null}>
        <Select
          id="engine"
          name="engine"
          aria-label="Engine"
          placeholder="Engine"
          options={ENGINE_OPTIONS}
          onChange={value => setValue('engine', value)}
          onMenuClose={() => setTouched('engine')}
        />
      </FormField>

      <Button
        primary
        type="submit"
        margin={{top: 'small'}}
        style={{padding: '5px 10px'}}
        disabled={!isValid}
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchForm
