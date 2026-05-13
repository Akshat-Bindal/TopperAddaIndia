import {

    createStudentService,
    getStudentsService,
    getStudentByIdService,
    updateStudentService,
    deleteStudentService

} from "./students.service.js";

export const createStudent = async (
    req,
    res
) => {

    try {

        const student =
            await createStudentService(
                req.body,
                req.user
            );

        res.status(201).json({
            success: true,
            data: student
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const getStudents = async (
    req,
    res
) => {

    try {

        const students =
            await getStudentsService(
                req.user.school_id
            );

        return res.status(200).json({
            success: true,
            data: students
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getStudentById = async (
    req,
    res
) => {

    try {

        const student =
            await getStudentByIdService(
                Number(req.params.id),
                req.user.school_id
            );

        return res.status(200).json({
            success: true,
            data: student
        });

    } catch (err) {

        return res.status(404).json({
            success: false,
            message: err.message
        });

    }

};

export const updateStudent = async (
    req,
    res
) => {

    try {

        const student =
            await updateStudentService(
                Number(req.params.id),
                req.user.school_id,
                req.body
            );

        return res.status(200).json({
            success: true,
            data: student
        });

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const deleteStudent = async (
    req,
    res
) => {

    try {

        const result =
            await deleteStudentService(
                Number(req.params.id),
                req.user.school_id
            );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

};