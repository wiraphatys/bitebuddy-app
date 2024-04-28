const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import required models and functions
const Review = require('../models/ReviewModel');
const Restaurant = require('../models/RestaurantModel');
const { deleteReviewById } = require('../controllers/ReviewController');

describe('reviewController.deleteReviewById', () => {
  let mongoServer;
  let connection;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a mock review
    const mockReview1 = new Review({
      _id: '67127491ede37740c58572e1',
      rating: 4,
      user: '662d0b6100ccd592b35c4cd9',
      restaurant: '66127491ede37740c58572e1',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await mockReview1.save();

    const mockReview2 = new Review({
      _id: '67127491ede37740c58572e2',
      rating: 4,
      user: '662d0b6100ccd592b35c4cd9',
      restaurant: '66127491ede37740c58572e2',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await mockReview2.save();

    const mockReview3 = new Review({
      _id: '67127491ede37740c58572e3',
      rating: 4,
      user: '662d0b6100ccd592b35c4cd9',
      restaurant: '66127491ede37740c58572e3',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await mockReview3.save();

    // Create a mock restaurant
    const mockRestaurant1 = new Restaurant({
      _id: "66127491ede37740c58572e1",
      name: "Tak, Stockholm",
      img: "https://bitebuddycloud.s3.ap-southeast-1.amazonaws.com/f99bc39f7cef390cf1e54acfa69279addc9a82c6df47a16f43d7c70c2a71a54c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GDXBI3R753ZLH6%2F20240427%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240427T142914Z&X-Amz-Expires=900&X-Amz-Signature=8fdd33696fd86664d128a6fea462f995e43392a7845f6ed7481399592d357f89&X-Amz-SignedHeaders=host&x-id=GetObject",
      description: "TAK opened its doors March 2017 under the direction of our Culinary Director, Frida Ronge. To hang out at TAK should always be something else, something new, something more, and we exist to bring inspiration and innovation to the table.\nAt TAK we have many wonderful restaurants, bars, chambre séparées and event spaces. Read about each space below.",
      tel: "020000000",
      street: "Brunkebergstorg",
      locality: "2-4-111 51",
      district: "Stockholm",
      province: "Stockholm",
      zipcode: "10000",
      closeDate: [
        0,
        6
      ],
      open: "10:00",
      close: "23:00",
      owner: "661e4ac0e07c81b045a62e39",
      createdAt: "2024-04-16T10:01:35.352Z",
      updatedAt: "2024-04-16T10:01:35.352Z"
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

  describe('when deleting a review successfully', () => {
    it('should return a 200 status code', async () => {
      // Mock the request and response objects
      const req = {
        params: {
          id: '67127491ede37740c58572e1',
        },
        user: {
          id: '662d0b6100ccd592b35c4cd9',
          role: 'user',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      // Call the deleteReviewById function
      await deleteReviewById(req, res, jest.fn());

      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0].success).toBe(true);
    });
  });

  describe('when trying to delete a review without permission', () => {
    it('should return a 401 status code', async () => {
      // Mock the request and response objects
      const req = {
        params: {
          id: '67127491ede37740c58572e2',
        },
        user: {
          id: '662d0b6100ccd592b355897',
          role: 'user',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      // Call the deleteReviewById function
      await deleteReviewById(req, res, jest.fn());

      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `This user ${req.user.id} is not authorized to delete this review`
      });
    });
  });

  describe('when trying to delete a non-existing review', () => {
    it('should return a 404 status code', async () => {
      // Mock the request and response objects
      const req = {
        params: {
          id: '67127491ede37740c5857789',
        },
        user: {
          id: '662d0b6100ccd592b35c4cd9',
          role: 'user',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      // Call the deleteReviewById function
      await deleteReviewById(req, res, jest.fn());

      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `This user ${req.user.id} is not authorized to delete this review`
      });
    });
  });

  describe('when encountering an error while deleting a review', () => {
    it('should return a 500 status code', async () => {
      // Mock the request and response objects
      const req = {
        params: {
          id: '67127491ede37740c58572e3',
        },
        user: {
          id: '662d0b6100ccd592b35c4cd9',
          role: 'user',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
      const next = jest.fn();
  
      // Mocking a scenario where findByIdAndDelete function throws an error
      Review.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Mock error'));
  
      // Call the deleteReviewById function
      await deleteReviewById(req, res, next);
  
      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cannot delete Review'
      });
    });
  });
  
  
});
