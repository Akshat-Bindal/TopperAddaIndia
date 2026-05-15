import prisma from "../../config/prisma.js";

export const markAttendanceService = async (
    data,
    user
) => {

    const {
        student_id,
        date,
        status
    } = data;

    // validate status

    const validStatuses = [
        "PRESENT",
        "ABSENT",
        "LATE"
    ];

    if (!validStatuses.includes(status)) {
        throw new Error(
            "Invalid attendance status"
        );
    }

    // validate student

    const student =
        await prisma.students.findFirst({

        where: {
            id: student_id,
            school_id: user.school_id,
            status: "active"
        }

    });

    if (!student) {
        throw new Error(
            "Student not found"
        );
    }

    //  prevent duplicate attendance

    const existingAttendance =
        await prisma.attendance.findFirst({

        where: {

            student_id,

            date: new Date(date)

        }

    });

    if (existingAttendance) {
        throw new Error(
            "Attendance already marked"
        );
    }

    // create attendance

    const attendance =
        await prisma.attendance.create({

        data: {

            date: new Date(date),

            status,

            students: {
                connect: {
                    id: student_id
                }
            },

            schools: {
                connect: {
                    id: user.school_id
                }
            }

        },

        include: {
            students: true
        }

    });

    return attendance;
};

export const getClassAttendanceService = async (
    schoolId,
    standard_id,
    section_id,
    date
) => {

    return await prisma.attendance.findMany({

        where: {

            school_id: schoolId,

            date: new Date(date),

            students: {
                standard_id,
                section_id,
                status: "active"
            }

        },

        include: {
            students: true
        },

        orderBy: {
            marked_at: "desc"
        }

    });

};

export const getStudentAttendanceService = async (
    studentId,
    schoolId
) => {

    const student =
        await prisma.students.findFirst({

        where: {
            id: studentId,
            school_id: schoolId,
            status: "active"
        }

    });

    if (!student) {
        throw new Error(
            "Student not found"
        );
    }

    return await prisma.attendance.findMany({

        where: {
            student_id: studentId,
            school_id: schoolId
        },

        include: {
            students: true
        },

        orderBy: {
            date: "desc"
        }

    });

};