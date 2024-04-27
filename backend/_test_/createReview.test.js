const {
    createReview
  } = require('../controllers/ReviewController');
  
  const Review = require("../models/ReviewModel");
  const Restaurant = require('../models/RestaurantModel');
  
  jest.mock("../models/ReviewModel");
  jest.mock('../models/RestaurantModel');
  jest.mock("../config/aws-s3");
  
  describe("createReview", () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {
        params: {},
        body: {},
        user: {
          id: "662d07e98893ed043ba9ff36"
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
      next = jest.fn();
    });
  
    it("should create review successfully", async () => {
      req.params.restaurantId = "661e4eeb00a40432cb8d2333";
      req.body.rating = 4;
      req.body.review = "Great food and service!";
  
      const restaurant = {
        _id: "661e4eeb00a40432cb8d2333"
      };
  
      const existingReviews = [];
      Review.find.mockResolvedValue(existingReviews);
      Restaurant.findById.mockResolvedValue(restaurant);
      Review.create.mockResolvedValue({
        rating: req.body.rating,
        review: req.body.review,
        user: req.user.id,
        restaurant: req.params.restaurantId
      });
  
      await createReview(req, res, next);
  
      expect(Review.find).toHaveBeenCalledWith({
        user: req.user.id,
        restaurant: req.params.restaurantId
      });
      expect(Review.create).toHaveBeenCalledWith({
        rating: req.body.rating,
        review: req.body.review,
        user: req.user.id,
        restaurant: req.params.restaurantId
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          rating: req.body.rating,
          review: req.body.review,
          user: req.user.id,
          restaurant: req.params.restaurantId
        }
      });
    });
  
    it("should return 404 if restaurant not found", async () => {
      req.params.restaurantId = "661e4eeb00a40432cb8d2334";
      Restaurant.findById.mockResolvedValue(null);
  
      await createReview(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `Not found restaurant ID of ${req.params.restaurantId}`
      });
    });
  
    it("should return 400 if user has already written review for the restaurant", async () => {
      req.params.restaurantId = "661e4eeb00a40432cb8d2333";
      const existingReviews = [{
        _id: "662d0a6d7a660d790450a5e0"
      }];
      Review.find.mockResolvedValue(existingReviews);
  
      await createReview(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `You've already written the review for this restaurant.`
      });
    });
  
    it("should return 400 if rating is not between 0-5", async () => {
      req.params.restaurantId = "662d0a6d7a660d790450a5e0";
      req.body.rating = 6;
  
      await createReview(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: `rating value can only between 0-5`
      });
    });
  
    it("should return 500 if error occurs during review creation", async () => {
      req.params.restaurantId = "661e4eeb00a40432cb8d2333";
      req.body.rating = 4;
      req.body.review = "Great food and service!";
  
      const restaurant = {
        _id: "661e4eeb00a40432cb8d2333"
      };
  
      const existingReviews = [];
      Review.find.mockResolvedValue(existingReviews);
      Restaurant.findById.mockResolvedValue(restaurant);
      Review.create.mockRejectedValue(new Error("Database error"));
  
      await createReview(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cannot create Review'
      });
    });
  });
  