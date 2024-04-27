const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import required models and functions
const Review = require('../models/ReviewModel');
const Restaurant = require('../models/RestaurantModel');
const { createReview } = require('../controllers/reviewController');

describe('reviewController.createReview', () => {
  let mongoServer;
  let connection;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a mock restaurant
    const mockRestaurant1 = new Restaurant({
      "_id": "66127491ede37740c58572e1",
      "name": "Tak, Stockholm",
      "img": "https://bitebuddycloud.s3.ap-southeast-1.amazonaws.com/f99bc39f7cef390cf1e54acfa69279addc9a82c6df47a16f43d7c70c2a71a54c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDXBI3R753ZLH6%2F20240427%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240427T142914Z&X-Amz-Expires=900&X-Amz-Signature=8fdd33696fd86664d128a6fea462f995e43392a7845f6ed7481399592d357f89&X-Amz-SignedHeaders=host&x-id=GetObject",
      "description": "TAK opened its doors March 2017 under the direction of our Culinary Director, Frida Ronge. To hang out at TAK should always be something else, something new, something more, and we exist to bring inspiration and innovation to the table.\nAt TAK we have many wonderful restaurants, bars, chambre séparées and event spaces. Read about each space below.",
      "tel": "020000000",
      "street": "Brunkebergstorg",
      "locality": "2-4-111 51",
      "district": "Stockholm",
      "province": "Stockholm",
      "zipcode": "10000",
      "closeDate": [
        0,
        6
      ],
      "open": "10:00",
      "close": "23:00",
      "owner": "661e4ac0e07c81b045a62e39",
      "createdAt": "2024-04-16T10:01:35.352Z",
      "updatedAt": "2024-04-16T10:01:35.352Z"
    });
    await mockRestaurant1.save();

    const mockRestaurant2 = new Restaurant({
      "_id": "66127491ede37740c58572e2",
      "name": "Tak, Stockholm",
      "img": "https://bitebuddycloud.s3.ap-southeast-1.amazonaws.com/f99bc39f7cef390cf1e54acfa69279addc9a82c6df47a16f43d7c70c2a71a54c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDXBI3R753ZLH6%2F20240427%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240427T142914Z&X-Amz-Expires=900&X-Amz-Signature=8fdd33696fd86664d128a6fea462f995e43392a7845f6ed7481399592d357f89&X-Amz-SignedHeaders=host&x-id=GetObject",
      "description": "TAK opened its doors March 2017 under the direction of our Culinary Director, Frida Ronge. To hang out at TAK should always be something else, something new, something more, and we exist to bring inspiration and innovation to the table.\nAt TAK we have many wonderful restaurants, bars, chambre séparées and event spaces. Read about each space below.",
      "tel": "020000000",
      "street": "Brunkebergstorg",
      "locality": "2-4-111 51",
      "district": "Stockholm",
      "province": "Stockholm",
      "zipcode": "10000",
      "closeDate": [
        0,
        6
      ],
      "open": "10:00",
      "close": "23:00",
      "owner": "661e4ac0e07c81b045a62e39",
      "createdAt": "2024-04-16T10:01:35.352Z",
      "updatedAt": "2024-04-16T10:01:35.352Z"
    });
    await mockRestaurant2.save();

    const mockRestaurant3 = new Restaurant({
      "_id": "66127491ede37740c58572e3",
      "name": "Tak, Stockholm",
      "img": "https://bitebuddycloud.s3.ap-southeast-1.amazonaws.com/f99bc39f7cef390cf1e54acfa69279addc9a82c6df47a16f43d7c70c2a71a54c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDXBI3R753ZLH6%2F20240427%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240427T142914Z&X-Amz-Expires=900&X-Amz-Signature=8fdd33696fd86664d128a6fea462f995e43392a7845f6ed7481399592d357f89&X-Amz-SignedHeaders=host&x-id=GetObject",
      "description": "TAK opened its doors March 2017 under the direction of our Culinary Director, Frida Ronge. To hang out at TAK should always be something else, something new, something more, and we exist to bring inspiration and innovation to the table.\nAt TAK we have many wonderful restaurants, bars, chambre séparées and event spaces. Read about each space below.",
      "tel": "020000000",
      "street": "Brunkebergstorg",
      "locality": "2-4-111 51",
      "district": "Stockholm",
      "province": "Stockholm",
      "zipcode": "10000",
      "closeDate": [
        0,
        6
      ],
      "open": "10:00",
      "close": "23:00",
      "owner": "661e4ac0e07c81b045a62e39",
      "createdAt": "2024-04-16T10:01:35.352Z",
      "updatedAt": "2024-04-16T10:01:35.352Z"
    });
    await mockRestaurant3.save();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('when creating a review successfully', () => {
    it('should return a 200 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
          rating: 4, // Valid rating value
          // Other required fields
        },
        params: {
          restaurantId: '66127491ede37740c58572e2',
        },
        user: {
          id: '662d0b6100ccd592b35c4cd9',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() // Add the json method here
      };

      // Call the createReview function
      await createReview(req, res, jest.fn());
      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0].success).toBe(true);
    });
  });

  describe('when the user has already written a review for the restaurant', () => {
    it('should return a 400 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
          rating: 4, // Valid rating value
          // Other required fields
        },
        params: {
          restaurantId: '66127491ede37740c58572e1',
        },
        user: {
          id: '662d0b6100ccd592b35c4cd9',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Create a mock existing review
      const existingReview = new Review({
        user: req.user.id,
        restaurant: req.params.restaurantId,
        rating: req.body.rating
        // Other review fields
      });
      await existingReview.save();

      // Call the createReview function
      await createReview(req, res, jest.fn());

      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: "You've already written the review for this restaurant.",
      });
    });
  });

  describe('when the restaurant does not exist', () => {
    it('should return a 404 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
          rating: 4, // Valid rating value
          // Other required fields
        },
        params: {
          restaurantId: '5fc60fcdeaf1457d361c7b8a',
        },
        user: {
          id: '662d0b6100ccd592b35c4cd9',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Call the createReview function
      await createReview(req, res, jest.fn());

      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `Not found restaurant ID of ${req.params.restaurantId}`
      });
    });
  });

  describe('when review rating is invalid', () => {
    it('should return a 400 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
          rating: 6, // Invalid rating value
          // Other required fields
        },
        params: {
          restaurantId: '66127491ede37740c58572e3',
        },
        user: {
          id: '662d0b6100ccd592b35c4cd9',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Call the createReview function
      await createReview(req, res, jest.fn());

      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `rating value can only between 0-5`
      });
    });
  });

});