import React from 'react'
import {Grommet, Box} from 'grommet'
import theme from '../theme'
import Search from './Search'

function App() {
  return (
    <Grommet theme={theme}>
      <Box justify="center" align="center">
        <Search />
      </Box>
    </Grommet>
  )
}

export default App
