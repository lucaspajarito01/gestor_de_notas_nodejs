export class CourseSchedule {
  #id; #courseId; #teacherId; #classroomId; #startDate; #endDate; #active;

  constructor({ id, courseId, teacherId, classroomId, startDate, endDate, active = 1 }) {
    this.#id = id;
    this.#courseId = courseId;
    this.#teacherId = teacherId;
    this.#classroomId = classroomId;
    this.#startDate = new Date(startDate);
    this.#endDate = new Date(endDate);
    this.#active = Boolean(active);
  }

  get id() { return this.#id; }
}