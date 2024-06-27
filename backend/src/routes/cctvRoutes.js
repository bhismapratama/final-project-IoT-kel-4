const express = require('express');
const router = express.Router();
const CCTVModel = require('../models/cctv.model');
const verifyToken = require('../middleware/authMiddleware')

router.get("/cctv", async (req, res) => {
    try {
        const { limit = 5, orderBy = "createdAt", sortBy = "desc", title } = req.query;
        let currentPage = +req.query?.currentPage || 1;

        const skip = (currentPage - 1) * +limit;

        const query = {};

        if (title) query.title = { $regex: title, $options: "i" };

        const data = await CCTVModel.find(query)
            .skip(skip)
            .limit(+limit)
            .sort({ [orderBy]: sortBy });
        const totalItems = await CCTVModel.countDocuments(query);

        return res.status(200).json({
            code: 200,
            message: "Successfully get all cctv data!",
            data,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            limit: +limit,
            currentPage: currentPage,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/cctv/:id", async (req, res) => {
    try {
        const data = await CCTVModel.findById(req.params.id);

        if (data) {
            return res.status(200).json({
                code: 200,
                message: `Successfully get cctv Data with ID: ${req.params.id}!`,
                data,
            });
        }

        return res.status(404).json({
            message: "Not Found",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.post("/cctv", async (req, res) => {
    try {
        const { classs, label } = req.body;
        const cctv = new CCTVModel({
            classs,
            label
        });
        const data = await cctv.save();
        return res.status(201).json({
            code: 201,
            message: "Successfully Created cctv data!",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.patch("/cctv/:id", verifyToken, async (req, res) => {
    try {
        const { classs, label } = req.body;
        const { id } = req.params;

        const data = await CCTVModel.findByIdAndUpdate(
            id,
            {
                classs,
                label
            },
            { new: true }
        );
        return res.status(200).json({
            code: 200,
            message: "Successfully updated cctv data!",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.delete("/cctv/:id", verifyToken, async (req, res) => {
    try {
        const data = await CCTVModel.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                code: 404,
                message: "cctv data not found!",
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Successfully deleted cctv data!",
            deletedData: data,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;
