import readline from 'node:readline';
import { pool } from './config/database.js';
import {
  parseDateTime,
  parseInteger,
  requiredText
} from './utils/validation.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (question) => new Promise((resolve) => rl.question(question, (answer) => resolve(answer.trim())));

async function ask(question, validate, { optional = false } = {}) {
  while (true) {
    const value = await prompt(question);

    if (optional && value === '') return null;

    try {
      return validate(value);
    } catch (error) {
      console.log(`Entrada no válida: ${error.message}`);
    }
  }
}

const askText = (question, options) => ask(question, (value) => requiredText(value, 'Este campo'), options);
const askId = (question) => ask(question, (value) => parseInteger(value, 'El ID', { min: 1 }));
const askNonNegativeInteger = (question, label) =>
  ask(question, (value) => parseInteger(value, label, { min: 0 }));
const askPositiveInteger = (question, label) =>
  ask(question, (value) => parseInteger(value, label, { min: 1 }));
const askDate = (question, label) => ask(question, (value) => parseDateTime(value, label));

async function selectReference(query, label) {
  const [rows] = await pool.execute(query);
  if (rows.length === 0) throw new Error(`No hay ${label} registrados. Regístrelos primero.`);
  console.table(rows);
  const id = await askId(`ID de ${label}: `);
  if (!rows.some((row) => Number(row.id) === id)) {
    throw new Error(`El ID ${id} no corresponde a un registro disponible.`);
  }
  return id;
}

async function runMenu(title, options, { exitLabel = 'Volver' } = {}) {
  while (true) {
    console.log(`\n--- ${title} ---`);
    options.forEach(([label], index) => console.log(`${index + 1}. ${label}`));
    console.log(`0. ${exitLabel}`);

    const choice = await ask(
      'Seleccione una opción: ',
      (value) => parseInteger(value, 'La opción', { min: 0, max: options.length })
    );
    if (choice === 0) return;

    try {
      await options[choice - 1][1]();
    } catch (error) {
      console.error(`No se pudo completar la operación: ${error.message}`);
    }
  }
}

async function listStudents() {
  const [rows] = await pool.execute(
    `SELECT s.id, s.code, s.firstName, s.lastName, s.identificationNumber, s.email,
            c.name AS city
     FROM students s
     LEFT JOIN cities c ON c.id = s.city_id
     ORDER BY s.lastName, s.firstName`
  );
  console.table(rows);
}

async function createStudent() {
  const code = await askText('Código del estudiante: ');
  const firstName = await askText('Nombre: ');
  const lastName = await askText('Apellido: ');
  const identificationNumber = await askText('Número de identificación: ');
  const identificationTypeId = await selectReference(
    'SELECT id, code, name FROM identification_types ORDER BY name',
    'tipos de identificación'
  );
  const gender = await askText('Género: ', { optional: true });
  const birthdate = await askDate('Fecha de nacimiento (YYYY-MM-DD): ', 'La fecha');
  const email = await askText('Correo electrónico (Enter para omitir): ', { optional: true });
  const address = await askText('Dirección (Enter para omitir): ', { optional: true });
  const cityId = await selectReference(
    'SELECT id, code, name FROM cities ORDER BY name',
    'ciudades'
  );
  const [existing] = await pool.execute(
    'SELECT id FROM students WHERE identificationNumber = ? LIMIT 1',
    [identificationNumber]
  );
  if (existing.length > 0) throw new Error('Ya existe un estudiante con ese número de identificación.');

  const [result] = await pool.execute(
    `INSERT INTO students
      (code, firstName, lastName, identification_type_id, identificationNumber,
       gender, birthdate, email, address, city_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [code, firstName, lastName, identificationTypeId, identificationNumber,
      gender, birthdate, email, address, cityId]
  );
  console.log(`Estudiante creado correctamente. ID: ${result.insertId}`);
}

async function listCourses() {
  const [rows] = await pool.execute(
    `SELECT id, code, description, intensity, weigth AS weight, active
     FROM courses ORDER BY code`
  );
  console.table(rows);
}

async function createCourse() {
  const code = await askText('Código del curso: ');
  const description = await askText('Nombre o descripción: ');
  const intensity = await askPositiveInteger('Intensidad (horas): ', 'La intensidad');
  const weight = await askNonNegativeInteger('Peso del curso: ', 'El peso');
  const [existing] = await pool.execute('SELECT id FROM courses WHERE code = ? LIMIT 1', [code]);
  if (existing.length > 0) throw new Error('Ya existe un curso con ese código.');

  const [result] = await pool.execute(
    'INSERT INTO courses (code, description, intensity, weigth, active) VALUES (?, ?, ?, ?, 1)',
    [code, description, intensity, weight]
  );
  console.log(`Curso creado correctamente. ID: ${result.insertId}`);
}

async function listTeachers() {
  const [rows] = await pool.execute(
    `SELECT t.id, t.firstName, t.lastName, t.identificationNumber, t.email,
            it.name AS identification_type
     FROM teachers t
     LEFT JOIN identification_types it ON it.id = t.identification_type_id
     ORDER BY t.lastName, t.firstName`
  );
  console.table(rows);
}

async function createTeacher() {
  const firstName = await askText('Nombre: ');
  const lastName = await askText('Apellido: ');
  const identificationNumber = await askText('Número de identificación: ');
  const identificationTypeId = await selectReference(
    'SELECT id, code, name FROM identification_types ORDER BY name',
    'tipos de identificación'
  );
  const email = await askText('Correo electrónico (Enter para omitir): ', { optional: true });
  const [existing] = await pool.execute(
    'SELECT id FROM teachers WHERE identificationNumber = ? LIMIT 1',
    [identificationNumber]
  );
  if (existing.length > 0) throw new Error('Ya existe un docente con ese número de identificación.');

  const [result] = await pool.execute(
    `INSERT INTO teachers (firstName, lastName, identification_type_id, identificationNumber, email)
     VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, identificationTypeId, identificationNumber, email]
  );
  console.log(`Docente creado correctamente. ID: ${result.insertId}`);
}

async function listClassrooms() {
  const [rows] = await pool.execute(
    'SELECT id, code, description, capacity, active FROM classrooms ORDER BY code'
  );
  console.table(rows);
}

async function createClassroom() {
  const code = await askText('Código del aula: ');
  const description = await askText('Descripción o ubicación: ');
  const capacity = await askPositiveInteger('Capacidad: ', 'La capacidad');
  const [existing] = await pool.execute('SELECT id FROM classrooms WHERE code = ? LIMIT 1', [code]);
  if (existing.length > 0) throw new Error('Ya existe un aula con ese código.');

  const [result] = await pool.execute(
    'INSERT INTO classrooms (code, description, capacity, active) VALUES (?, ?, ?, 1)',
    [code, description, capacity]
  );
  console.log(`Aula creada correctamente. ID: ${result.insertId}`);
}

async function listSchedules() {
  const [rows] = await pool.execute(
    `SELECT cs.id, c.code AS course_code, c.description AS course,
            CONCAT(t.firstName, ' ', t.lastName) AS teacher,
            cr.code AS classroom, cs.start_date, cs.end_date, cs.active
     FROM courses_schedules cs
     JOIN courses c ON c.id = cs.course_id
     JOIN teachers t ON t.id = cs.teacher_id
     JOIN classrooms cr ON cr.id = cs.classroom_id
     ORDER BY cs.start_date`
  );
  console.table(rows);
}

async function createSchedule() {
  const courseId = await selectReference(
    'SELECT id, code, description FROM courses WHERE active = 1 ORDER BY code',
    'cursos activos'
  );
  const teacherId = await selectReference(
    `SELECT id, CONCAT(firstName, ' ', lastName) AS teacher, identificationNumber
     FROM teachers ORDER BY lastName, firstName`,
    'docentes'
  );
  const classroomId = await selectReference(
    'SELECT id, code, description, capacity FROM classrooms WHERE active = 1 ORDER BY code',
    'aulas activas'
  );
  const startDate = await askDate('Inicio (YYYY-MM-DD o YYYY-MM-DD HH:mm): ', 'La fecha de inicio');
  const endDate = await askDate('Fin (YYYY-MM-DD o YYYY-MM-DD HH:mm): ', 'La fecha de fin');
  if (new Date(endDate.replace(' ', 'T')) <= new Date(startDate.replace(' ', 'T'))) {
    throw new Error('La fecha de fin debe ser posterior a la de inicio.');
  }

  const [conflicts] = await pool.execute(
    `SELECT id FROM courses_schedules
     WHERE active = 1
       AND (teacher_id = ? OR classroom_id = ?)
       AND start_date < ? AND end_date > ?
     LIMIT 1`,
    [teacherId, classroomId, endDate, startDate]
  );
  if (conflicts.length > 0) {
    throw new Error('El docente o el aula ya tiene una programación que se cruza con ese horario.');
  }

  const [result] = await pool.execute(
    `INSERT INTO courses_schedules
      (course_id, teacher_id, classroom_id, start_date, end_date, active)
     VALUES (?, ?, ?, ?, ?, 1)`,
    [courseId, teacherId, classroomId, startDate, endDate]
  );
  console.log(`Curso programado y asignado correctamente. ID de programación: ${result.insertId}`);
}

async function listEnrollments() {
  const [rows] = await pool.execute(
    `SELECT i.id, s.code AS student_code, CONCAT(s.firstName, ' ', s.lastName) AS student,
            c.code AS course_code, c.description AS course,
            cs.start_date, i.register_date, i.active
     FROM inscriptions i
     JOIN students s ON s.id = i.student_id
     JOIN courses_schedules cs ON cs.id = i.course_schedule
     JOIN courses c ON c.id = cs.course_id
     ORDER BY i.register_date DESC`
  );
  console.table(rows);
}

async function enrollStudent() {
  const studentId = await selectReference(
    'SELECT id, code, firstName, lastName, identificationNumber FROM students ORDER BY lastName, firstName',
    'estudiantes'
  );
  const scheduleId = await selectReference(
    `SELECT cs.id, c.code AS course_code, c.description AS course,
            CONCAT(t.firstName, ' ', t.lastName) AS teacher, cr.code AS classroom,
            cr.capacity, cs.start_date
     FROM courses_schedules cs
     JOIN courses c ON c.id = cs.course_id
     JOIN teachers t ON t.id = cs.teacher_id
     JOIN classrooms cr ON cr.id = cs.classroom_id
     WHERE cs.active = 1 AND c.active = 1
     ORDER BY cs.start_date`,
    'programaciones activas'
  );

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [schedules] = await connection.execute(
      `SELECT cs.id, cr.capacity
       FROM courses_schedules cs
       JOIN classrooms cr ON cr.id = cs.classroom_id
       WHERE cs.id = ? AND cs.active = 1
       FOR UPDATE`,
      [scheduleId]
    );
    if (schedules.length === 0) throw new Error('La programación ya no está disponible.');

    const [duplicates] = await connection.execute(
      `SELECT id FROM inscriptions
       WHERE student_id = ? AND course_schedule = ? AND active = 1
       LIMIT 1`,
      [studentId, scheduleId]
    );
    if (duplicates.length > 0) throw new Error('El estudiante ya está inscrito en este curso.');

    const [counts] = await connection.execute(
      'SELECT COUNT(*) AS enrolled FROM inscriptions WHERE course_schedule = ? AND active = 1',
      [scheduleId]
    );
    const capacity = schedules[0].capacity;
    if (capacity !== null && Number(counts[0].enrolled) >= Number(capacity)) {
      throw new Error('El aula alcanzó su capacidad máxima.');
    }

    const [result] = await connection.execute(
      `INSERT INTO inscriptions (course_schedule, student_id, register_date, active)
       VALUES (?, ?, NOW(), 1)`,
      [scheduleId, studentId]
    );
    await connection.commit();
    console.log(`Inscripción registrada correctamente. ID: ${result.insertId}`);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function listGrades() {
  const [rows] = await pool.execute(
    `SELECT i.id AS inscription_id, s.code AS student_code,
            CONCAT(s.firstName, ' ', s.lastName) AS student,
            c.code AS course_code, c.description AS course,
            r.rate AS grade, r.comments
     FROM inscriptions i
     JOIN students s ON s.id = i.student_id
     JOIN courses_schedules cs ON cs.id = i.course_schedule
     JOIN courses c ON c.id = cs.course_id
     LEFT JOIN rates r ON r.inscription_id = i.id
     WHERE i.active = 1
     ORDER BY c.code, s.lastName, s.firstName`
  );
  console.table(rows);
}

async function recordGrade() {
  const inscriptionId = await selectReference(
    `SELECT i.id, s.code AS student_code,
            CONCAT(s.firstName, ' ', s.lastName) AS student,
            c.code AS course_code, c.description AS course
     FROM inscriptions i
     JOIN students s ON s.id = i.student_id
     JOIN courses_schedules cs ON cs.id = i.course_schedule
     JOIN courses c ON c.id = cs.course_id
     WHERE i.active = 1
     ORDER BY c.code, s.lastName, s.firstName`,
    'inscripciones activas'
  );
  const grade = await askNonNegativeInteger('Nota (número entero no negativo): ', 'La nota');
  const comments = await askText('Comentario (Enter para omitir): ', { optional: true });
  const [existing] = await pool.execute(
    'SELECT id FROM rates WHERE inscription_id = ? LIMIT 1',
    [inscriptionId]
  );

  if (existing.length > 0) {
    await pool.execute('UPDATE rates SET rate = ?, comments = ? WHERE id = ?', [
      grade, comments, existing[0].id
    ]);
    console.log('Nota actualizada correctamente.');
  } else {
    const [result] = await pool.execute(
      'INSERT INTO rates (inscription_id, rate, comments) VALUES (?, ?, ?)',
      [inscriptionId, grade, comments]
    );
    console.log(`Nota registrada correctamente. ID: ${result.insertId}`);
  }
}

async function listTopics() {
  const [rows] = await pool.execute(
    `SELECT t.id, t.code, t.title, t.description, c.code AS course_code,
            c.description AS course, t.active
     FROM topics t
     JOIN courses c ON c.id = t.course_id
     ORDER BY c.code, t.code`
  );
  console.table(rows);
}

async function createTopic() {
  const courseId = await selectReference(
    'SELECT id, code, description FROM courses WHERE active = 1 ORDER BY code',
    'cursos activos'
  );
  const code = await askText('Código del tema: ');
  const title = await askText('Título: ');
  const description = await askText('Descripción (Enter para omitir): ', { optional: true });
  const [existing] = await pool.execute(
    'SELECT id FROM topics WHERE course_id = ? AND code = ? LIMIT 1',
    [courseId, code]
  );
  if (existing.length > 0) throw new Error('Ya existe un tema con ese código en el curso.');

  const [result] = await pool.execute(
    'INSERT INTO topics (course_id, code, title, description, active) VALUES (?, ?, ?, ?, 1)',
    [courseId, code, title, description]
  );
  console.log(`Tema creado correctamente. ID: ${result.insertId}`);
}

async function showSummary() {
  const [rows] = await pool.execute(
    `SELECT
       (SELECT COUNT(*) FROM students) AS students,
       (SELECT COUNT(*) FROM teachers) AS teachers,
       (SELECT COUNT(*) FROM courses WHERE active = 1) AS active_courses,
       (SELECT COUNT(*) FROM courses_schedules WHERE active = 1) AS active_schedules,
       (SELECT COUNT(*) FROM inscriptions WHERE active = 1) AS active_enrollments,
       (SELECT COUNT(*) FROM rates) AS recorded_grades`
  );
  console.table(rows);
}

async function main() {
  await runMenu('ACME SCHOOL - GESTIÓN ACADÉMICA', [
    ['Gestión de estudiantes', () => runMenu('ESTUDIANTES', [
      ['Registrar estudiante', createStudent],
      ['Listar estudiantes', listStudents]
    ])],
    ['Gestión de cursos', () => runMenu('CURSOS', [
      ['Crear curso', createCourse],
      ['Listar cursos', listCourses]
    ])],
    ['Gestión de docentes', () => runMenu('DOCENTES', [
      ['Registrar docente', createTeacher],
      ['Listar docentes', listTeachers]
    ])],
    ['Gestión de aulas', () => runMenu('AULAS', [
      ['Registrar aula', createClassroom],
      ['Listar aulas', listClassrooms]
    ])],
    ['Programar y asignar cursos', () => runMenu('PROGRAMACIONES', [
      ['Asignar curso, docente y aula', createSchedule],
      ['Listar programaciones', listSchedules]
    ])],
    ['Inscribir estudiantes', () => runMenu('INSCRIPCIONES', [
      ['Inscribir estudiante en una programación', enrollStudent],
      ['Listar inscripciones', listEnrollments]
    ])],
    ['Gestionar notas', () => runMenu('NOTAS', [
      ['Registrar o actualizar nota', recordGrade],
      ['Consultar notas', listGrades]
    ])],
    ['Gestionar temas', () => runMenu('TEMAS', [
      ['Crear tema para un curso', createTopic],
      ['Listar temas', listTopics]
    ])],
    ['Ver resumen académico', showSummary]
  ], { exitLabel: 'Salir' });
}

try {
  await main();
} catch (error) {
  console.error(`Error de la aplicación: ${error.message}`);
  process.exitCode = 1;
} finally {
  rl.close();
  await pool.end();
}
