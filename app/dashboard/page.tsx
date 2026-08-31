import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-course";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";

export default async function DashboardPage() {

  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  return (
    <>
      <div className="flex flex-col gap-2"> 
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">Here you can see all the courses you have access to.</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState 
          title="No Courses Purchased" 
          description="You have not purchased any courses yet. Please visit the courses page to explore and enroll in available courses."
          buttonText="Explore Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map(( course ) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5"> 
            <h1 className="text-3xl font-bold">Available Courses</h1>
            <p className="text-muted-foreground">Here you can see all the courses available for purchase.</p>
        </div>

        {courses.filter(
          (course) => !enrolledCourses.some(
            ({ Course: enrolled }) => enrolled.id === course.id)).length === 0 ? (
              <EmptyState 
                title="No Courses Available"
                description="You have already purchased all available courses. Please check back later for new courses."
                buttonText="Explore Courses"
                href="/courses"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.filter(
                  (course) => !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id
                  )).map((course) => (
                  <PublicCourseCard key={course.id} data={course} />
                ))}
              </div>
            )}
      </section>
    </>
  )
}