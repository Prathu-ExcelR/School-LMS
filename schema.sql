-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.classes (
  id integer NOT NULL DEFAULT nextval('classes_id_seq'::regclass),
  name character varying NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT classes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.enrollments (
  id integer NOT NULL DEFAULT nextval('enrollments_id_seq'::regclass),
  student_id uuid,
  subject_id integer,
  enrolled_date date DEFAULT CURRENT_DATE,
  payment_status character varying DEFAULT 'Not Paid'::character varying,
  CONSTRAINT enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id),
  CONSTRAINT enrollments_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id)
);
CREATE TABLE public.materials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  description text,
  unit_id uuid,
  material_type character varying NOT NULL CHECK (material_type::text = ANY (ARRAY['pdf'::character varying, 'video'::character varying, 'link'::character varying]::text[])),
  file_url character varying,
  file_path character varying,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT materials_pkey PRIMARY KEY (id),
  CONSTRAINT materials_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(id)
);
CREATE TABLE public.quiz_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_id uuid,
  question_text text NOT NULL,
  question_type character varying DEFAULT 'multiple_choice'::character varying,
  options jsonb,
  correct_answer text NOT NULL,
  points integer DEFAULT 1,
  order_number integer NOT NULL,
  CONSTRAINT quiz_questions_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id)
);
CREATE TABLE public.quizzes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title character varying NOT NULL,
  description text,
  unit_id uuid,
  total_questions integer DEFAULT 0,
  passing_score integer DEFAULT 70,
  time_limit integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT quizzes_pkey PRIMARY KEY (id),
  CONSTRAINT quizzes_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(id)
);
CREATE TABLE public.student_quiz_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_id uuid,
  student_id uuid,
  score integer,
  total_points integer,
  percentage numeric,
  passed boolean,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  answers jsonb,
  CONSTRAINT student_quiz_attempts_pkey PRIMARY KEY (id),
  CONSTRAINT student_quiz_attempts_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id),
  CONSTRAINT student_quiz_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id)
);
CREATE TABLE public.subjects (
  id integer NOT NULL DEFAULT nextval('subjects_id_seq'::regclass),
  name character varying NOT NULL,
  class_id integer,
  teacher_id uuid,
  price character varying DEFAULT 'Free'::character varying,
  status character varying DEFAULT 'Active'::character varying,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT subjects_pkey PRIMARY KEY (id),
  CONSTRAINT subjects_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id),
  CONSTRAINT subjects_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id)
);
CREATE TABLE public.teacher_assignments (
  id integer NOT NULL DEFAULT nextval('teacher_assignments_id_seq'::regclass),
  teacher_id uuid,
  subject_id integer,
  class_id integer,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT teacher_assignments_pkey PRIMARY KEY (id),
  CONSTRAINT teacher_assignments_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id),
  CONSTRAINT teacher_assignments_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id),
  CONSTRAINT teacher_assignments_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id)
);
CREATE TABLE public.units (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  description text,
  subject_id integer,
  teacher_id uuid,
  order_number integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT units_pkey PRIMARY KEY (id),
  CONSTRAINT units_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id),
  CONSTRAINT units_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email character varying NOT NULL UNIQUE,
  name character varying NOT NULL,
  role character varying NOT NULL CHECK (role::text = ANY (ARRAY['admin'::character varying, 'teacher'::character varying, 'student'::character varying, 'parent'::character varying]::text[])),
  phone character varying,
  grade character varying,
  created_at timestamp without time zone DEFAULT now(),
  password_hash character varying,
  class_id integer,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.classes(id)
);

CREATE TABLE public.parent_students (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL,
  student_id uuid NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT parent_students_pkey PRIMARY KEY (id),
  CONSTRAINT parent_students_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT parent_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT parent_students_unique UNIQUE (parent_id, student_id)
);

-- ─── RLS POLICIES FOR PARENT ACCESS ─────────────────────────────────────────

-- Enable RLS on parent_students table
ALTER TABLE public.parent_students ENABLE ROW LEVEL SECURITY;

-- Parents can view their own parent-student relations
CREATE POLICY "Parents can view their own children relations"
ON public.parent_students
FOR SELECT
TO authenticated
USING (parent_id = auth.uid());

-- Parents can insert their own parent-student relations (for signup)
CREATE POLICY "Parents can insert their own children relations"
ON public.parent_students
FOR INSERT
TO authenticated
WITH CHECK (parent_id = auth.uid());

-- ─── RLS POLICIES FOR PARENT TO VIEW CHILD'S DATA ───────────────────────────

-- Parents can view their children's enrollments
CREATE POLICY "Parents can view their children's enrollments"
ON public.enrollments
FOR SELECT
TO authenticated
USING (
  student_id IN (
    SELECT student_id 
    FROM public.parent_students 
    WHERE parent_id = auth.uid()
  )
);

-- Parents can view their children's quiz attempts
CREATE POLICY "Parents can view their children's quiz attempts"
ON public.student_quiz_attempts
FOR SELECT
TO authenticated
USING (
  student_id IN (
    SELECT student_id 
    FROM public.parent_students 
    WHERE parent_id = auth.uid()
  )
);

-- Parents can view subjects their children are enrolled in
CREATE POLICY "Parents can view subjects for their children"
ON public.subjects
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT subject_id 
    FROM public.enrollments 
    WHERE student_id IN (
      SELECT student_id 
      FROM public.parent_students 
      WHERE parent_id = auth.uid()
    )
  )
);

-- Parents can view units for subjects their children are enrolled in
CREATE POLICY "Parents can view units for their children"
ON public.units
FOR SELECT
TO authenticated
USING (
  subject_id IN (
    SELECT subject_id 
    FROM public.enrollments 
    WHERE student_id IN (
      SELECT student_id 
      FROM public.parent_students 
      WHERE parent_id = auth.uid()
    )
  )
);

-- Parents can view quizzes for their children's subjects
CREATE POLICY "Parents can view quizzes for their children"
ON public.quizzes
FOR SELECT
TO authenticated
USING (
  unit_id IN (
    SELECT id 
    FROM public.units 
    WHERE subject_id IN (
      SELECT subject_id 
      FROM public.enrollments 
      WHERE student_id IN (
        SELECT student_id 
        FROM public.parent_students 
        WHERE parent_id = auth.uid()
      )
    )
  )
);

-- Parents can view classes for their children
CREATE POLICY "Parents can view classes for their children"
ON public.classes
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT class_id 
    FROM public.users 
    WHERE id IN (
      SELECT student_id 
      FROM public.parent_students 
      WHERE parent_id = auth.uid()
    )
  )
  OR id IN (
    SELECT class_id 
    FROM public.subjects 
    WHERE id IN (
      SELECT subject_id 
      FROM public.enrollments 
      WHERE student_id IN (
        SELECT student_id 
        FROM public.parent_students 
        WHERE parent_id = auth.uid()
      )
    )
  )
);