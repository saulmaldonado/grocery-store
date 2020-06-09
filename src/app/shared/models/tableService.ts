import { Observable } from 'rxjs';

export interface TableService {
  tablePage: number;
  tablePageSize: number;
  tableSize: number;

  data$: Observable<any[]>;

  tableData$: Observable<any[]>;
}
