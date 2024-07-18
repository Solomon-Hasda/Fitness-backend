"use strict";
// import { Router } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// const moduleRoutes = [
//   {
//     path: '/users',
//     route: UserRoutes,
//   },
//   {
//     path: '/students',
//     route: StudentRoutes,
//   },
//   {
//     path: '/faculties',
//     route: FacultyRoutes,
//   },
//   {
//     path: '/admins',
//     route: AdminRoutes,
//   },
//   {
//     path: '/academic-semesters',
//     route: AcademicSemesterRoutes,
//   },
//   {
//     path: '/academic-faculties',
//     route: AcademicFacultyRoutes,
//   },
//   {
//     path: '/academic-departments',
//     route: AcademicDepartmentRoutes,
//   },
//   {
//     path: '/courses',
//     route: CourseRoutes,
//   },
//   {
//     path: '/semester-registrations',
//     route: semesterRegistrationRoutes,
//   },
//   {
//     path: '/offered-courses',
//     route: offeredCourseRoutes,
//   },
//   {
//     path: '/auth',
//     route: AuthRoutes,
//   },
//   {
//     path: '/enrolled-courses',
//     route: EnrolledCourseRoutes,
//   },
// ];
// moduleRoutes.forEach((route) => router.use(route.path, route.route));
// export default router;
const express_1 = require("express");
const product_routes_1 = require("../modules/Products/product.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/products',
        route: product_routes_1.ProductRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
