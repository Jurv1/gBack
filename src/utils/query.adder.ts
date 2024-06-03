import { SelectQueryBuilder } from 'typeorm';
import { Lessons } from '../entites/lessons';

export function queryAdder(query: SelectQueryBuilder<Lessons>, filter) {
  if (filter['fromDate']) {
    query.andWhere('l.date BETWEEN :fromDate AND :toDate', {
      fromDate: filter['fromDate'],
      toDate: filter['toDate'],
    });
  }

  if (filter['teachers']) {
    query.andWhere('t.id IN (:...teachers)', {
      teachers: [filter['teachers']],
    });
  }

  if (filter['studentsCount']) {
    query.having('COUNT(s.id) <= :fromSt AND COUNT(s.id) >= :toSt', {
      fromSt: filter['studentsCount'],
      toSt: filter['studentsCount'],
    });
  }

  if (filter['visit']) {
    query.andWhere('l.status = :status', { status: filter['visit'] });
  }

  if (filter['offset']) {
    query.offset(filter['offset'] as number);
  }

  if (filter['limit']) {
    query.take(filter['limit'] as number);
  }

  return query;
}
