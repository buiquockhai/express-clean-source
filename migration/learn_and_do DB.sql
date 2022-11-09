CREATE TABLE "tb_question_folder" (
  "id" uuid PRIMARY KEY,
  "name" text,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid,
  "deleted": varchar(1)
);

CREATE TABLE "tb_question" (
  "id" uuid PRIMARY KEY,
  "type" text,
  "level" text,
  "point" numeric,
  "title" text,
  "content" text,
  "images" text,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid,
  "folder_id" text
);

CREATE TABLE "tb_answer" (
  "id" uuid PRIMARY KEY,
  "content" text,
  "question_id" uuid,
  "percent" numeric,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid
);

CREATE TABLE "tb_exam" (
  "id" uuid PRIMARY KEY,
  "max_point" numeric,
  "duration" numeric,
  "level" text,
  "status" text,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid
  "title" text,
);

CREATE TABLE "tb_exam_question" (
  "question_id" uuid,
  "exam_id" uuid,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid,
  PRIMARY KEY ("question_id", "exam_id")
);

CREATE TABLE "tb_room" (
  "id" uuid PRIMARY KEY,
  "title" text,
  "exam_id" uuid,
  "exam_title" text,
  "group_id" uuid,
  "proctor_id" uuid,
  "proctor_name" text,
  "start_date" timestamp without time zone,
  "meeting" text,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid,
  "group_title" text
);

CREATE TABLE "tb_user" (
  "id" uuid PRIMARY KEY,
  "role" text,
  "name" text,
  "code" text,
  "gender" text,
  "date_of_birth" timestamp without time zone,
  "group_id" uuid,
  "group_title" text,
  "phone" text,
  "address" text,
  "contact" text,
  "password" text,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid
);

CREATE TABLE "tb_group" (
  "id" uuid PRIMARY KEY,
  "code" text,
  "title" text,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid
);

CREATE TABLE "tb_result" (
  "id" uuid PRIMARY KEY,
  "room_id" uuid,
  "selected_answer_id" uuid,
  "answer_content" text,
  "answer_images" text,
  "question_id" uuid,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid
);

CREATE TABLE "tb_violating_rule" (
  "user_id" uuid,
  "room_id" uuid,
  "minus_point" numeric,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid,
  PRIMARY KEY ("user_id", "room_id")
);

CREATE TABLE "tb_mark" (
  "user_id" uuid,
  "room_id" uuid,
  "mark" numeric,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid,
  PRIMARY KEY ("user_id", "room_id")
);

CREATE TABLE "tb_config" (
  "key" text,
  "value" text
);

CREATE TABLE "tb_notification" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "title" text,
  "content" text,
  "created_date" timestamp without time zone,
  "created_id" uuid,
  "updated_date" timestamp without time zone,
  "updated_id" uuid
);

ALTER TABLE "tb_exam_question" ADD FOREIGN KEY ("exam_id") REFERENCES "tb_exam" ("id");

ALTER TABLE "tb_exam_question" ADD FOREIGN KEY ("question_id") REFERENCES "tb_question" ("id");

ALTER TABLE "tb_violating_rule" ADD FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_violating_rule" ADD FOREIGN KEY ("room_id") REFERENCES "tb_room" ("id");
