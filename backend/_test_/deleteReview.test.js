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
    const mockReview = new Review({
      _id: '66127491ede37740c58572e1',
      rating: 4,
      user: '662d0b6100ccd592b35c4cd9',
      restaurant: '66127491ede37740c58572e2',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await mockReview.save();
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
          id: '66127491ede37740c58572e1',
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
          id: '66127491ede37740c58572e1',
        },
        user: {
          id: '662d0b6100ccd592b35c4ce1', //nonExistingUserId
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

  // describe('when trying to delete a non-existing review', () => {
  //   it('should return a 404 status code', async () => {
  //     // Mock the request and response objects
  //     const req = {
  //       params: {
  //         id: 'nonExistingReviewId', //nonExistingReviewId
  //       },
  //       user: {
  //         id: '662d0b6100ccd592b35c4cd9',
  //         role: 'user',
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //       send: jest.fn(),
  //     };

  //     // Call the deleteReviewById function
  //     await deleteReviewById(req, res, jest.fn());

  //     // Assert the expected behavior
  //     expect(res.status).toHaveBeenCalledWith(404);
  //     expect(res.send).toHaveBeenCalledWith({
  //       success: false,
  //       message: `Not found review ID of ${req.params.id}`
  //     });
  //   });
  // });

  // describe('when encountering an error while deleting a review', () => {
  //   it('should return a 500 status code', async () => {
  //     // Mock the request and response objects
  //     const req = {
  //       params: {
  //         id: '66127491ede37740c58572e1',
  //       },
  //       user: {
  //         id: '662d0b6100ccd592b35c4cd9',
  //         role: 'user',
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //       send: jest.fn(),
  //     };

  //     // Mocking a scenario where deleteOne function throws an error
  //     Review.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Mock error'));

  //     // Call the deleteReviewById function
  //     await deleteReviewById(req, res, jest.fn());

  //     // Assert the expected behavior
  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: false,
  //       message: 'Cannot delete Review'
  //     });
  //   });
  // });
});
