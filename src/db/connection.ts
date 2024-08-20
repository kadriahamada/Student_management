import mysql2, { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import { ValuesType } from "./conn.Types";
import { DBResponse } from "../types/general.type";

export class CONNECT_DB {
  private _connect: PoolConnection | null;
  private pool: Pool;

  constructor() {
    this._connect = null;
    this.pool = mysql2.createPool({
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
    });
  }

  async connect() {
    this._connect = await this.pool.getConnection();
  }

  async execute(sql: string, params: ValuesType[] = []) {
    try {
      if (!this._connect) {
        await this.connect();
      }
      if (!this._connect) throw new Error("Connection is not defined");
      const [rows] = await this._connect.execute(sql, params);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      if (this._connect) {
        this._connect.release();
      }
    }
  }

  async insert<T extends Record<string, any>>(
    table: string,
    data: Partial<T>
  ): Promise<DBResponse> {
    let query = `INSERT INTO ${table}(`;
    const keys: string[] = [];
    const values: ValuesType[] = [];

    Object.keys(data).forEach((key) => {
      if (data[key] != null) {
        keys.push(key);
        values.push(data[key]);
      }
    });
    if (keys.length <= 0) {
      throw new Error("Data insertion failed ");
    }
    query += keys.join(", ");
    query += `) VALUES(${keys.map(() => "?").join(", ")})`;
    const results = (await this.execute(query, values)) as ResultSetHeader;
    if (results.affectedRows === 1) {
      return { success: true, insertId: results.insertId };
    } else {
      return { success: false, insertId: 0 };
    }
  }

  async findOne<T extends Record<string, any>>(
    table: string,
    conditions: Partial<T>
  ) {
    try {
      if (Object.keys(conditions).length <= 0) {
        throw new Error("Selection condition did not much at any field");
      }

      let query = `Select * from ${table} WHERE `;

      const keys: string[] = [];
      const values: ValuesType[] = [];
      Object.keys(conditions).forEach((key) => {
        if (conditions[key] !== null && conditions[key] !== undefined) {
          keys.push(key);
          values.push(conditions[key]);
        }
      });
      if (values.length <= 0) {
        throw new Error("Columns are empty..");
      }
      query += keys.map((key) => ` ${key}=? `).join(" AND ");
      console.log(query);
      const results: T[] = (await this.execute(query, values)) as T[];
      if (results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async _update<T extends Record<string, any>>(
    table: string,
    data: Partial<T>,
    conditions: Partial<T>
  ): Promise<DBResponse> {
    if (Object.keys(conditions).length <= 0) {
      throw new Error(
        "Conditions must be field you have empty set please feel conditions.."
      );
    }
    const keys: string[] = [];
    const whereKeys: string[] = [];
    const values: ValuesType[] = [];
    let query = `update ${table} set `;

    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
          keys.push(key);
          values.push(data[key]);
        }
      });
    }
    if (Object.keys(conditions).length > 0) {
      Object.keys(conditions).forEach((key) => {
        if (conditions[key] !== null && conditions[key] !== undefined) {
          whereKeys.push(key);
          values.push(conditions[key]);
        }
      });
    }
    query += `${keys.map((key) => `${key} = ?`).join(", ")}`;
    query += ` WHERE ${whereKeys.map((key) => `${key} = ?`).join(" AND ")}`;
    console.log(query);
    const results = (await this.execute(query, values)) as ResultSetHeader;
    if (results.affectedRows === 1) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async _delete<T extends Record<string, any>>(
    table: string,
    conditions: Partial<T>
  ): Promise<DBResponse> {
    let query = `delete from ${table}`;
    const keys: string[] = [];
    const values: ValuesType[] = [];
    if (Object.keys(conditions).length > 0) {
      Object.keys(conditions).forEach((key) => {
        keys.push(key);
        values.push(conditions[key]);
      });
    }
    query += " WHERE ";
    query += `${keys.map((key) => `${key} = ?`).join(" AND ")}`;
    console.log(query);
    const results = (await this.execute(query, values)) as ResultSetHeader;
    if (results.affectedRows === 1) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async _view<T extends Record<string, any>>(
    table: string,
    conditions?: Partial<T>
  ) {
    const keys: string[] = [];
    const values: ValuesType[] = [];
    let query = `SELECT * FROM ${table}`;
    if (conditions && Object.keys(conditions).length > 0) {
      Object.keys(conditions).forEach((key) => {
        if (conditions[key] !== null && conditions[key] !== undefined) {
          keys.push(key);
          values.push(conditions[key]);
        }
      });
      query += ` WHERE `;
      query += `${keys.map((key) => `${key} =?`).join(" AND ")}`;
      console.log(query);
    }
    const results = (await this.execute(query, values)) as T[];
    return results;
  }
}

export const dbInstance = new CONNECT_DB();
