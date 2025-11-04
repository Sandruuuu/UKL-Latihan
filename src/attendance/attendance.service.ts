import { Injectable } from '@nestjs/common';
import { Attendance } from './attendance.model';

@Injectable()
export class AttendanceService {
  private records: Attendance[] = [];
  private nextId = 1;

  create(dto: Partial<Attendance>): Attendance {
    const rec = new Attendance({ ...dto, attendance_id: this.nextId++ });
    this.records.push(rec);
    return rec;
  }

  findAll(): Attendance[] {
    return this.records;
  }

  findByUser(user_id: number): Attendance[] {
    return this.records.filter(r => r.user_id === user_id);
  }

  findById(id: number): Attendance | undefined {
    return this.records.find(r => r.attendance_id === id);
  }

  findHistory(user_id: number, startDate?: string, endDate?: string): Attendance[] {
    let records = this.records.filter(r => r.user_id === user_id);

    if (startDate) {
      const s = new Date(startDate);
      records = records.filter(r => new Date(r.date) >= s);
    }
    if (endDate) {
      const e = new Date(endDate);
      records = records.filter(r => new Date(r.date) <= e);
    }

    records.sort((a, b) => {
      const da = new Date(`${a.date}T${a.time}`);
      const db = new Date(`${b.date}T${b.time}`);
      return da.getTime() - db.getTime();
    });

    return records;
  }

  // new: generate monthly attendance summary for a user
  findMonthlySummary(user_id: number, month?: string) {
    // month format expected: "MM-YYYY". If not provided, use current month.
    const now = new Date();
    let monthIndex = now.getMonth(); // 0-based
    let year = now.getFullYear();

    if (month) {
      const parts = month.split('-');
      if (parts.length === 2) {
        const m = parseInt(parts[0], 10);
        const y = parseInt(parts[1], 10);
        if (!isNaN(m) && !isNaN(y) && m >= 1 && m <= 12) {
          monthIndex = m - 1;
          year = y;
        }
      }
    }

    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0); // last day of month

    const records = this.records.filter(r => {
      if (r.user_id !== user_id) return false;
      const d = new Date(r.date);
      return d >= start && d <= end;
    });

    let hadir = 0;
    let izin = 0;
    let sakit = 0;
    let alpa = 0;

    for (const r of records) {
      const s = (r.status || '').toString().toLowerCase();
      if (s === 'hadir' || s === 'present') hadir++;
      else if (s === 'izin') izin++;
      else if (s === 'sakit') sakit++;
      else if (s === 'alpa' || s === 'alpha' || s === 'absent') alpa++;
      else alpa++; // unknown status count as alpa
    }

    const monthStr = `${String(monthIndex + 1).padStart(2, '0')}-${year}`;

    return {
      user_id,
      month: monthStr,
      attendance_summary: {
        hadir,
        izin,
        sakit,
        alpa,
      },
    };
  }

  // New: grouped analysis between start/end dates, grouped by a user property (e.g. 'role')
  analyzeByGroup(startDate: string, endDate: string, groupBy: string, users: any[]) {
    const s = startDate ? new Date(`${startDate}T00:00:00`) : new Date('1970-01-01T00:00:00');
    const e = endDate ? new Date(`${endDate}T23:59:59`) : new Date('9999-12-31T23:59:59');

    // filter attendance records in range
    const records = this.records.filter(r => {
      const d = new Date(r.date);
      return d >= s && d <= e;
    });

    const groups: Record<
      string,
      { hadir: number; izin: number; sakit: number; alpa: number; usersSet: Set<number> }
    > = {};

    for (const rec of records) {
      const user = users.find(u => u.id === rec.user_id);
      const groupVal =
        (user && (groupBy in user ? String((user as any)[groupBy] ?? 'unknown') : 'unknown')) ||
        'unknown';

      if (!groups[groupVal]) {
        groups[groupVal] = { hadir: 0, izin: 0, sakit: 0, alpa: 0, usersSet: new Set<number>() };
      }

      const sStatus = (rec.status || '').toString().toLowerCase();
      if (sStatus === 'hadir' || sStatus === 'present') groups[groupVal].hadir++;
      else if (sStatus === 'izin') groups[groupVal].izin++;
      else if (sStatus === 'sakit') groups[groupVal].sakit++;
      else groups[groupVal].alpa++;

      groups[groupVal].usersSet.add(rec.user_id);
    }

    // prepare response array
    const result = Object.entries(groups).map(([group, stats]) => {
      const total_attendance_count = stats.hadir + stats.izin + stats.sakit + stats.alpa;

      const hadir_pct = total_attendance_count ? (stats.hadir / total_attendance_count) * 100 : 0;
      const izin_pct = total_attendance_count ? (stats.izin / total_attendance_count) * 100 : 0;
      const sakit_pct = total_attendance_count ? (stats.sakit / total_attendance_count) * 100 : 0;
      const alpa_pct = total_attendance_count ? (stats.alpa / total_attendance_count) * 100 : 0;

      // total users in group: count users array members whose property equals group
      const total_users = users.filter(u => {
        if (!(groupBy in u)) return false;
        return String((u as any)[groupBy] ?? 'unknown') === group;
      }).length;

      return {
        group,
        total_users,
        attendance_rate: {
          hadir_percentage: Number(hadir_pct.toFixed(2)),
          izin_percentage: Number(izin_pct.toFixed(2)),
          sakit_percentage: Number(sakit_pct.toFixed(2)),
          alpa_percentage: Number(alpa_pct.toFixed(2)),
        },
        total_attendance: {
          hadir: stats.hadir,
          izin: stats.izin,
          sakit: stats.sakit,
          alpa: stats.alpa,
        },
      };
    });

    return result;
  }
}