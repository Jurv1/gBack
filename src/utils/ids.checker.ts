import { errorIfNan } from './is.nan';

export function idsChecker(idString: string) {
  const idArray = idString.split(',');
  errorIfNan(...idArray);

  const filter: { [key: string]: number } = {};

  filter['from'] = +idArray[0];

  idArray.length == 2
    ? (filter['to'] = +idArray[1])
    : (filter['to'] = filter['from']);

  return filter;
}
