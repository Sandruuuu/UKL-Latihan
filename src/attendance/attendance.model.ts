export class Attendance {
  attendance_id: number;
  user_id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  status: string;

  constructor(data: Partial<Attendance> = {}) {
    const now = new Date();
    this.attendance_id = data.attendance_id ?? 0;
    this.user_id = data.user_id ?? 0;
    this.date = data.date ?? now.toISOString().slice(0, 10);
    this.time = data.time ?? now.toISOString().slice(11, 19);
    this.status = data.status ?? 'present';
  }
}