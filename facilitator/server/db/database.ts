import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

const DATA_DIR = './data';
const DB_PATH = path.join(DATA_DIR, 'acculum.db');

type SqlValue = string | number | null | Uint8Array;
type ParamMap = Record<string, SqlValue>;

interface RowObject {
  [key: string]: SqlValue;
}

class DatabaseManager {
  private db: InstanceType<Awaited<ReturnType<typeof initSqlJs>>['Database']> | null = null;

  async init(): Promise<void> {
    const SQL = await initSqlJs();
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_PATH)) {
      const fileBuffer = fs.readFileSync(DB_PATH);
      this.db = new SQL.Database(fileBuffer);
    } else {
      this.db = new SQL.Database();
    }
    this.createTables();
    console.log('[DB] Database initialized');
  }

  private save(): void {
    if (!this.db) return;
    const data = this.db.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  }

  private getDb() {
    if (!this.db) throw new Error('Database not initialized. Call init() first.');
    return this.db;
  }

  run(sql: string, params: ParamMap | SqlValue[] = {}): void {
    const db = this.getDb();
    db.run(sql, params as any);
    this.save();
  }

  get<T = RowObject>(sql: string, params: ParamMap | SqlValue[] = []): T | null {
    const db = this.getDb();
    const stmt = db.prepare(sql);
    const hasParams = params && (Array.isArray(params) ? params.length > 0 : Object.keys(params).length > 0);
    if (hasParams) {
      stmt.bind(params as any);
    }
    if (stmt.step()) {
      const row = stmt.getAsObject() as T;
      stmt.free();
      return row;
    }
    stmt.free();
    return null;
  }

  all<T = RowObject>(sql: string, params: ParamMap | SqlValue[] = []): T[] {
    const db = this.getDb();
    const stmt = db.prepare(sql);
    const hasParams = params && (Array.isArray(params) ? params.length > 0 : Object.keys(params).length > 0);
    if (hasParams) {
      stmt.bind(params as any);
    }
    const rows: T[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject() as T);
    }
    stmt.free();
    return rows;
  }

  exec(sql: string): any[] {
    return this.getDb().exec(sql);
  }

  close(): void {
    if (this.db) {
      this.save();
      this.db.close();
      this.db = null;
    }
  }

  private createTables(): void {
    const db = this.getDb();
    db.run(`
      CREATE TABLE IF NOT EXISTS facilitators (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT,
        school TEXT,
        facilitator_id TEXT,
        subjects TEXT,
        classes TEXT,
        preferred_language TEXT DEFAULT 'English',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        facilitator_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        student_id TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        class TEXT,
        school TEXT,
        preferred_language TEXT,
        interests TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS student_reports (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        report_version TEXT NOT NULL,
        report_date TEXT NOT NULL,
        raw_json TEXT NOT NULL,
        imported_at TEXT NOT NULL,
        imported_by TEXT NOT NULL,
        is_demo INTEGER DEFAULT 0,
        FOREIGN KEY (student_id) REFERENCES students(id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS learning_activities (
        id TEXT PRIMARY KEY,
        report_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        activity_type TEXT NOT NULL,
        subject TEXT,
        topic TEXT,
        subtopic TEXT,
        difficulty TEXT,
        language TEXT,
        score_numerator INTEGER,
        score_denominator INTEGER,
        time_spent_seconds INTEGER,
        completed INTEGER DEFAULT 0,
        attempts INTEGER DEFAULT 1,
        hints_requested INTEGER DEFAULT 0,
        questions_skipped INTEGER DEFAULT 0,
        repeated_mistakes INTEGER DEFAULT 0,
        confidence_rating INTEGER,
        activity_date TEXT,
        extra_data TEXT,
        created_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS learning_signals (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        report_id TEXT NOT NULL,
        signal_type TEXT NOT NULL,
        subject TEXT,
        topic TEXT,
        subtopic TEXT,
        severity TEXT DEFAULT 'medium',
        evidence TEXT NOT NULL,
        confidence_score REAL,
        recommended_action TEXT,
        status TEXT DEFAULT 'active',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS interventions (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        signal_id TEXT,
        facilitator_id TEXT NOT NULL,
        intervention_type TEXT NOT NULL,
        subject TEXT,
        topic TEXT,
        subtopic TEXT,
        language TEXT DEFAULT 'English',
        format TEXT,
        difficulty TEXT,
        notes TEXT,
        status TEXT DEFAULT 'assigned',
        assigned_at TEXT NOT NULL,
        completed_at TEXT,
        created_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS reassessments (
        id TEXT PRIMARY KEY,
        intervention_id TEXT NOT NULL,
        student_id TEXT NOT NULL,
        subject TEXT,
        topic TEXT,
        before_score_numerator INTEGER,
        before_score_denominator INTEGER,
        after_score_numerator INTEGER,
        after_score_denominator INTEGER,
        before_report_id TEXT,
        after_report_id TEXT,
        improvement_percentage REAL,
        status TEXT DEFAULT 'pending',
        completed_at TEXT,
        created_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS facilitator_action_log (
        id TEXT PRIMARY KEY,
        facilitator_id TEXT NOT NULL,
        action_type TEXT NOT NULL,
        target_student_id TEXT,
        target_report_id TEXT,
        details TEXT,
        created_at TEXT NOT NULL
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        facilitator_id TEXT NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        student_id TEXT,
        report_id TEXT,
        read INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
      );
    `);
    this.save();
    console.log('[DB] All tables created/verified');
  }
}

export const dbManager = new DatabaseManager();
export default dbManager;
