-- Canonical exercise identity migration
-- Final model: (exercise_type, exercise_number), e.g. (B,1), (C,2), (LC,217).
-- problem_id is intentionally retained during rollout as a rollback/compatibility field.
BEGIN;

ALTER TABLE public.solutions ADD COLUMN IF NOT EXISTS exercise_type text;
ALTER TABLE public.solutions ADD COLUMN IF NOT EXISTS exercise_number integer;\nALTER TABLE public.solutions ALTER COLUMN problem_id DROP NOT NULL;

UPDATE public.solutions SET
  exercise_type = CASE
    WHEN problem_id BETWEEN 0 AND 18 OR problem_id BETWEEN 37 AND 45 THEN 'B'
    WHEN problem_id BETWEEN 19 AND 36 THEN 'C'
    WHEN problem_id BETWEEN 10001 AND 10999 OR problem_id BETWEEN 100001 AND 199999 THEN 'LC'
    ELSE exercise_type
  END,
  exercise_number = CASE
    WHEN problem_id BETWEEN 0 AND 18 THEN problem_id + 1
    WHEN problem_id BETWEEN 19 AND 36 THEN problem_id - 18
    WHEN problem_id BETWEEN 37 AND 45 THEN problem_id - 17
    WHEN problem_id = 10001 THEN 1
    WHEN problem_id = 10002 THEN 217
    WHEN problem_id = 10003 THEN 125
    WHEN problem_id BETWEEN 100001 AND 199999 THEN problem_id - 100000
    ELSE exercise_number
  END
WHERE exercise_type IS NULL OR exercise_number IS NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.solutions
    WHERE exercise_type IS NULL OR exercise_number IS NULL
  ) THEN
    RAISE EXCEPTION 'Unmapped solution row remains; migration rolled back';
  END IF;
END $$;

ALTER TABLE public.solutions
  ADD CONSTRAINT solutions_exercise_type_check
  CHECK (exercise_type IN ('B','C','LC','P','CPP'));

ALTER TABLE public.solutions ALTER COLUMN exercise_type SET NOT NULL;
ALTER TABLE public.solutions ALTER COLUMN exercise_number SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS solutions_user_exercise_uidx
  ON public.solutions (user_id, exercise_type, exercise_number);

COMMIT;

-- Verify before removing legacy problem_id in a later release:
-- SELECT exercise_type, exercise_number, count(*)
-- FROM public.solutions
-- GROUP BY exercise_type, exercise_number
-- ORDER BY exercise_type, exercise_number;
