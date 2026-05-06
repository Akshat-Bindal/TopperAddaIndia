import prisma from "../../config/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerSchoolAdmin = async(data)=>{
    const {schoolName, schoolAdminName, email, password} = data;
    
    const existinguser= await prisma.users.findUnique({
        where : {email}
    });

    if (existinguser){
        throw new Error("User already exists");
    }

    const hashedPassword= await bcrypt.hash(password,10);

    const school= await prisma.schools.create({
        data: {
            name : schoolName,
            users :{
                create:{
                    name : schoolAdminName,
                    email: email,
                    password: hashedPassword,
                    role: "SCHOOL_ADMIN"
                }
            }
        },
        include : { users : true }
    });
    return school;
}

export const loginUser =async(data)=>{
    const {email, password}=data;

    const user=await prisma.users.findUnique({
        where: {email}
    })

    if(!user){
        throw new error("User not Found");
    }

    const isMatch= await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new error("IInvalid Credentials");
    }

    const token=jwt.sign(
        {
            id: user.id,
            role: user.role,
            school_id: user.school_id
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    return{
        token,
        user: {
            id:user.id,
            email: user.email,
            role: user.role
        }
    };
};