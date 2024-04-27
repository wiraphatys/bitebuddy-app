import React from 'react'
import RestaurantsPage from './page'

describe('<RestaurantsPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RestaurantsPage />)
  })
})