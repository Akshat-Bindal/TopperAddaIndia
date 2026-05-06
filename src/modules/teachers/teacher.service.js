import prisma from "../../config/prisma.js";
import { withSchool } from "../../utils/queryFilter.js";
import bcrypt from "bcrypt";

export const createTeacherService = async (data, admin) => {
    const { name, email, password } = data;

    const existingUser = await prisma.users.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "TEACHER",
            school_id: admin.school_id
        }
    });

    const teacher = await prisma.teachers.create({
        data: {
            user_id: user.id,
            schools: {
                connect: {
                    id: admin.school_id
                }
            }
        },
        include: {
            users: true
        }
    });

    return teacher;
};

export const getTeachersService = async (schoolId) => {
    return await prisma.teachers.findMany({
        where: withSchool(schoolId, {
            status: "active"
        }),
        include: {
            users: true
        }
    });
};


export const getTeacherByIdService = async (teacherId, schoolId) => {
    const teacher = await prisma.teachers.findFirst({
        where: withSchool(schoolId, {
            id: teacherId,
            status: "active"
        }),
        include: {
            users: true
        }
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    return teacher;
};


export const updateTeacherService = async (
    teacherId,
    schoolId,
    data
) => {

    const teacher = await prisma.teachers.findFirst({
        where: withSchool(schoolId, {
            id: teacherId
        })
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    await prisma.users.update({
        where: {
            id: teacher.user_id
        },
        data
    });

    return { message: "Teacher updated successfully" };
};


export const deleteTeacherService = async (
    teacherId,
    schoolId
) => {

    const teacher = await prisma.teachers.findFirst({
        where: withSchool(schoolId, {
            id: teacherId
        })
    });

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    await prisma.teachers.update({
        where: {
            id: teacher.id
        },
        data: {
            status: "inactive"
        }
    });

    return {
        message: "Teacher deleted successfully"
    };
};