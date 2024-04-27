const {
    deleteReviewById
  } = require('../controllers/ReviewController');
  
  const Review = require("../models/ReviewModel");
  
  jest.mock("../models/ReviewModel");
  
  describe("deleteReviewById", () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {
        params: {
          id: "reviewId"
        },
        user: {
          id: "userId",
          role: "user"
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
      next = jest.fn();
    });
  
    it("should delete review if user is the owner of the review", async () => {
      const review = {
        _id: "reviewId",
        user: "userId"
      };
      Review.findById.mockResolvedValue(review);
  
      await deleteReviewById(req, res, next);
  
      expect(Review.findById).toHaveBeenCalledWith("reviewId");
      expect(review.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {}
      });
    });
  
    it("should return 401 if user is not the owner of the review", async () => {
      const review = {
        _id: "reviewId",
        user: "otherUserId"
      };
      Review.findById.mockResolvedValue(review);
  
      await deleteReviewById(req, res, next);
  
      expect(Review.findById).toHaveBeenCalledWith("reviewId");
      expect(review.deleteOne).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `This user ${req.user.id} is not authorized to delete this review`
      });
    });
  
    it("should delete review if user is an admin", async () => {
      req.user.role = "admin";
      const review = {
        _id: "reviewId"
      };
      Review.findById.mockResolvedValue(review);
  
      await deleteReviewById(req, res, next);
  
      expect(Review.findById).toHaveBeenCalledWith("reviewId");
      expect(review.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {}
      });
    });
  
    it("should return 404 if review not found", async () => {
      Review.findById.mockResolvedValue(null);
  
      await deleteReviewById(req, res, next);
  
      expect(Review.findById).toHaveBeenCalledWith("reviewId");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: `Not found review ID of ${req.params.id}`
      });
    });
  
    it("should return 500 if error occurs during review deletion", async () => {
      const review = {
        _id: "reviewId",
        user: "userId"
      };
      Review.findById.mockResolvedValue(review);
      review.deleteOne.mockRejectedValue(new Error("Database error"));
  
      await deleteReviewById(req, res, next);
  
      expect(Review.findById).toHaveBeenCalledWith("reviewId");
      expect(review.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cannot delete Review'
      });
    });
  });
  