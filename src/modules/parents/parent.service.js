import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import { withSchool } from "../../utils/queryFilter.js";

export const createParentService = async (data, admin) => {

    const { name, email, password } = data;

    const existingUser = await prisma.users.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {

        const user = await tx.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "PARENT",
                school_id: admin.school_id
            }
        });

        const parent = await tx.parents.create({ // ✅ tx, not prisma
            data: {
                status: "active",
                users: {
                    connect: {
                        id: user.id
                    }
                },
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

        return parent;
    });

    return result;
};

export const getParentsService = async (
    schoolId
) => {

    return await prisma.parents.findMany({
        where: withSchool(schoolId, {
            status: "active"
        }),
        include: {
            users: true
        }
    });

};

export const getParentByIdService = async (
    parentId,
    schoolId
) => {

    const parent = await prisma.parents.findFirst({
        where: withSchool(schoolId, {
            id: parentId,
            status: "active"
        }),
        include: {
            users: true
        }
    });

    if (!parent) {
        throw new Error("Parent not found");
    }

    return parent;
};

export const updateParentService = async (
    parentId,
    schoolId,
    data
) => {

    const parent = await prisma.parents.findFirst({
        where: withSchool(schoolId, {
            id: parentId,
            status: "active"
        })
    });

    if (!parent) {
        throw new Error("Parent not found");
    }

    await prisma.users.update({
        where: {
            id: parent.user_id
        },
        data
    });

    return {
        message: "Parent updated successfully"
    };
};

export const deleteParentService = async (
    parentId,
    schoolId
) => {

    const parent = await prisma.parents.findFirst({
        where: withSchool(schoolId, {
            id: parentId,
            status: "active"
        })
    });

    if (!parent) {
        throw new Error("Parent not found");
    }

    await prisma.parents.update({
        where: {
            id: parent.id
        },
        data: {
            status: "inactive"
        }
    });

    return {
        message: "Parent deleted successfully"
    };
};