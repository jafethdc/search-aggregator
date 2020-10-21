import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from './index'
import selectEvent from 'react-select-event'
import {search} from './api'

jest.mock('./api')

describe('<Search />', () => {
  it('calls the api with the correct params', async () => {
    render(<Search />)

    await userEvent.type(screen.getByLabelText(/^search$/i), 'kendrick')
    await selectEvent.select(screen.getByLabelText(/^engine$/i), /google/i)
    userEvent.click(screen.getByRole('button', {name: /^search$/i}))

    expect(search).toHaveBeenCalledWith({
      text: 'kendrick',
      engine: 'google',
    })
  })

  it('shows the results returned by the request', async () => {
    render(<Search />)

    await userEvent.type(screen.getByLabelText(/^search$/i), 'kendrick')
    await selectEvent.select(screen.getByLabelText(/^engine$/i), /google/i)
    userEvent.click(screen.getByRole('button', {name: /^search$/i}))

    return waitFor(() => {
      expect(screen.getByText(/good kid maad city/i)).toBeInTheDocument()
      expect(screen.getByText(/second studio album/i)).toBeInTheDocument()
    })
  })
})
