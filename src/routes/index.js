import authRoutes from "../modules/auth/auth.routes.js";
import teacherRoutes from "../modules/teachers/teacher.routes.js";
import parentRoutes from "../modules/parents/parent.routes.js";

export const registerRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/parents", parentRoutes);
  app.use("/teachers", teacherRoutes);
};