import { LessonsQueryParams } from '../dto/lessons.query.params';

export function filterForLessons(query: LessonsQueryParams) {
  const filter: { [key: string]: string | number | number[] } = {};
  if (query.date) {
    const dateFilter = query.date.split('/');
    filter['fromDate'] = dateFilter[0];
    query.date.split(',').length > 2
      ? (filter['toDate'] = dateFilter[0])
      : (filter['toDate'] = dateFilter[2]);
  }

  if (query.page) {
    filter['offset'] = query.page;
  } else filter['offset'] = -1;

  if (query.lessonsPerPage) {
    filter['limit'] = query.lessonsPerPage;
  } else filter['limit'] = 5;

  if (query.status) {
    filter['visit'] = query.status;
  }

  if (query.teachersIds) {
    filter['teachers'] = query.teachersIds;
  }

  if (query.studentsCount) {
    filter['studentsCount'] = query.studentsCount;
  }

  return filter;
}
