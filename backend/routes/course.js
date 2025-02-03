const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Route to search for a course
router.get("/search", async (req, res) => {
  try {
    const { location, gender, age } = req.query;

    let courseAggregationPipeline = [];
    let filteredCourse = [];
    // if location available
    if (location) {
      courseAggregationPipeline.push({
        $match: {
          location: {
            $elemMatch: {
              city: location,
            },
          },
        },
      });
    }
    // if gender available
    if (gender && gender !== "Any") {
      courseAggregationPipeline.push({
        $match: {
          preferredGender: gender,
        },
      });
    }

    // if age available
    if (age) {
      const parsedAge = JSON.parse(age);
      const { startAge, endAge } = parsedAge;

      const currentDate = new Date();
      const startAgeDate = new Date();
      startAgeDate.setFullYear(
        currentDate.getFullYear() - parseInt(startAge, 10)
      );
      startAgeDate.setHours(0, 0, 0, 0);
      const endAgeDate = new Date();
      endAgeDate.setFullYear(currentDate.getFullYear() - parseInt(endAge, 10));
      endAgeDate.setHours(0, 0, 0, 0);

      // pipline
      courseAggregationPipeline.push({
        $match: {
          ageGroup: {
            $elemMatch: {
              ageStart: { $lte: startAgeDate },
              ageEnd: { $gte: endAgeDate },
            },
          },
        },
      });
    }
    const course = await Course.aggregate(
      courseAggregationPipeline.length > 0 ? courseAggregationPipeline : [{}]
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get courses by provider IDs
router.get("/by-providers", async (req, res) => {
  const { providerIds } = req.query;

  try {
    const courses = await Course.find({ providerId: { $in: providerIds } });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/course/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(courseId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "providerId",
          foreignField: "_id",
          as: "providerDetails",
          pipeline: [
            {
              $project: {
                username: 1,
                fullName: 1,
                description: 1,
                address: 1,
                location: 1,
                website: 1,
                academyImg: 1,
                logo: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$providerDetails",
      },
    ]);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get courses by courseType
router.get("/by-course-type", async (req, res) => {
  const { courseType } = req.query;

  try {
    const courses = await Course.find({ courseType: courseType });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by courseType:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/lowest-fee/:category", async (req, res) => {
  try {
    const category = req.params.category;

    // Fetch all courses that match the given category name
    const courses = await Course.find({ courseType: category });

    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this category." });
    }

    // Extract the feeAmount and find the minimum
    const fees = courses.map((course) => course.feeAmount);
    const minFee = Math.min(...fees);

    res.json({ minFee });
  } catch (error) {
    res.status(500).json({ message: "Error fetching lowest fee", error });
  }
});
router.get("/other/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("from bacend corse id", courseId);
    // Find the current course to get the providerId
    const currentCourse = await Course.findById(courseId);
    if (!currentCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Fetch other courses by the same provider excluding the current course
    const otherCourses = await Course.find({
      providerId: currentCourse.providerId,
      _id: { $ne: courseId }, // Exclude the current course
    });
    console.log(otherCourses);

    res.status(200).json(otherCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
