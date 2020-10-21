import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm'
import selectEvent from 'react-select-event'

describe('<SearchForm />', () => {
  function renderForm(overrides = {}) {
    return render(<SearchForm onSubmit={() => {}} {...overrides} />)
  }

  it('matches snapshot', () => {
    const {container} = renderForm()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls onSubmit callback on submit', async () => {
    const onSubmit = jest.fn()
    renderForm({onSubmit})

    await userEvent.type(screen.getByLabelText(/^search$/i), 'kendrick')
    await selectEvent.select(screen.getByLabelText(/^engine$/i), /google/i)

    userEvent.click(screen.getByRole('button', {name: /^search$/i}))

    expect(onSubmit.mock.calls.length).toBe(1)
  })

  describe('validations', () => {
    it('requires text', () => {
      renderForm()

      fireEvent.blur(screen.getByLabelText(/^search$/i))
      expect(screen.getByText(/^text cannot be empty$/i)).toBeInTheDocument()
      expect(screen.getByRole('button', {name: /^search$/i})).toBeDisabled()
    })

    it('requires engine', () => {
      renderForm()

      selectEvent.openMenu(screen.getByLabelText(/^engine$/i))

      // closing menu
      fireEvent.keyDown(screen.getByLabelText(/^engine$/i), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
      })

      expect(screen.getByText(/^Engine cannot be empty$/i)).toBeInTheDocument()
      expect(screen.getByRole('button', {name: /^search$/i})).toBeDisabled()
    })

    it('enables submit button if all validations pass', async () => {
      renderForm()

      await userEvent.type(screen.getByLabelText(/^search$/i), 'kendrick')
      await selectEvent.select(screen.getByLabelText(/^engine$/i), /google/i)

      expect(screen.getByRole('button', {name: /^search$/i})).toBeEnabled()
    })
  })
})
