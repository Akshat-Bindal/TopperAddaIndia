import {
    createStandardService,
    getStandardsService,
    getStandardByIdService,
    updateStandardService,
    deleteStandardService
} from "./standard.service.js";

export const createStandard = async (
    req,
    res
) => {

    try {

        const standard =
            await createStandardService(
                req.body,
                req.user
            );

        res.status(201).json({
            success: true,
            data: standard
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const getStandards = async (
    req,
    res
) => {

    try {

        const standards =
            await getStandardsService(
                req.user.school_id
            );

        res.status(200).json({
            success: true,
            data: standards
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getStandardById = async (
    req,
    res
) => {

    try {

        const standard =
            await getStandardByIdService(
                Number(req.params.id),
                req.user.school_id
            );

        res.status(200).json({
            success: true,
            data: standard
        });

    } catch (err) {

        res.status(404).json({
            success: false,
            message: err.message
        });

    }

};

export const updateStandard = async (
    req,
    res
) => {

    try {

        const standard =
            await updateStandardService(
                Number(req.params.id),
                req.user.school_id,
                req.body
            );

        res.status(200).json({
            success: true,
            data: standard
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const deleteStandard = async (
    req,
    res
) => {

    try {

        const result =
            await deleteStandardService(
                Number(req.params.id),
                req.user.school_id
            );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};