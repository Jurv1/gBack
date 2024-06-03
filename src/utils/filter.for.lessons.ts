import { LessonsQueryParams } from '../dto/lessons.query.params';
import { format } from 'date-fns';

export function filterForLessons(query: LessonsQueryParams) {
  const filter: { [key: string]: string | number | number[] | Date } = {};
  if (query.date) {
    const dateFilter = query.date.split(',');
    filter['fromDate'] = format(new Date(dateFilter[0]), 'yyyy-MM-dd');
    query.date.split(',').length >= 2
      ? (filter['toDate'] = format(new Date(dateFilter[1]), 'yyyy-MM-dd'))
      : (filter['toDate'] = filter['fromDate']);
  }

  if (query.page) {
    filter['offset'] = query.page;
  } else filter['offset'] = 0;

  if (query.lessonsPerPage) {
    filter['limit'] = query.lessonsPerPage;
  } else filter['limit'] = 5;

  if (query.status) {
    filter['visit'] = query.status;
  }

  if (query.teachersIds) {
    filter['teachers'] = +query.teachersIds;
    console.log([filter['teachers']]);
  }

  if (query.studentsCount) {
    filter['studentsCount'] = query.studentsCount;
  }

  return filter;
}
