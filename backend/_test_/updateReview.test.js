const {
  updateReviewById
} = require('../controllers/ReviewController');

const Review = require("../models/ReviewModel");

jest.mock("../models/ReviewModel");

describe("updateReviewById", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        id: "662d0a6d7a660d790450a5e0"
      },
      user: {
        id: "662d07e98893ed043ba9ff36",
        role: "user"
      },
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  it("should update review if user is the owner of the review", async () => {
    const review = {
      _id: "662d0a6d7a660d790450a5e0",
      user: "662d07e98893ed043ba9ff36",
      save: jest.fn()
    };
    Review.findById.mockResolvedValue(review);

    req.body = {
      rating: 1,
      comment: "Bad!"
    };

    await updateReviewById(req, res, next);

    expect(Review.findById).toHaveBeenCalledWith("662d0a6d7a660d790450a5e0");
    expect(review.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      data: review
    });
  });

  it("should return 401 if user is not the owner of the review", async () => {
    const review = {
      _id: "662d0a6d7a660d790450a5e0",
      user: "662d07e98893ed043ba9f789"
    };
    Review.findById.mockResolvedValue(review);

    await updateReviewById(req, res, next);

    expect(Review.findById).toHaveBeenCalledWith("662d0a6d7a660d790450a5e0");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: `This user ${req.user.id} is not authorized to update this review`
    });
  });

  it("should return 404 if review not found", async () => {
    Review.findById.mockResolvedValue(null);

    await updateReviewById(req, res, next);

    expect(Review.findById).toHaveBeenCalledWith("662d0a6d7a660d790450a5e0");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: `Not found review ID of ${req.params.id}`
    });
  });

  it("should return 500 if error occurs during review update", async () => {
    const review = {
      _id: "662d0a6d7a660d790450a5e0",
      user: "662d07e98893ed043ba9ff36",
      save: jest.fn()
    };
    Review.findById.mockResolvedValue(review);
    review.save.mockRejectedValue(new Error("Database error"));

    req.body = {
      rating: 2,
      comment: "Disgusting!"
    };

    await updateReviewById(req, res, next);

    expect(Review.findById).toHaveBeenCalledWith("reviewId");
    expect(review.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Cannot update Review'
    });
  });
});
