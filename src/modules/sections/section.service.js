import prisma from "../../config/prisma.js";

export const createSectionService = async (
    data,
    admin
) => {

    const {
        name,
        standard_id
    } = data;

    // verify standard belongs to school

    const standard =
        await prisma.standards.findFirst({

        where: {
            id: standard_id,
            school_id: admin.school_id,
            status: "active"
        }

    });

    if (!standard) {
        throw new Error(
            "Standard not found"
        );
    }

    const existingSection =
        await prisma.sections.findFirst({

        where: {
            standard_id,
            name,
            status: "active"
        }

    });

    if (existingSection) {
        throw new Error(
            "Section already exists"
        );
    }

    const section =
        await prisma.sections.create({

        data: {

            name,
            status: "active",

            standards: {
                connect: {
                    id: standard_id
                }
            }

        },

        include: {
            standards: true
        }

    });

    return section;
};

export const getSectionsService = async (
    schoolId
) => {

    return await prisma.sections.findMany({

        where: {
            status: "active",

            standards: {
                school_id: schoolId
            }
        },

        include: {
            standards: true
        },

        orderBy: {
            id: "asc"
        }

    });

};

export const getSectionByIdService = async (
    sectionId,
    schoolId
) => {

    const section =
        await prisma.sections.findFirst({

        where: {

            id: sectionId,
            status: "active",

            standards: {
                school_id: schoolId
            }

        },

        include: {
            standards: true
        }

    });

    if (!section) {
        throw new Error(
            "Section not found"
        );
    }

    return section;
};

export const updateSectionService = async (
    sectionId,
    schoolId,
    data
) => {

    const section =
        await prisma.sections.findFirst({

        where: {

            id: sectionId,
            status: "active",

            standards: {
                school_id: schoolId
            }

        }

    });

    if (!section) {
        throw new Error(
            "Section not found"
        );
    }

    return await prisma.sections.update({

        where: {
            id: section.id
        },

        data

    });

};

export const deleteSectionService = async (
    sectionId,
    schoolId
) => {

    const section =
        await prisma.sections.findFirst({

        where: {

            id: sectionId,
            status: "active",

            standards: {
                school_id: schoolId
            }

        }

    });

    if (!section) {
        throw new Error(
            "Section not found"
        );
    }

    await prisma.sections.update({

        where: {
            id: section.id
        },

        data: {
            status: "inactive"
        }

    });

    return {
        message:
            "Section deleted successfully"
    };
};