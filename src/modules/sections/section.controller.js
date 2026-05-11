import {
    createSectionService,
    getSectionsService,
    getSectionByIdService,
    updateSectionService,
    deleteSectionService
} from "./section.service.js";

export const createSection = async (
    req,
    res
) => {

    try {

        const section =
            await createSectionService(
                req.body,
                req.user
            );

        res.status(201).json({
            success: true,
            data: section
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const getSections = async (
    req,
    res
) => {

    try {

        const sections =
            await getSectionsService(
                req.user.school_id
            );

        res.status(200).json({
            success: true,
            data: sections
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getSectionById = async (
    req,
    res
) => {

    try {

        const section =
            await getSectionByIdService(
                Number(req.params.id),
                req.user.school_id
            );

        res.status(200).json({
            success: true,
            data: section
        });

    } catch (err) {

        res.status(404).json({
            success: false,
            message: err.message
        });

    }

};

export const updateSection = async (
    req,
    res
) => {

    try {

        const section =
            await updateSectionService(
                Number(req.params.id),
                req.user.school_id,
                req.body
            );

        res.status(200).json({
            success: true,
            data: section
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const deleteSection = async (
    req,
    res
) => {

    try {

        const result =
            await deleteSectionService(
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