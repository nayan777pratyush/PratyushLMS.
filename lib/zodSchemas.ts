import { z } from "zod";

export const courseLevels = ['BEGINNER','INTERMEDIATE','ADVANCED'] as const;

export const courseStatus = ['DRAFT','PUBLISHED','ARCHIVED'] as const;

export const courseCategories = [
    'Development',
    'Business',
    'Finance',
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    'Design',
    'Marketing',
    'Education',
    'Photography',
    'Music',
    "Health & Fitness",
] as const;

export const courseSchema = z.object({
    title: z
        .string()
        .min(3,{message:"Title must be at least 3 characters long"})
        .max(100,{message:"Title must be at most 100 characters long"}),
    description: z
        .string()
        .min(3,{message:"Description must be at least 3 characters long"}),

    fileKey: z
        .string()
        .min(1,{message:"File key is required"}),

    price: z.coerce
        .number<number>()
        .min(1,{message:"Price must be a positive number"}),

    duration: z.coerce
        .number<number>()
        .min(1,{message:"Duration must be at least 1 hour"})
        .max(500,{message:"Duration must be at most 500 hours"}),

    level: z.enum(courseLevels,{
        message:"Level is required"
    }),
    category: z.enum(courseCategories,{
        message:"Category is required"
    }),
    smallDescription: z
        .string()
        .min(3,{message:"Small description must be at least 3 characters long"})
        .max(200,{message:"Small description must be at most 200 characters long"}),

    slug: z
        .string()
        .min(3,{message:"Slug must be at least 3 characters long"}),

    status: z.enum(courseStatus,{
        message:"Status is required"
    }),
});

export const chapterSchema = z.object({
    name: z
        .string()
        .min(3,{message:"Name must be at least 3 characters long"}),
    courseId: z
        .string()
        .uuid({message:"Invalid course id"}),
});

export const lessonSchema = z.object({
    name: z
        .string()
        .min(3,{message:"Name must be at least 3 characters long"}),
    courseId: z
        .string()
        .uuid({message:"Invalid course id"}),
    chapterId: z
        .string()
        .uuid({message:"Invalid chapter id"}),
    description: z
        .string()
        .min(3, {message:"Description must be at least 3 characters long"})
        .optional(),
    thumbnailKey: z
        .string()
        .optional(),
    videoKey: z
        .string()
        .optional(),
});



export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;

