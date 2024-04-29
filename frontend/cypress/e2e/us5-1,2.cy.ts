import { request } from "http"
import config from "@/utils/config"

describe('us5-1,2', () => {
  beforeEach(() => {

    cy.visit('/signin')
    cy.wait(2000)
    
    // signin
    cy.get('div').get('form').within(()=>{
      cy.get("[type='email']").type('user@test.com')
      cy.get("[type='password']").type('12345678')
      cy.get('button').click()
    
    // restaurants
    cy.wait(2000)
    })
  })

  it('user search correct restaurants', () => {
    const restaurantName = 'ivory'

    cy.intercept({
      method: 'GET',
      url: `${config.api}/restaurants?search=${restaurantName}`},
      req => {
        delete req.headers['if-none-match']
    }).as('getRestaurant')

    
    cy.get('div').get('div').get('div').get('input').first().type(restaurantName)
    cy.get('div').get('div').get('div').get('button').click()

    var restaurants:string[] = []

    cy.wait(2000)
    cy.wait('@getRestaurant').should(({response}) => {
      expect(response?.statusCode).equal(200)
      expect(response?.body.data).be.not.null
      expect(response?.body.data).not.to.have.length(0)
      restaurants = response?.body.data 
    }).then(()=>{
      restaurants.forEach( (restaurant) => {
        expect(restaurant.name.toLowerCase()).include(restaurantName.toLowerCase())
      })
    })
  })

  it('user search wrong restaurants', () => {
    const restaurantName = 'invaliddd'

    cy.intercept({
      method: 'GET',
      url: `${config.api}/restaurants?search=${restaurantName}`},
      req => {
        delete req.headers['if-none-match']
    }).as('getRestaurant')

    
    cy.get('div').get('div').get('div').get('input').first().type(restaurantName)
    cy.get('div').get('div').get('div').get('button').click()

    cy.wait(2000)
    cy.wait('@getRestaurant').should(({response}) => {
      expect(response?.statusCode).equal(200)
      expect(response?.body.data).be.not.null
      expect(response?.body.data).to.have.length(0)
    })
  })

  it('user search correct description', () => {
    const description = 'french'

    cy.intercept({
      method: 'GET',
      url: `${config.api}/restaurants?search=${description}`},
      req => {
        delete req.headers['if-none-match']
    }).as('getRestaurant')

    
    cy.get('div').get('div').get('div').get('input').first().type(description)
    cy.get('div').get('div').get('div').get('button').click()

    var restaurants:string[] = []

    cy.wait(2000)
    cy.wait('@getRestaurant').should(({response}) => {
      expect(response?.statusCode).equal(200)
      expect(response?.body.data).be.not.null
      expect(response?.body.data).not.to.have.length(0)
      restaurants = response?.body.data 
    }).then(()=>{
      restaurants.forEach( (restaurant) => {
        expect(restaurant.description.toLowerCase()).include(description.toLowerCase())
      })
    })
  })

  it('user search wrong description', () => {
    const description = 'invaliddd'

    cy.intercept({
      method: 'GET',
      url: `${config.api}/restaurants?search=${description}`},
      req => {
        delete req.headers['if-none-match']
    }).as('getRestaurant')

    
    cy.get('div').get('div').get('div').get('input').first().type(description)
    cy.get('div').get('div').get('div').get('button').click()

    cy.wait(2000)
    cy.wait('@getRestaurant').should(({response}) => {
      expect(response?.statusCode).equal(200)
      expect(response?.body.data).be.not.null
      expect(response?.body.data).to.have.length(0)
    })
  })
})