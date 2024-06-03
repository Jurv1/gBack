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
      teachers: filter['teachers'],
    });
  }

  if (filter['fromSt']) {
    query.having(' COUNT(s.id) BETWEEN :fromSt AND :toSt', {
      fromSt: filter['fromSt'],
      toSt: filter['toSt'],
    });
  }

  if (filter['visit']) {
    query.andWhere('l.status = :status', { status: filter['visit'] });
  }

  if (filter['offset']) {
    query.skip(+filter['offset']);
  }

  if (filter['limit']) {
    query.take(filter['limit']);
  }

  return query;
}
