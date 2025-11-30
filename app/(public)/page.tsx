

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";



interface featureProps {
    title: string;
    description: string;
    icon: string;
}

const features: featureProps[] = [
    {
        title: "Comprehensive Course Management",
        description: "Easily create, organize, and manage courses with our intuitive interface.",
        icon: "📚",
    },
    {
        title: "Interactive Learning Tools",
        description: "Engage students with quizzes, assignments, and multimedia content.",
        icon: "🛠️",
    },
    {
        title: "Progress Tracking",
        description: "Monitor student progress and performance with detailed analytics.",
        icon: "📈",
    },
    {
        title: "Community Engagement",
        description: "Foster collaboration through discussion forums and group projects.",
        icon: "🤝",
    },
]

export default function Home() {
 


    return (
        <>
        <section className="relative py-20">
            <div className="flex flex-col items-center text-center space-y-8">
                <Badge variant="outline">
                    The Future of Online Education
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Elevate your Learning Experience
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Discover a new way to learn with our modern, interactive learning management system. 
                    Access high-quality courses anytime, anywhere.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link 
                        className={buttonVariants({
                            size: "lg",
                        })} 
                        href="/courses"
                    >
                        Explore Courses
                    </Link>

                    <Link 
                        className={buttonVariants({
                            size: "lg",
                            variant: "outline",
                        })} 
                        href="/login"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </section>


        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {features.map((feature, index) => (
                <Card key={index} className="shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </section>

        </>
    );
}
