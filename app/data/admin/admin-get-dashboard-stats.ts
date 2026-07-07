import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDashboardStats() {
    await requireAdmin();

    const [totalSignups, totalCustomers, totalCourses, totalLessons] = await Promise.all([
        // Total signups
        prisma.user.count(),

        // Total customers (users who have enrolled in courses)
        prisma.user.count({
            where: {
                enrollments: {
                    some: {},
                },
            },
        }),
        

        // Total courses
        prisma.course.count(),

        // Total lessons
        prisma.lesson.count(),

    ]);

    return {
        totalSignups,
        totalCustomers,
        totalCourses,
        totalLessons,
    };

}