import { match } from "assert"
import { json } from "stream/consumers"
import config from "@/utils/config"

describe('User searching test', () => {
  beforeEach(() => {
    // Log in
    cy.visit('/signin');
    cy.wait(3000);
    cy.get('#emailBox').type('user@test.com');
    cy.get('#passwordBox').type('12345678');
    cy.get('#button').click();
    cy.wait(3000); 
  });

  it('Displays relevant restaurants with correct names', () => {
    // Type the restaurant name into the search bar and press enter
    const restaurantName = 'ivory';
    cy.get('#searchBar').type(restaurantName);
    cy.get('#searchBar').type('{enter}');

    // Wait for the response data
    cy.intercept('GET', `${config.api}/restaurants?search=${restaurantName}`).as('getRestaurants');
    
    cy.wait('@getRestaurants').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);

      // Parse the response body
      const response = interception.response?.body;
      const restaurants = response?.data; // Assuming restaurants are stored in a 'data' property
      
      // Verify that restaurants is an array
      expect(restaurants).to.be.an('array');

      // Verify that all restaurants in the array have the correct name
      restaurants.forEach((restaurant) => {
        expect(restaurant.name.toLowerCase()).include(restaurantName.toLowerCase());
      });
    });
  });

  it('Does not display any restaurants when searching with a wrong restaurant name', () => {
    // Type a wrong restaurant name into the search bar and press enter
    const wrongRestaurantName = 'InvalidRestaurantName';
    cy.get('#searchBar').type(wrongRestaurantName);
    cy.get('#searchBar').type('{enter}');
  
    // Ensure that no restaurants are displayed
    cy.intercept(
      { method: 'GET', url: `${config.api}/restaurants?search=${wrongRestaurantName}` },
      (req) => {
        // Remove the 'if-none-match' header to force the request
        delete req.headers['if-none-match'];
      }
    ).as('getRestaurants');
  
    cy.wait('@getRestaurants').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
  
      // Parse the response body
      const response = interception.response?.body;
      const restaurants = response?.data; // Assuming restaurants are stored in a 'data' property
  
      // Verify that restaurants is an array
      expect(restaurants).to.be.an('array');
  
      // Verify that there are no restaurants in the array
      expect(restaurants).to.have.length(0);
    });
  });

  it('Displays relevant restaurants with correct description', () => {
    // Type the restaurant name into the search bar and press enter
    const restaurantDescription = 'french';
    cy.get('#searchBar').type(restaurantDescription);
    cy.get('#searchBar').type('{enter}');

    // Wait for the response data
    cy.intercept('GET', `${config.api}/restaurants?search=${restaurantDescription}`).as('getRestaurants');
    
    cy.wait('@getRestaurants').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);

      // Parse the response body
      const response = interception.response?.body;
      const restaurants = response?.data; // Assuming restaurants are stored in a 'data' property
      
      // Verify that restaurants is an array
      expect(restaurants).to.be.an('array');

      // Verify that all restaurants in the array have the correct name
      restaurants.forEach((restaurant) => {
        expect(restaurant.description.toLowerCase()).to.include(restaurantDescription.toLowerCase());
      });
    });
  });

  it('Does not display any restaurants when searching with a wrong description', () => {
    // Type a wrong restaurant name into the search bar and press enter
    const wrongDescriptoin = 'InvalidDescription';
    cy.get('#searchBar').type(wrongDescriptoin);
    cy.get('#searchBar').type('{enter}');
  
    // Ensure that no restaurants are displayed
    cy.intercept(
      { method: 'GET', url: `${config.api}/restaurants?search=${wrongDescriptoin}` },
      (req) => {
        // Remove the 'if-none-match' header to force the request
        delete req.headers['if-none-match'];
      }
    ).as('getRestaurants');
  
    cy.wait('@getRestaurants').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
  
      // Parse the response body
      const response = interception.response?.body;
      const restaurants = response?.data; // Assuming restaurants are stored in a 'data' property
  
      // Verify that restaurants is an array
      expect(restaurants).to.be.an('array');
  
      // Verify that there are no restaurants in the array
      expect(restaurants).to.have.length(0);
    });
  });
  
});

