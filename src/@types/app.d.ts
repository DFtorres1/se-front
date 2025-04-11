type QueryParams = {
  [k: string]: string | number | boolean;
};

type SearchParams = {
  limit: number;
  offset: number;
  order: "desc" | "asc";
  orderBy: string;
  search: string;
};

type Config = {
  defaultOrder: PaginationOrder;
  defaultOrderBy: string;
  defaultSearchValue: string;
  defaultRowsPerPage: number;
  rowsPerPageOptions: number[];
  showLoading: boolean;
};

type PaginationOrder = "desc" | "asc";

type TokenType = {
  userId: number;
  iat: number;
  exp: number;
};

type RoutesType = {
  id: string;
  exact?: boolean;
  path?: string;
  guard?: React.FC;
  layout?: React.FC;
  // Disabled due to necessary any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
  routes?: RoutesType[];
};

type GuardIdProps = () => React.FC<React.PropsWithChildren<unknown>>;
