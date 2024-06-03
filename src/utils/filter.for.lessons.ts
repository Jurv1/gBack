import { LessonsQueryParams } from '../dto/lessons/lessons.query.params';
import { format } from 'date-fns';
import { errorIfNan } from './is.nan';
import { idsChecker } from './ids.checker';

export function filterForLessons(query: LessonsQueryParams) {
  const filter: { [key: string]: string | number | number[] | Date } = {};
  if (query.date) {
    const dateFilter = query.date.split(',');
    filter['fromDate'] = format(new Date(dateFilter[0]), 'yyyy-MM-dd');
    dateFilter.length == 2
      ? (filter['toDate'] = format(new Date(dateFilter[1]), 'yyyy-MM-dd'))
      : (filter['toDate'] = filter['fromDate']);
  }

  if (query.page) {
    errorIfNan(...query.page);
    filter['offset'] = +query.page;
  } else filter['offset'] = 1;

  if (query.lessonsPerPage) {
    errorIfNan(...query.lessonsPerPage);
    filter['limit'] = query.lessonsPerPage;
  } else filter['limit'] = 5;

  if (query.status) {
    filter['visit'] = query.status;
  }

  if (query.teachersIds) {
    const teacherFilter = query.teachersIds.split(',');
    errorIfNan(...teacherFilter);
    filter['teachers'] = teacherFilter.map((el) => +el);
  }

  if (query.studentsCount) {
    const studentFilter = idsChecker(query.studentsCount);
    filter['fromSt'] = studentFilter['from'];
    filter['toSt'] = studentFilter['to'];
  }

  return filter;
}
