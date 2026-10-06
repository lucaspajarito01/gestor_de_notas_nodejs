# Gestor de notas - ACME School

Aplicación de consola para administrar estudiantes, docentes, cursos, aulas y temas,
programar cursos con docente y aula, inscribir estudiantes, registrar notas y consultar
un resumen académico.

## Requisitos

- Node.js 20 o superior
- MySQL con la base de datos `acme_school` y sus tablas
- Credenciales con permisos de lectura y escritura para esas tablas

## Configuración

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` a `.env` y completa los datos de conexión a MySQL.
3. Asegúrate de que la base de datos y sus tablas estén creadas antes de iniciar.

El archivo `.env` está excluido de Git para no publicar credenciales.

## Ejecución

- `npm start`: inicia el menú de gestión académica.
- `npm test`: ejecuta pruebas de validación de entradas.

La aplicación no crea ni modifica el esquema de la base de datos. Las fechas se
ingresan como `YYYY-MM-DD` o `YYYY-MM-DD HH:mm`. Las notas se guardan como enteros
no negativos porque la tabla existente utiliza un campo entero.
