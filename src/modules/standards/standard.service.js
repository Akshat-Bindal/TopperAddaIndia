import prisma from "../../config/prisma.js";

import { withSchool } from "../../utils/queryFilter.js";

export const createStandardService = async (
    data,
    admin
) => {

    const { name } = data;

    const existingStandard =
        await prisma.standards.findFirst({

            where: withSchool(admin.school_id, {
                name,
                status: "active"
            })

        });

    if (existingStandard) {
        throw new Error(
            "Standard already exists"
        );
    }

    const standard = await prisma.standards.create({

            data: {

                name,
                status: "active",

                schools: {
                    connect: {
                        id: admin.school_id
                    }
                }

            }

        });

    return standard;
};

export const getStandardsService = async (
    schoolId
) => {

    return await prisma.standards.findMany({

        where: withSchool(schoolId, {
            status: "active"
        }),

        orderBy: {
            id: "asc"
        }

    });

};

export const getStandardByIdService = async (
    standardId,
    schoolId
) => {

    const standard =
        await prisma.standards.findFirst({

            where: withSchool(schoolId, {
                id: standardId,
                status: "active"
            })

        });

    if (!standard) {
        throw new Error(
            "Standard not found"
        );
    }

    return standard;
};

export const updateStandardService = async (
    standardId,
    schoolId,
    data
) => {

    const standard =
        await prisma.standards.findFirst({

            where: withSchool(schoolId, {
                id: standardId,
                status: "active"
            })

        });

    if (!standard) {
        throw new Error(
            "Standard not found"
        );
    }

    return await prisma.standards.update({

        where: {
            id: standard.id
        },

        data

    });

};

export const deleteStandardService = async (
    standardId,
    schoolId
) => {

    const standard =
        await prisma.standards.findFirst({

            where: withSchool(schoolId, {
                id: standardId,
                status: "active"
            })

        });

    if (!standard) {
        throw new Error(
            "Standard not found"
        );
    }

    await prisma.standards.update({

        where: {
            id: standard.id
        },

        data: {
            status: "inactive"
        }

    });

    return {
        message:
            "Standard deleted successfully"
    };
};