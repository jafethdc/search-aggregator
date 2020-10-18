import React, {useState, useEffect} from 'react'
import axios from 'axios'

function search(params) {
  return axios.get('/api/search', {params})
}

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
    inputProps: {
      onChange: handleChange,
      onBlur: handleBlur,
    },
    handleSubmit,
  }
}

function SearchForm({initialValues = defaultInitialValues, onSubmit}) {
  const {values, errors, touched, isValid, inputProps, handleSubmit} = useForm({
    initialValues,
    validate,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <pre>{JSON.stringify({values, errors, touched}, null, 2)}</pre>
      <input type="text" name="text" value={values.text} {...inputProps} />
      <select name="engine" value={values.engine} {...inputProps}>
        <option value="">Select an engine</option>
        {ENGINE_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button type="submit" disabled={!isValid}>
        Search
      </button>
    </form>
  )
}

function Home() {
  const [results, setResults] = useState([])
  async function onSubmit(values) {
    console.log('values', values)
    try {
      const results = await search(values)
      console.log('results', results)
      setResults(results.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      Home!!!!
      <SearchForm onSubmit={onSubmit} />
      <div>
        {results.map(result => (
          <div key={result.url}>
            <p>url: {result.url}</p>
            <p>title: {result.title}</p>
            <p>description: {result.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
