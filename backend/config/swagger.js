const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      "openapi": "3.0.0",
      "info": {
        "title": "Restaurant API",
        "description": "API for managing authentication, menus, reservations, reviews, and restaurants",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "https://virtserver.swaggerhub.com/OHODLAW_1/BackEndSwagger/1.0.0",
          "description": "SwaggerHub API Auto Mocking"
        },
        {
          "url": "http://localhost:4000/api/v1"
        }
      ],
      "tags": [
        {
          "name": "Auth",
          "description": "Authentication endpoints"
        },
        {
          "name": "Menus",
          "description": "Endpoints for managing restaurant menus"
        },
        {
          "name": "Reservations",
          "description": "Endpoints for making and managing reservations"
        },
        {
          "name": "Restaurants",
          "description": "Endpoints for managing restaurants"
        },
        {
          "name": "Reviews",
          "description": "Endpoints for managing restaurant reviews"
        },
        {
          "name": "Users",
          "description": "Endpoints for managing users"
        }
      ],
      "paths": {
        "/auth/login": {
          "post": {
            "tags": [
              "Auth"
            ],
            "summary": "Login user",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/auth_login_body"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Successful login",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/AuthResponse"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid credentials"
              },
              "401": {
                "description": "Unauthorized"
              }
            }
          }
        },
        "/auth/me": {
          "get": {
            "tags": [
              "Auth"
            ],
            "summary": "Get current logged in user",
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/auth/logout": {
          "get": {
            "tags": [
              "Auth"
            ],
            "summary": "Logout user",
            "responses": {
              "200": {
                "description": "Successful logout",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/inline_response_200"
                    }
                  }
                }
              }
            }
          }
        },
        "/users/{role}": {
          "post": {
            "tags": [
              "Users"
            ],
            "summary": "Create a new user",
            "parameters": [
              {
                "name": "role",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string",
                  "enum": [
                    "user",
                    "owner",
                    "admin"
                  ]
                }
              }
            ],
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "$ref": "#/components/schemas/UserInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "201": {
                "description": "User created",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "400": {
                "description": "Bad request"
              },
              "401": {
                "description": "Unauthorized"
              }
            }
          }
        },
        "/users/{id}": {
          "get": {
            "tags": [
              "Users"
            ],
            "summary": "Get a single user by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid user ID format"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "User not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "put": {
            "tags": [
              "Users"
            ],
            "summary": "Update a user by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "$ref": "#/components/schemas/UserInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "User updated successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "400": {
                "description": "Bad request"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "User not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "delete": {
            "tags": [
              "Users"
            ],
            "summary": "Delete a user by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "User deleted successfully"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "User not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/restaurants/{restaurantId}/menus": {
          "get": {
            "tags": [
              "Menus"
            ],
            "summary": "Get all menus for a restaurant",
            "parameters": [
              {
                "name": "restaurantId",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/MenusResponse"
                    }
                  }
                }
              },
              "400": {
                "description": "Reference error"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "post": {
            "tags": [
              "Menus"
            ],
            "summary": "Create a new menu for a restaurant",
            "parameters": [
              {
                "name": "restaurantId",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "$ref": "#/components/schemas/MenuInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "201": {
                "description": "Menu created successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Menu"
                    }
                  }
                }
              },
              "400": {
                "description": "Validation error"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/menus/{id}": {
          "get": {
            "tags": [
              "Menus"
            ],
            "summary": "Get a single menu",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Menu"
                    }
                  }
                }
              },
              "400": {
                "description": "Invalid menu ID format"
              },
              "404": {
                "description": "Menu not found"
              },
              "500": {
                "description": "Internal server error"
              }
            }
          },
          "put": {
            "tags": [
              "Menus"
            ],
            "summary": "Update a menu",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MenuInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Menu updated successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Menu"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "delete": {
            "tags": [
              "Menus"
            ],
            "summary": "Delete a menu",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Menu deleted successfully"
              },
              "401": {
                "description": "Unauthorized"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/restaurants/{restaurantId}/reservations": {
          "get": {
            "tags": [
              "Reservations"
            ],
            "summary": "Get all reservations for a restaurant",
            "parameters": [
              {
                "name": "restaurantId",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ReservationsResponse"
                    }
                  }
                }
              },
              "400": {
                "description": "Reference error"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "post": {
            "tags": [
              "Reservations"
            ],
            "summary": "Create a new reservation for a restaurant",
            "parameters": [
              {
                "name": "restaurantId",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "201": {
                "description": "Reservation created",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Reservation"
                    }
                  }
                }
              },
              "400": {
                "description": "Bad request"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/reservations": {
          "get": {
            "tags": [
              "Reservations"
            ],
            "summary": "Get all reservations",
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ReservationsResponse"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/reservations/{id}": {
          "get": {
            "tags": [
              "Reservations"
            ],
            "summary": "Get a reservation by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Reservation"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Reservation not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "put": {
            "tags": [
              "Reservations"
            ],
            "summary": "Update a reservation",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReservationInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Reservation updated",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Reservation"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Reservation not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "delete": {
            "tags": [
              "Reservations"
            ],
            "summary": "Delete a reservation",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Reservation deleted"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Reservation not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/restaurants": {
          "get": {
            "tags": [
              "Restaurants"
            ],
            "summary": "Get all restaurants",
            "parameters": [
              {
                "name": "name",
                "in": "query",
                "description": "Name of the restaurant to search for",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                  "type": "string"
                }
              },
              {
                "name": "menu",
                "in": "query",
                "description": "Name of the menu to search for",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/RestaurantsResponse"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "post": {
            "tags": [
              "Restaurants"
            ],
            "summary": "Create a new restaurant",
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "$ref": "#/components/schemas/RestaurantInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "201": {
                "description": "Restaurant created successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Restaurant"
                    }
                  }
                }
              },
              "400": {
                "description": "Bad request"
              },
              "401": {
                "description": "Unauthorized"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/restaurants/{id}": {
          "get": {
            "tags": [
              "Restaurants"
            ],
            "summary": "Get a single restaurant by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Restaurant"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "put": {
            "tags": [
              "Restaurants"
            ],
            "summary": "Update a restaurant by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "multipart/form-data": {
                  "schema": {
                    "$ref": "#/components/schemas/RestaurantInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Restaurant updated successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Restaurant"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "delete": {
            "tags": [
              "Restaurants"
            ],
            "summary": "Delete a restaurant by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Restaurant deleted successfully"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/restaurants/{restaurantId}/reviews": {
          "get": {
            "tags": [
              "Reviews"
            ],
            "summary": "Get all reviews for a restaurant",
            "parameters": [
              {
                "name": "restaurantId",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ReviewsResponse"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "post": {
            "tags": [
              "Reviews"
            ],
            "summary": "Create a new review for a restaurant",
            "parameters": [
              {
                "name": "restaurantId",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReviewInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "201": {
                "description": "Review created",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Review"
                    }
                  }
                }
              },
              "400": {
                "description": "Bad request"
              },
              "404": {
                "description": "Restaurant not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/reviews/{id}": {
          "get": {
            "tags": [
              "Reviews"
            ],
            "summary": "Get a review by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Review"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Review not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "put": {
            "tags": [
              "Reviews"
            ],
            "summary": "Update a review by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ReviewInput"
                  }
                }
              },
              "required": true
            },
            "responses": {
              "200": {
                "description": "Review updated",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Review"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Review not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          },
          "delete": {
            "tags": [
              "Reviews"
            ],
            "summary": "Delete a review by ID",
            "parameters": [
              {
                "name": "id",
                "in": "path",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Review deleted"
              },
              "401": {
                "description": "Unauthorized"
              },
              "404": {
                "description": "Review not found"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        },
        "/reviews": {
          "get": {
            "tags": [
              "Reviews"
            ],
            "summary": "Get all reviews",
            "responses": {
              "200": {
                "description": "Successful response",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/ReviewsResponse"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized"
              },
              "500": {
                "description": "Internal server error"
              }
            },
            "security": [
              {
                "bearerAuth": []
              }
            ]
          }
        }
      },
      "components": {
        "schemas": {
          "User": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string"
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "tel": {
                "type": "string"
              },
              "role": {
                "type": "string",
                "enum": [
                  "user",
                  "owner",
                  "admin"
                ]
              },
              "img": {
                "type": "string"
              },
              "createdAt": {
                "type": "string",
                "format": "date-time"
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time"
              }
            }
          },
          "AuthResponse": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "token": {
                "type": "string"
              }
            }
          },
          "Menu": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "img": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "restaurant": {
                "type": "string"
              },
              "createdAt": {
                "type": "string",
                "format": "date-time"
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time"
              }
            }
          },
          "MenuInput": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "img": {
                "type": "string",
                "format": "binary"
              },
              "description": {
                "type": "string"
              }
            }
          },
          "MenusResponse": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "count": {
                "type": "integer"
              },
              "message": {
                "type": "string"
              },
              "data": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Menu"
                }
              }
            }
          },
          "Reservation": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "datetime": {
                "type": "string",
                "format": "date-time"
              },
              "seat": {
                "type": "integer"
              },
              "user": {
                "type": "string"
              },
              "restaurant": {
                "type": "string"
              },
              "date": {
                "type": "string"
              },
              "time": {
                "type": "string"
              },
              "createdAt": {
                "type": "string",
                "format": "date-time"
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time"
              }
            }
          },
          "ReservationInput": {
            "type": "object",
            "properties": {
              "datetime": {
                "type": "string",
                "format": "date-time"
              },
              "seat": {
                "type": "integer"
              }
            }
          },
          "ReservationsResponse": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "count": {
                "type": "integer"
              },
              "message": {
                "type": "string"
              },
              "data": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Reservation"
                }
              }
            }
          },
          "Restaurant": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "img": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "tel": {
                "type": "string"
              },
              "street": {
                "type": "string"
              },
              "locality": {
                "type": "string"
              },
              "district": {
                "type": "string"
              },
              "province": {
                "type": "string"
              },
              "zipcode": {
                "type": "string"
              },
              "closeDate": {
                "type": "array",
                "items": {
                  "type": "integer"
                }
              },
              "open": {
                "type": "string"
              },
              "close": {
                "type": "string"
              },
              "owner": {
                "type": "string"
              },
              "createdAt": {
                "type": "string",
                "format": "date-time"
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time"
              }
            }
          },
          "RestaurantInput": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "img": {
                "type": "string",
                "format": "binary"
              },
              "description": {
                "type": "string"
              },
              "tel": {
                "type": "string"
              },
              "street": {
                "type": "string"
              },
              "locality": {
                "type": "string"
              },
              "district": {
                "type": "string"
              },
              "province": {
                "type": "string"
              },
              "zipcode": {
                "type": "string"
              },
              "closeDate": {
                "type": "array",
                "items": {
                  "type": "integer"
                }
              },
              "open": {
                "type": "string"
              },
              "close": {
                "type": "string"
              }
            }
          },
          "RestaurantsResponse": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "count": {
                "type": "integer"
              },
              "message": {
                "type": "string"
              },
              "data": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Restaurant"
                }
              }
            }
          },
          "Review": {
            "type": "object",
            "properties": {
              "_id": {
                "type": "string"
              },
              "rating": {
                "type": "number"
              },
              "comment": {
                "type": "string"
              },
              "user": {
                "type": "string"
              },
              "restaurant": {
                "type": "string"
              },
              "createdAt": {
                "type": "string",
                "format": "date-time"
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time"
              }
            }
          },
          "ReviewInput": {
            "type": "object",
            "properties": {
              "rating": {
                "type": "number"
              },
              "comment": {
                "type": "string"
              }
            }
          },
          "ReviewsResponse": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "count": {
                "type": "integer"
              },
              "message": {
                "type": "string"
              },
              "data": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Review"
                }
              }
            }
          },
          "UserInput": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string"
              },
              "password": {
                "type": "string"
              },
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "tel": {
                "type": "string"
              },
              "role": {
                "type": "string",
                "enum": [
                  "user",
                  "owner",
                  "admin"
                ]
              },
              "img": {
                "type": "string",
                "format": "binary"
              }
            }
          },
          "auth_login_body": {
            "type": "object",
            "properties": {
              "email": {
                "type": "string"
              },
              "password": {
                "type": "string"
              }
            }
          },
          "inline_response_200": {
            "type": "object",
            "properties": {
              "success": {
                "type": "boolean"
              },
              "data": {
                "type": "object"
              }
            }
          }
        },
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
        }
      }
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
