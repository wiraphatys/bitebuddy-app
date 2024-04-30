import { request } from "http"
import config from "@/utils/config"

describe('us5-3,4', () => {
  beforeEach(() => {

    cy.visit('/signin')
    cy.wait(2000)
    
    // signin
    cy.get('div').get('form').within(()=>{
      cy.get("[type='email']").type('admin@cypress.com')
      cy.get("[type='password']").type('12345678')
      cy.get('button').click()
      cy.wait(2000)
    })

    cy.visit('/restaurants')
    cy.wait(4000)
    // restaurants
  })

  it('admin search correct restaurants', () => {
    const restaurantName = 'Ivory'

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

  it('admin search wrong restaurants', () => {
    const restaurantName = 'Ivoryy'

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

  it('admin search correct description', () => {
    const description = 'French'

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

  it('admin search wrong description', () => {
    const description = 'Frenchh'

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
  
  afterEach(() => {
    cy.visit('/')
  })
})