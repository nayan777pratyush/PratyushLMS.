import "server-only"
import { requireAdmin } from "./require-admin"
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string) {
    await requireAdmin();

    const data = await prisma.course.findUnique({
        where: {
            id: id,
        },
        select: {
            id:true,
            title: true,
            description: true,
            smallDescription: true,
            duration: true,
            level: true,
            category: true,
            status: true,
            price: true,
            fileKey:true,
            slug: true,
            chapters: {
                select: {
                    id: true,
                    title: true,
                    position: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            thumbnailKey: true,
                            position: true,
                            videoKey: true,
                        },
                    },
                },
            },
        },
    });

    if(!data) {
        return notFound();
    }
    return data;
}

export type AdminCourseSingularType = Awaited<
    ReturnType<typeof adminGetCourse>
>;