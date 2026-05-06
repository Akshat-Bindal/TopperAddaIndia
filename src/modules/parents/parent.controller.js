import {
    createParentService,
    getParentsService,
    getParentByIdService,
    updateParentService,
    deleteParentService
} from "./parent.service.js";

export const createParent = async (
    req,
    res
) => {

    try {

        const parent = await createParentService(
            req.body,
            req.user
        );

        res.status(201).json({
            success: true,
            data: parent
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const getParents = async (
    req,
    res
) => {

    try {

        const parents = await getParentsService(
            req.user.school_id
        );

        res.status(200).json({
            success: true,
            data: parents
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getParentById = async (
    req,
    res
) => {

    try {

        const parent = await getParentByIdService(
            Number(req.params.id),
            req.user.school_id
        );

        res.status(200).json({
            success: true,
            data: parent
        });

    } catch (err) {

        res.status(404).json({
            success: false,
            message: err.message
        });

    }

};

export const updateParent = async (
    req,
    res
) => {

    try {

        const result = await updateParentService(
            Number(req.params.id),
            req.user.school_id,
            req.body
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

export const deleteParent = async (
    req,
    res
) => {

    try {

        const result = await deleteParentService(
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