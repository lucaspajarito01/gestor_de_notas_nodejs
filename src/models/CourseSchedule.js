export class CourseSchedule {
  #id; #courseId; #teacherId; #classroomId; #startDate; #endDate; #active;

  constructor(id, courseId, teacherId, classroomId, startDate, endDate, active = 1) {
    this.#id = id;
    this.#courseId = courseId;
    this.#teacherId = teacherId;
    this.#classroomId = classroomId;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#active = active;
  }

  get id() { return this.#id; }
  set id(value) { this.#id = value; }

  get courseId() { return this.#courseId; }
  set courseId(value) { this.#courseId = value; }

  get teacherId() { return this.#teacherId; }
  set teacherId(value) { this.#teacherId = value; }

  get classroomId() { return this.#classroomId; }
  set classroomId(value) { this.#classroomId = value; }

  get startDate() { return this.#startDate; }
  set startDate(value) { this.#startDate = value; }

  get endDate() { return this.#endDate; }
  set endDate(value) { this.#endDate = value; }

  get active() { return this.#active; }
  set active(value) { this.#active = value; }
}