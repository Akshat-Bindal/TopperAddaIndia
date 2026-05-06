import {
  createTeacherService,
  getTeachersService,
  getTeacherByIdService,
  updateTeacherService,
  deleteTeacherService
} from "./teacher.service.js";

export const createTeacher = async (req, res) => {
  try {

    const teacher = await createTeacherService(
      req.body,
      req.user
    );

    res.status(201).json({
      success: true,
      data: teacher
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};

export const getTeachers = async (req, res) => {
  try {

    const teachers = await getTeachersService(
      req.user.school_id
    );

    res.status(200).json({
      success: true,
      data: teachers
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

export const getTeacherById = async (req, res) => {
  try {

    const teacher = await getTeacherByIdService(
      Number(req.params.id),
      req.user.school_id
    );

    res.status(200).json({
      success: true,
      data: teacher
    });

  } catch (err) {

    res.status(404).json({
      success: false,
      message: err.message
    });

  }
};

export const updateTeacher = async (req, res) => {
  try {

    const result = await updateTeacherService(
      Number(req.params.id),
      req.user.school_id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};

export const deleteTeacher = async (req, res) => {
  try {

    const result = await deleteTeacherService(
      Number(req.params.id),
      req.user.school_id
    );

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message
    });

  }
};