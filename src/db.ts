export type QueryResultRow = object;

export interface QueryResult<T extends QueryResultRow> {
  rows: T[];
}

export interface DatabaseClient {
  query<T extends QueryResultRow>(sql: string, params: unknown[]): Promise<QueryResult<T>>;
}

const db: DatabaseClient = {
  async query() {
    throw new Error('db.query not implemented');
  }
};

export default db;
