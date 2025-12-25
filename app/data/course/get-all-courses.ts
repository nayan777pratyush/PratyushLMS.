import { prisma } from "@/lib/db";

export async function getAllCourses() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec delay

    const data = await prisma.course.findMany({
        where: {
            status: "PUBLISHED",
        },
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            level: true,
            fileKey: true,
            price: true,
            slug: true,
            category: true,
        },
    });

    return data;
}



export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];