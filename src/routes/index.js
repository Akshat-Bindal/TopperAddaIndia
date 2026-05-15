import authRoutes from "../modules/auth/auth.routes.js";
import teacherRoutes from "../modules/teachers/teacher.routes.js";
import parentRoutes from "../modules/parents/parent.routes.js";
import standardRoutes from "../modules/standards/standard.routes.js";
import sectionRoutes from "../modules/sections/section.routes.js";
import studentRoutes from "../modules/students/students.routes.js";
import attendanceRoutes from "../modules/attendance/attendance.routes.js";

export const registerRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/parents", parentRoutes);
  app.use("/teachers", teacherRoutes);
  app.use("/standards", standardRoutes);
  app.use("/sections", sectionRoutes);
  app.use("/students", studentRoutes);
  app.use("/attendance", attendanceRoutes);
};