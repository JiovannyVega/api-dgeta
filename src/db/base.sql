create database dgeta;

use dgeta;

CREATE TABLE `roles` (
    `role_id` INT PRIMARY KEY AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL,
    `description` TEXT
);

CREATE TABLE `users` (
    `user_id` INT PRIMARY KEY AUTO_INCREMENT,
    `role_id` INT NOT NULL,
    `username` VARCHAR(50) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `registration_date` DATETIME DEFAULT(CURRENT_TIMESTAMP),
    `last_login` DATETIME,
    `active` BOOLEAN DEFAULT true
);

CREATE TABLE `states` (
    `state_id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(10)
);

CREATE TABLE `municipalities` (
    `municipality_id` INT PRIMARY KEY AUTO_INCREMENT,
    `state_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE `personal_information` (
    `info_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT UNIQUE NOT NULL,
    `curp` VARCHAR(18) UNIQUE,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `middle_name` VARCHAR(50),
    `birth_date` DATE,
    `gender` ENUM('Male', 'Female', 'Other'),
    `phone` VARCHAR(15),
    `mobile` VARCHAR(15),
    `address` TEXT,
    `neighborhood` VARCHAR(100),
    `municipality_id` INT,
    `postal_code` VARCHAR(10),
    `photo` VARCHAR(255)
);

CREATE TABLE `specialties` (
    `specialty_id` INT PRIMARY KEY AUTO_INCREMENT,
    `specialty_name` VARCHAR(100) NOT NULL,
    `specialty_code` VARCHAR(20) UNIQUE NOT NULL,
    `description` TEXT
);

CREATE TABLE `groups` (
    `group_id` INT PRIMARY KEY AUTO_INCREMENT,
    `group_name` VARCHAR(20) NOT NULL,
    `shift` ENUM('Morning', 'Evening', 'Night') NOT NULL,
    `semester` INT NOT NULL,
    `specialty_id` INT NOT NULL
);

CREATE TABLE `students` (
    `student_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT UNIQUE NOT NULL,
    `group_id` INT,
    `control_number` VARCHAR(20) UNIQUE NOT NULL,
    `secondary_average` DECIMAL(3, 1),
    `previous_school` VARCHAR(100),
    `status` ENUM(
        'Active',
        'Inactive',
        'Graduated',
        'Dropped'
    ) DEFAULT 'Active'
);

CREATE TABLE `teachers` (
    `teacher_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT UNIQUE NOT NULL,
    `employee_number` VARCHAR(20) UNIQUE NOT NULL,
    `academic_degree` VARCHAR(50),
    `specialty` VARCHAR(100),
    `status` ENUM('Active', 'Inactive') DEFAULT 'Active'
);

CREATE TABLE `subjects` (
    `subject_id` INT PRIMARY KEY AUTO_INCREMENT,
    `subject_name` VARCHAR(100) NOT NULL,
    `subject_code` VARCHAR(20) UNIQUE NOT NULL,
    `semester` INT NOT NULL,
    `theory_hours` INT,
    `practice_hours` INT,
    `specialty_id` INT
);

CREATE TABLE `group_subjects` (
    `group_subject_id` INT PRIMARY KEY AUTO_INCREMENT,
    `group_id` INT NOT NULL,
    `subject_id` INT NOT NULL,
    `teacher_id` INT NOT NULL,
    `period` VARCHAR(20) NOT NULL
);

CREATE TABLE `grades` (
    `grade_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `group_subject_id` INT NOT NULL,
    `partial_1` DECIMAL(4, 2),
    `partial_2` DECIMAL(4, 2),
    `partial_3` DECIMAL(4, 2),
    `final_grade` DECIMAL(4, 2),
    `update_date` TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)
);

CREATE TABLE `tutoring` (
    `tutoring_id` INT PRIMARY KEY AUTO_INCREMENT,
    `teacher_id` INT NOT NULL,
    `group_id` INT NOT NULL,
    `period` VARCHAR(20) NOT NULL
);

CREATE TABLE `incident_types` (
    `incident_type_id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT
);

CREATE TABLE `incidents` (
    `incident_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `reporting_teacher_id` INT NOT NULL,
    `incident_type_id` INT,
    `incident_date` DATE NOT NULL,
    `report_date` DATETIME DEFAULT(CURRENT_TIMESTAMP),
    `specialty` VARCHAR(100),
    `group_semester` VARCHAR(50),
    `description` TEXT NOT NULL,
    `actions_taken` TEXT,
    `student_commitments` TEXT,
    `status` ENUM(
        'Reported',
        'In progress',
        'Resolved'
    ) DEFAULT 'Reported'
);

CREATE TABLE `individual_tutoring` (
    `individual_tutoring_id` INT PRIMARY KEY AUTO_INCREMENT,
    `tutoring_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `tutoring_date` DATETIME NOT NULL,
    `presented_situation` TEXT NOT NULL,
    `provided_attention` TEXT NOT NULL,
    `results` TEXT,
    `observations` TEXT,
    `referred` BOOLEAN DEFAULT false,
    `referral_instance` VARCHAR(100)
);

CREATE TABLE `questionnaires` (
    `questionnaire_id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `version` VARCHAR(20),
    `creation_date` DATE
);

CREATE TABLE `questions` (
    `question_id` INT PRIMARY KEY AUTO_INCREMENT,
    `questionnaire_id` INT NOT NULL,
    `question_text` TEXT NOT NULL,
    `answer_type` ENUM(
        'BOOLEAN',
        'NUMERIC',
        'TEXT',
        'OPTIONS'
    ) NOT NULL,
    `is_risk` BOOLEAN DEFAULT false,
    `order` INT NOT NULL
);

CREATE TABLE `answers` (
    `answer_id` INT PRIMARY KEY AUTO_INCREMENT,
    `question_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `boolean_value` BOOLEAN,
    `numeric_value` DECIMAL(5, 2),
    `text_value` TEXT,
    `answer_date` DATETIME DEFAULT(CURRENT_TIMESTAMP)
);

CREATE TABLE `questionnaire_results` (
    `result_id` INT PRIMARY KEY AUTO_INCREMENT,
    `questionnaire_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `application_date` DATE NOT NULL,
    `total_score` INT,
    `risk_level` VARCHAR(50),
    `observations` TEXT
);

CREATE TABLE `learning_style_categories` (
    `category_id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT
);

CREATE TABLE `learning_styles` (
    `style_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `application_date` DATE NOT NULL
);

CREATE TABLE `style_results` (
    `result_id` INT PRIMARY KEY AUTO_INCREMENT,
    `style_id` INT NOT NULL,
    `category_id` INT NOT NULL,
    `score` INT NOT NULL
);

CREATE TABLE `tutoring_evaluations` (
    `evaluation_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `tutoring_id` INT NOT NULL,
    `evaluation_date` DATE NOT NULL,
    `tutor_identification` BOOLEAN NOT NULL,
    `cordial_attention` BOOLEAN NOT NULL,
    `doubt_resolution` BOOLEAN NOT NULL,
    `enough_time` BOOLEAN,
    `received_sessions` INT,
    `individual_tutoring` BOOLEAN,
    `home_visits` BOOLEAN,
    `referrals` BOOLEAN,
    `academic_support` BOOLEAN,
    `high_school_guidance` BOOLEAN,
    `scholarship_information` BOOLEAN,
    `respectful_environment` BOOLEAN,
    `positive_impact` BOOLEAN,
    `tutoring_importance` BOOLEAN,
    `suggestions` TEXT
);

CREATE TABLE `self_evaluations` (
    `self_evaluation_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `self_evaluation_date` DATE NOT NULL,
    `achieved_goals` TEXT,
    `success_factors` TEXT,
    `failure_factors` TEXT,
    `problems` TEXT,
    `academic_performance` ENUM(
        'Excellent',
        'Good',
        'Average',
        'Poor'
    ),
    `tutor_evaluation` TEXT,
    `tutor_suggestions` TEXT,
    `conclusion_feeling` TEXT
);

CREATE TABLE `family_members` (
    `family_member_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `relationship` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(15),
    `email` VARCHAR(100),
    `address` TEXT,
    `is_guardian` BOOLEAN DEFAULT false,
    `lives_with_student` BOOLEAN DEFAULT true
);

CREATE TABLE `student_health` (
    `health_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `allergies` TEXT,
    `chronic_diseases` TEXT,
    `medications` TEXT,
    `disability` TEXT,
    `psychological_treatment` BOOLEAN,
    `health_service` VARCHAR(100),
    `blood_type` VARCHAR(10)
);

CREATE TABLE `attendance` (
    `attendance_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `group_subject_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `attended` BOOLEAN DEFAULT false,
    `justification` TEXT
);

CREATE TABLE `student_documents` (
    `document_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `document_type` VARCHAR(50) NOT NULL,
    `document_name` VARCHAR(100) NOT NULL,
    `file_path` VARCHAR(255) NOT NULL,
    `upload_date` DATETIME DEFAULT(CURRENT_TIMESTAMP)
);

CREATE TABLE `academic_history` (
    `history_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `semester` INT NOT NULL,
    `average` DECIMAL(4, 2),
    `approved_subjects` INT,
    `failed_subjects` INT,
    `observations` TEXT
);

CREATE TABLE `referrals` (
    `referral_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `tutor_id` INT NOT NULL,
    `referral_date` DATE NOT NULL,
    `instance` VARCHAR(100) NOT NULL,
    `presented_situation` TEXT NOT NULL,
    `referral_reason` TEXT NOT NULL,
    `results` TEXT,
    `observations` TEXT
);

CREATE TABLE `academic_followup` (
    `followup_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `semester` INT NOT NULL,
    `actions_to_take` TEXT,
    `followup_date` DATE NOT NULL,
    `tutor_id` INT NOT NULL
);

CREATE TABLE `extracurricular_activities` (
    `activity_id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `activity_name` VARCHAR(100) NOT NULL,
    `activity_type` VARCHAR(50) NOT NULL,
    `period` VARCHAR(20) NOT NULL,
    `hours` INT,
    `recognitions` TEXT
);

CREATE TABLE `messages` (
    `message_id` INT PRIMARY KEY AUTO_INCREMENT,
    `sender_id` INT NOT NULL,
    `receiver_id` INT NOT NULL,
    `subject` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `sent_date` DATETIME DEFAULT(CURRENT_TIMESTAMP),
    `read` BOOLEAN DEFAULT false
);

CREATE TABLE `settings` (
    `setting_id` INT PRIMARY KEY AUTO_INCREMENT,
    `setting_name` VARCHAR(50) UNIQUE NOT NULL,
    `setting_value` TEXT,
    `description` TEXT
);

ALTER TABLE `users`
ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

ALTER TABLE `municipalities`
ADD FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`);

ALTER TABLE `personal_information`
ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `personal_information`
ADD FOREIGN KEY (`municipality_id`) REFERENCES `municipalities` (`municipality_id`);

ALTER TABLE `groups`
ADD FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`specialty_id`);

ALTER TABLE `students`
ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `students`
ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `teachers`
ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `subjects`
ADD FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`specialty_id`);

ALTER TABLE `group_subjects`
ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `group_subjects`
ADD FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

ALTER TABLE `group_subjects`
ADD FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `grades`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `grades`
ADD FOREIGN KEY (`group_subject_id`) REFERENCES `group_subjects` (`group_subject_id`);

ALTER TABLE `tutoring`
ADD FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `tutoring`
ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `incidents`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `incidents`
ADD FOREIGN KEY (`reporting_teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `incidents`
ADD FOREIGN KEY (`incident_type_id`) REFERENCES `incident_types` (`incident_type_id`);

ALTER TABLE `individual_tutoring`
ADD FOREIGN KEY (`tutoring_id`) REFERENCES `tutoring` (`tutoring_id`);

ALTER TABLE `individual_tutoring`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `questions`
ADD FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaires` (`questionnaire_id`);

ALTER TABLE `answers`
ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

ALTER TABLE `answers`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `questionnaire_results`
ADD FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaires` (`questionnaire_id`);

ALTER TABLE `questionnaire_results`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `learning_styles`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `style_results`
ADD FOREIGN KEY (`style_id`) REFERENCES `learning_styles` (`style_id`);

ALTER TABLE `style_results`
ADD FOREIGN KEY (`category_id`) REFERENCES `learning_style_categories` (`category_id`);

ALTER TABLE `tutoring_evaluations`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `tutoring_evaluations`
ADD FOREIGN KEY (`tutoring_id`) REFERENCES `tutoring` (`tutoring_id`);

ALTER TABLE `self_evaluations`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `family_members`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `student_health`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `attendance`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `attendance`
ADD FOREIGN KEY (`group_subject_id`) REFERENCES `group_subjects` (`group_subject_id`);

ALTER TABLE `student_documents`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `academic_history`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `referrals`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `referrals`
ADD FOREIGN KEY (`tutor_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `academic_followup`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `academic_followup`
ADD FOREIGN KEY (`tutor_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `extracurricular_activities`
ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `messages`
ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `messages`
ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`);