import { request } from "http"
import config from "@/utils/config"

describe('epic5', () => {
  beforeEach(() => {
    // home
    cy.visit('/')
    cy.visit('/signin')
    cy.wait(2000)
    
    // signin
    cy.get('div').get('form').within(()=>{
      cy.get("[type='email']").type('admin@cypress.com')
      cy.get("[type='password']").type('12345678')
      cy.get('button').click()
    
    // restaurants
    cy.wait(2000)
    })
  })

  it('admin search correct restaurants', () => {
    const restaurantName = 'KFC'

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
        expect(restaurant.name).equal(restaurantName)
      })
    })
  })

  it('admin search wrong restaurants', () => {
    const restaurantName = 'vyinvalidrestaurant'

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

  it('admin search correct menu', () => {
    const menuName = 'chicken'

    cy.intercept({
      method: 'GET',
      url: `${config.api}/restaurants?search=${menuName}`},
      req => {
        delete req.headers['if-none-match']
    }).as('getRestaurant')

    
    cy.get('div').get('div').get('div').get('input').first().type(menuName)
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
        expect(restaurant.description).include(menuName)
      })
    })
  })

  it('admin search wrong menu', () => {
    const menuName = 'vyinvalidmenu'

    cy.intercept({
      method: 'GET',
      url: `${config.api}/restaurants?search=${menuName}`},
      req => {
        delete req.headers['if-none-match']
    }).as('getRestaurant')

    
    cy.get('div').get('div').get('div').get('input').first().type(menuName)
    cy.get('div').get('div').get('div').get('button').click()

    cy.wait(2000)
    cy.wait('@getRestaurant').should(({response}) => {
      expect(response?.statusCode).equal(200)
      expect(response?.body.data).be.not.null
      expect(response?.body.data).to.have.length(0)
    })
  })
})