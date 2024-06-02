export class LessonsQueryParams {
  date: string;
  status: 1 | 0;
  teachersIds: number[];
  studentsCount: number[];
  page: number;
  lessonsPerPage: number;
}
