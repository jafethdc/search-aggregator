import React, {useState} from 'react'
import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Anchor,
} from 'grommet'
import SearchForm from './SearchForm'
import {search} from './api'

function SearchResult({result}) {
  return (
    <Card height="small" width="medium" background="light-1">
      <CardHeader pad={{horizontal: 'small'}}>
        <Heading level="4" margin={{vertical: 'small'}}>
          {result.title}
        </Heading>
      </CardHeader>
      <CardBody pad={{vertical: 'xxsmall', horizontal: 'small'}}>
        {result.description}
      </CardBody>
      <CardFooter pad="small" background="light-2">
        <Anchor href={result.url} label="Visit page" target="_blank" />
      </CardFooter>
    </Card>
  )
}

function Search() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(values) {
    setLoading(true)
    try {
      const results = await search({
        text: values.text,
        engine: values.engine.value,
      })
      setResults(results.data)
    } catch (error) {
      alert('Please try again.')
    } finally {
      setLoading(false)
    }
  }

  let content = null
  if (loading) {
    content = <div>Loading</div>
  } else if (results) {
    if (results.length) {
      content = results.map(result => (
        <SearchResult key={result.url} result={result} />
      ))
    } else {
      content = <div>No results found. Please try with a different query.</div>
    }
  }

  return (
    <Box>
      <Heading>Search</Heading>
      <SearchForm onSubmit={onSubmit} />
      <Box margin={{top: 'medium'}} gap="small">
        {content}
      </Box>
    </Box>
  )
}

export default Search
