import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";

export const createStudentService = async (
    data,
    admin
) => {

    const {

        student_id,

        first_name,
        last_name,

        dob,
        gender,

        mobile,
        email,

        address_line,
        city,
        state,
        pincode,

        medium,

        roll_number,

        standard_id,
        section_id,

        father_name,
        father_mobile,

        mother_name,
        mother_mobile,

        guardian_name,
        guardian_relation,
        guardian_mobile,

        parent_id,

        password

    } = data;

    // check existing email

    const existingUser =
        await prisma.users.findUnique({

        where: {
            email
        }

    });

    if (existingUser) {
        throw new Error(
            "User already exists"
        );
    }

    // validate standard

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

    // validate section

    const section =
        await prisma.sections.findFirst({

        where: {
            id: section_id,
            standard_id,
            status: "active"
        }

    });

    if (!section) {
        throw new Error(
            "Section not found"
        );
    }

    // validate parent

    const parent =
        await prisma.parents.findFirst({

        where: {
            id: parent_id,
            school_id: admin.school_id,
            status: "active"
        }

    });

    if (!parent) {
        throw new Error(
            "Parent not found"
        );
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    // transaction

    const result =
        await prisma.$transaction(async (tx) => {

        // create user

        const user =
            await tx.users.create({

            data: {

                name:
                    `${first_name} ${last_name || ""}`,

                email,

                password: hashedPassword,

                role: "STUDENT",

                schools: {
                    connect: {
                        id: admin.school_id
                    }
                }

            }

        });

        // create student

        const student =
            await tx.students.create({

            data: {

                student_id,

                first_name,
                last_name,

                dob: dob
                    ? new Date(dob)
                    : null,

                gender,

                mobile,
                email,

                address_line,
                city,
                state,
                pincode,

                medium,

                roll_number,

                father_name,
                father_mobile,

                mother_name,
                mother_mobile,

                guardian_name,
                guardian_relation,
                guardian_mobile,

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
                },

                standards: {
                    connect: {
                        id: standard_id
                    }
                },

                sections: {
                    connect: {
                        id: section_id
                    }
                }

            }

        });

        // link parent

        await tx.parent_students.create({

            data: {

                parents: {
                    connect: {
                        id: parent_id
                    }
                },

                students: {
                    connect: {
                        id: student.id
                    }
                }

            }

        });

        return student;

    });

    return result;
};

export const getStudentsService = async (
    schoolId
) => {

    return await prisma.students.findMany({

        where: {
            school_id: schoolId,
            status: "active"
        },

        include: {

            standards: true,
            sections: true,

            parent_students: {
                include: {
                    parents: {
                        include: {
                            users: true
                        }
                    }
                }
            }

        },

        orderBy: {
            id: "asc"
        }

    });

};

export const getStudentByIdService = async (
    studentId,
    schoolId
) => {

    const student =
        await prisma.students.findFirst({

        where: {
            id: studentId,
            school_id: schoolId,
            status: "active"
        },

        include: {

            standards: true,
            sections: true,

            parent_students: {
                include: {
                    parents: {
                        include: {
                            users: true
                        }
                    }
                }
            }

        }

    });

    if (!student) {
        throw new Error(
            "Student not found"
        );
    }

    return student;
};

export const updateStudentService = async (
    studentId,
    schoolId,
    data
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

    return await prisma.students.update({

        where: {
            id: student.id
        },

        data

    });

};

export const deleteStudentService = async (
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

    await prisma.students.update({

        where: {
            id: student.id
        },

        data: {
            status: "inactive"
        }

    });

    return {
        message:
            "Student deleted successfully"
    };
};