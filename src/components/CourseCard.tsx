import { Clock, BarChart, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  students: number;
  icon: string;
}

interface CourseCardProps {
  course: Course;
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="text-4xl">{course.icon}</div>
          <Badge className={difficultyColors[course.difficulty]}>
            {course.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart className="w-4 h-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span>{course.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
