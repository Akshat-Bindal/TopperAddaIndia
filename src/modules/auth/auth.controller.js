import {registerSchoolAdmin} from "./auth.service.js";
import { loginService } from "./auth.service.js";

export const registerSchool = async (req, res) => {
    try{
        const result= await registerSchoolAdmin(req.body);
        res.status(201).json({
            message:"School + Admin created successfully",
            data : result
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        });
    }
};

export const login=async(req,res)=>{
    try{
        const result=await loginService(req.body);

        return res.status(200).json({
            success:true,
            data:result
        });
    } catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};