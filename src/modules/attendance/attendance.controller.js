import {

    markAttendanceService,
    getClassAttendanceService,
    getStudentAttendanceService

} from "./attendance.service.js";

export const markAttendance = async (
    req,
    res
) => {

    try {

        const attendance =
            await markAttendanceService(
                req.body,
                req.user
            );

        return res.status(201).json({
            success: true,
            data: attendance
        });

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

export const getClassAttendance = async (
    req,
    res
) => {

    try {

        const {

            standard_id,
            section_id,
            date

        } = req.query;

        const attendance =
            await getClassAttendanceService(

                req.user.school_id,

                Number(standard_id),
                Number(section_id),

                date

            );

        return res.status(200).json({
            success: true,
            data: attendance
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getStudentAttendance = async (
    req,
    res
) => {

    try {

        const attendance =
            await getStudentAttendanceService(

                Number(req.params.id),
                req.user.school_id

            );

        return res.status(200).json({
            success: true,
            data: attendance
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};