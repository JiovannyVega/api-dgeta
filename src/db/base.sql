create database dgeta;

use dgeta;

CREATE TABLE `roles` (
    `id_rol` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre_rol` VARCHAR(50) NOT NULL,
    `descripcion` TEXT2
);

CREATE TABLE `usuarios` (
    `id_usuario` INT PRIMARY KEY AUTO_INCREMENT,
    `id_rol` INT NOT NULL,
    `username` VARCHAR(50) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `fecha_registro` DATETIME DEFAULT(CURRENT_TIMESTAMP),
    `ultimo_login` DATETIME,
    `activo` BOOLEAN DEFAULT true
);

CREATE TABLE `estados` (
    `id_estado` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `clave` VARCHAR(10)
);

CREATE TABLE `municipios` (
    `id_municipio` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estado` INT NOT NULL,
    `nombre` VARCHAR(100) NOT NULL
);

CREATE TABLE `informacion_personal` (
    `id_info` INT PRIMARY KEY AUTO_INCREMENT,
    `id_usuario` INT UNIQUE NOT NULL,
    `curp` VARCHAR(18) UNIQUE,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido_paterno` VARCHAR(50) NOT NULL,
    `apellido_materno` VARCHAR(50),
    `fecha_nacimiento` DATE,
    `sexo` ENUM(
        'Masculino',
        'Femenino',
        'Otro'
    ),
    `telefono` VARCHAR(15),
    `celular` VARCHAR(15),
    `direccion` TEXT,
    `colonia` VARCHAR(100),
    `id_municipio` INT,
    `codigo_postal` VARCHAR(10),
    `fotografia` VARCHAR(255)
);

CREATE TABLE `especialidades` (
    `id_especialidad` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre_especialidad` VARCHAR(100) NOT NULL,
    `clave_especialidad` VARCHAR(20) UNIQUE NOT NULL,
    `descripcion` TEXT
);

CREATE TABLE `grupos` (
    `id_grupo` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre_grupo` VARCHAR(20) NOT NULL,
    `turno` ENUM(
        'Matutino',
        'Vespertino',
        'Nocturno'
    ) NOT NULL,
    `semestre` INT NOT NULL,
    `id_especialidad` INT NOT NULL
);

CREATE TABLE `estudiantes` (
    `id_estudiante` INT PRIMARY KEY AUTO_INCREMENT,
    `id_usuario` INT UNIQUE NOT NULL,
    `id_grupo` INT,
    `numero_control` VARCHAR(20) UNIQUE NOT NULL,
    `promedio_secundaria` DECIMAL(3, 1),
    `escuela_procedencia` VARCHAR(100),
    `estatus` ENUM(
        'Activo',
        'Inactivo',
        'Egresado',
        'Baja'
    ) DEFAULT 'Activo'
);

CREATE TABLE `docentes` (
    `id_docente` INT PRIMARY KEY AUTO_INCREMENT,
    `id_usuario` INT UNIQUE NOT NULL,
    `numero_empleado` VARCHAR(20) UNIQUE NOT NULL,
    `grado_academico` VARCHAR(50),
    `especialidad` VARCHAR(100),
    `estatus` ENUM('Activo', 'Inactivo') DEFAULT 'Activo'
);

CREATE TABLE `materias` (
    `id_materia` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre_materia` VARCHAR(100) NOT NULL,
    `clave_materia` VARCHAR(20) UNIQUE NOT NULL,
    `semestre` INT NOT NULL,
    `horas_teoricas` INT,
    `horas_practicas` INT,
    `id_especialidad` INT
);

CREATE TABLE `grupos_materias` (
    `id_grupo_materia` INT PRIMARY KEY AUTO_INCREMENT,
    `id_grupo` INT NOT NULL,
    `id_materia` INT NOT NULL,
    `id_docente` INT NOT NULL,
    `periodo` VARCHAR(20) NOT NULL
);

CREATE TABLE `calificaciones` (
    `id_calificacion` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `id_grupo_materia` INT NOT NULL,
    `parcial_1` DECIMAL(4, 2),
    `parcial_2` DECIMAL(4, 2),
    `parcial_3` DECIMAL(4, 2),
    `calificacion_final` DECIMAL(4, 2),
    `fecha_actualizacion` TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)
);

CREATE TABLE `tutorias` (
    `id_tutoria` INT PRIMARY KEY AUTO_INCREMENT,
    `id_docente` INT NOT NULL,
    `id_grupo` INT NOT NULL,
    `periodo` VARCHAR(20) NOT NULL
);

CREATE TABLE `tipos_incidencia` (
    `id_tipo_incidencia` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` TEXT
);

CREATE TABLE `incidencias` (
    `id_incidencia` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `id_docente_reporta` INT NOT NULL,
    `id_tipo_incidencia` INT,
    `fecha_incidencia` DATE NOT NULL,
    `fecha_reporte` DATETIME DEFAULT(CURRENT_TIMESTAMP),
    `especialidad` VARCHAR(100),
    `semestre_grupo` VARCHAR(50),
    `descripcion` TEXT NOT NULL,
    `medidas_tomadas` TEXT,
    `compromisos_estudiante` TEXT,
    `estatus` ENUM(
        'Reportado',
        'En seguimiento',
        'Resuelto'
    ) DEFAULT 'Reportado'
);

CREATE TABLE `tutorias_individuales` (
    `id_tutoria_ind` INT PRIMARY KEY AUTO_INCREMENT,
    `id_tutoria` INT NOT NULL,
    `id_estudiante` INT NOT NULL,
    `fecha_tutoria` DATETIME NOT NULL,
    `situacion_presentada` TEXT NOT NULL,
    `atencion_otorgada` TEXT NOT NULL,
    `resultados` TEXT,
    `observaciones` TEXT,
    `canalizado` BOOLEAN DEFAULT false,
    `instancia_canalizacion` VARCHAR(100)
);

CREATE TABLE `cuestionarios` (
    `id_cuestionario` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT,
    `version` VARCHAR(20),
    `fecha_creacion` DATE
);

CREATE TABLE `preguntas` (
    `id_pregunta` INT PRIMARY KEY AUTO_INCREMENT,
    `id_cuestionario` INT NOT NULL,
    `texto_pregunta` TEXT NOT NULL,
    `tipo_respuesta` ENUM(
        'BOOLEAN',
        'NUMERICO',
        'TEXTO',
        'OPCIONES'
    ) NOT NULL,
    `es_riesgo` BOOLEAN DEFAULT false,
    `orden` INT NOT NULL
);

CREATE TABLE `respuestas` (
    `id_respuesta` INT PRIMARY KEY AUTO_INCREMENT,
    `id_pregunta` INT NOT NULL,
    `id_estudiante` INT NOT NULL,
    `valor_booleano` BOOLEAN,
    `valor_numerico` DECIMAL(5, 2),
    `valor_texto` TEXT,
    `fecha_respuesta` DATETIME DEFAULT(CURRENT_TIMESTAMP)
);

CREATE TABLE `resultados_cuestionarios` (
    `id_resultado` INT PRIMARY KEY AUTO_INCREMENT,
    `id_cuestionario` INT NOT NULL,
    `id_estudiante` INT NOT NULL,
    `fecha_aplicacion` DATE NOT NULL,
    `puntaje_total` INT,
    `nivel_riesgo` VARCHAR(50),
    `observaciones` TEXT
);

CREATE TABLE `categorias_estilo_aprendizaje` (
    `id_categoria` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` TEXT
);

CREATE TABLE `estilos_aprendizaje` (
    `id_estilo` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `fecha_aplicacion` DATE NOT NULL
);

CREATE TABLE `resultados_estilos` (
    `id_resultado` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estilo` INT NOT NULL,
    `id_categoria` INT NOT NULL,
    `puntaje` INT NOT NULL
);

CREATE TABLE `evaluaciones_tutoria` (
    `id_evaluacion` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `id_tutoria` INT NOT NULL,
    `fecha_evaluacion` DATE NOT NULL,
    `identificacion_tutor` BOOLEAN NOT NULL,
    `atencion_cordial` BOOLEAN NOT NULL,
    `resolucion_dudas` BOOLEAN NOT NULL,
    `tiempo_suficiente` BOOLEAN,
    `sesiones_recibidas` INT,
    `tutorias_individuales` BOOLEAN,
    `visitas_domiciliarias` BOOLEAN,
    `canalizaciones` BOOLEAN,
    `apoyo_academico` BOOLEAN,
    `orientacion_bachillerato` BOOLEAN,
    `informacion_becas` BOOLEAN,
    `ambiente_respetuoso` BOOLEAN,
    `impacto_positivo` BOOLEAN,
    `importancia_tutorias` BOOLEAN,
    `sugerencias` TEXT
);

CREATE TABLE `autoevaluaciones` (
    `id_autoevaluacion` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `fecha_autoevaluacion` DATE NOT NULL,
    `metas_logradas` TEXT,
    `factores_exito` TEXT,
    `factores_fracaso` TEXT,
    `problemas` TEXT,
    `desempenio_academico` ENUM(
        'Excelente',
        'Bueno',
        'Regular',
        'Deficiente'
    ),
    `evaluacion_tutor` TEXT,
    `sugerencias_tutor` TEXT,
    `sentimiento_conclusion` TEXT
);

CREATE TABLE `familiares` (
    `id_familiar` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `parentesco` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(15),
    `email` VARCHAR(100),
    `direccion` TEXT,
    `es_tutor` BOOLEAN DEFAULT false,
    `vive_con_estudiante` BOOLEAN DEFAULT true
);

CREATE TABLE `salud_estudiante` (
    `id_salud` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `alergias` TEXT,
    `enfermedades_cronicas` TEXT,
    `medicamentos` TEXT,
    `discapacidad` TEXT,
    `tratamiento_psicologico` BOOLEAN,
    `servicio_salud` VARCHAR(100),
    `tipo_sangre` VARCHAR(10)
);

CREATE TABLE `asistencias` (
    `id_asistencia` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `id_grupo_materia` INT NOT NULL,
    `fecha` DATE NOT NULL,
    `asistio` BOOLEAN DEFAULT false,
    `justificacion` TEXT
);

CREATE TABLE `documentos_estudiante` (
    `id_documento` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `tipo_documento` VARCHAR(50) NOT NULL,
    `nombre_documento` VARCHAR(100) NOT NULL,
    `ruta_archivo` VARCHAR(255) NOT NULL,
    `fecha_subida` DATETIME DEFAULT(CURRENT_TIMESTAMP)
);

CREATE TABLE `historial_academico` (
    `id_historial` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `semestre` INT NOT NULL,
    `promedio` DECIMAL(4, 2),
    `materias_aprobadas` INT,
    `materias_reprobadas` INT,
    `observaciones` TEXT
);

CREATE TABLE `canalizaciones` (
    `id_canalizacion` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `id_tutor` INT NOT NULL,
    `fecha_canalizacion` DATE NOT NULL,
    `instancia` VARCHAR(100) NOT NULL,
    `situacion_presentada` TEXT NOT NULL,
    `motivo_canalizacion` TEXT NOT NULL,
    `resultados` TEXT,
    `observaciones` TEXT
);

CREATE TABLE `seguimiento_academico` (
    `id_seguimiento` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `semestre` INT NOT NULL,
    `acciones_emprender` TEXT,
    `fecha_seguimiento` DATE NOT NULL,
    `id_tutor` INT NOT NULL
);

CREATE TABLE `actividades_extracurriculares` (
    `id_actividad` INT PRIMARY KEY AUTO_INCREMENT,
    `id_estudiante` INT NOT NULL,
    `nombre_actividad` VARCHAR(100) NOT NULL,
    `tipo_actividad` VARCHAR(50) NOT NULL,
    `periodo` VARCHAR(20) NOT NULL,
    `horas` INT,
    `reconocimientos` TEXT
);

CREATE TABLE `mensajes` (
    `id_mensaje` INT PRIMARY KEY AUTO_INCREMENT,
    `id_remitente` INT NOT NULL,
    `id_destinatario` INT NOT NULL,
    `asunto` VARCHAR(100) NOT NULL,
    `contenido` TEXT NOT NULL,
    `fecha_envio` DATETIME DEFAULT(CURRENT_TIMESTAMP),
    `leido` BOOLEAN DEFAULT false
);

CREATE TABLE `configuraciones` (
    `id_config` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre_config` VARCHAR(50) UNIQUE NOT NULL,
    `valor_config` TEXT,
    `descripcion` TEXT
);

ALTER TABLE `usuarios`
ADD FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);

ALTER TABLE `municipios`
ADD FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`);

ALTER TABLE `informacion_personal`
ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `informacion_personal`
ADD FOREIGN KEY (`id_municipio`) REFERENCES `municipios` (`id_municipio`);

ALTER TABLE `grupos`
ADD FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`);

ALTER TABLE `estudiantes`
ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `estudiantes`
ADD FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`);

ALTER TABLE `docentes`
ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `materias`
ADD FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id_especialidad`);

ALTER TABLE `grupos_materias`
ADD FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`);

ALTER TABLE `grupos_materias`
ADD FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id_materia`);

ALTER TABLE `grupos_materias`
ADD FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id_docente`);

ALTER TABLE `calificaciones`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `calificaciones`
ADD FOREIGN KEY (`id_grupo_materia`) REFERENCES `grupos_materias` (`id_grupo_materia`);

ALTER TABLE `tutorias`
ADD FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id_docente`);

ALTER TABLE `tutorias`
ADD FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`);

ALTER TABLE `incidencias`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `incidencias`
ADD FOREIGN KEY (`id_docente_reporta`) REFERENCES `docentes` (`id_docente`);

ALTER TABLE `incidencias`
ADD FOREIGN KEY (`id_tipo_incidencia`) REFERENCES `tipos_incidencia` (`id_tipo_incidencia`);

ALTER TABLE `tutorias_individuales`
ADD FOREIGN KEY (`id_tutoria`) REFERENCES `tutorias` (`id_tutoria`);

ALTER TABLE `tutorias_individuales`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `preguntas`
ADD FOREIGN KEY (`id_cuestionario`) REFERENCES `cuestionarios` (`id_cuestionario`);

ALTER TABLE `respuestas`
ADD FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`);

ALTER TABLE `respuestas`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `resultados_cuestionarios`
ADD FOREIGN KEY (`id_cuestionario`) REFERENCES `cuestionarios` (`id_cuestionario`);

ALTER TABLE `resultados_cuestionarios`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `estilos_aprendizaje`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `resultados_estilos`
ADD FOREIGN KEY (`id_estilo`) REFERENCES `estilos_aprendizaje` (`id_estilo`);

ALTER TABLE `resultados_estilos`
ADD FOREIGN KEY (`id_categoria`) REFERENCES `categorias_estilo_aprendizaje` (`id_categoria`);

ALTER TABLE `evaluaciones_tutoria`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `evaluaciones_tutoria`
ADD FOREIGN KEY (`id_tutoria`) REFERENCES `tutorias` (`id_tutoria`);

ALTER TABLE `autoevaluaciones`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `familiares`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `salud_estudiante`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `asistencias`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `asistencias`
ADD FOREIGN KEY (`id_grupo_materia`) REFERENCES `grupos_materias` (`id_grupo_materia`);

ALTER TABLE `documentos_estudiante`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `historial_academico`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `canalizaciones`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `canalizaciones`
ADD FOREIGN KEY (`id_tutor`) REFERENCES `docentes` (`id_docente`);

ALTER TABLE `seguimiento_academico`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `seguimiento_academico`
ADD FOREIGN KEY (`id_tutor`) REFERENCES `docentes` (`id_docente`);

ALTER TABLE `actividades_extracurriculares`
ADD FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`);

ALTER TABLE `mensajes`
ADD FOREIGN KEY (`id_remitente`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `mensajes`
ADD FOREIGN KEY (`id_destinatario`) REFERENCES `usuarios` (`id_usuario`);