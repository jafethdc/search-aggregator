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
import axios from 'axios'
import SearchForm from './SearchForm'

function search(params) {
  return axios.get('/api/search', {params})
}

function Search() {
  const [results, setResults] = useState([])
  async function onSubmit(values) {
    try {
      const results = await search(values)
      console.log('results', results)
      setResults(results.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Box>
      <Heading>Search</Heading>
      <SearchForm onSubmit={onSubmit} />
      <Box margin={{top: 'medium'}} gap="small">
        {results.map(result => (
          <Card
            key={result.url}
            height="small"
            width="medium"
            background="light-1"
          >
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
        ))}
      </Box>
    </Box>
  )
}

export default Search
