-- Canonical exercise ID migration: numeric Foundation/LeetCode IDs -> B*/C*/LC*
-- Run once in Supabase SQL Editor with the matching app release.
-- Only problem_id changes; saved code/history/complexity remain in the same rows.
BEGIN;
ALTER TABLE public.solutions
ALTER COLUMN problem_id TYPE text
USING (CASE
  WHEN 0 THEN 'B1'
  WHEN 1 THEN 'B2'
  WHEN 2 THEN 'B3'
  WHEN 3 THEN 'B4'
  WHEN 4 THEN 'B5'
  WHEN 5 THEN 'B6'
  WHEN 6 THEN 'B7'
  WHEN 7 THEN 'B8'
  WHEN 8 THEN 'B9'
  WHEN 9 THEN 'B10'
  WHEN 10 THEN 'B11'
  WHEN 11 THEN 'B12'
  WHEN 12 THEN 'B13'
  WHEN 13 THEN 'B14'
  WHEN 14 THEN 'B15'
  WHEN 15 THEN 'B16'
  WHEN 16 THEN 'B17'
  WHEN 17 THEN 'B18'
  WHEN 18 THEN 'B19'
  WHEN 19 THEN 'C1'
  WHEN 20 THEN 'C2'
  WHEN 21 THEN 'C3'
  WHEN 22 THEN 'C4'
  WHEN 23 THEN 'C5'
  WHEN 24 THEN 'C6'
  WHEN 25 THEN 'C7'
  WHEN 26 THEN 'C8'
  WHEN 27 THEN 'C9'
  WHEN 28 THEN 'C10'
  WHEN 29 THEN 'C11'
  WHEN 30 THEN 'C12'
  WHEN 31 THEN 'C13'
  WHEN 32 THEN 'C14'
  WHEN 33 THEN 'C15'
  WHEN 34 THEN 'C16'
  WHEN 35 THEN 'C17'
  WHEN 36 THEN 'C18'
  WHEN 37 THEN 'B20'
  WHEN 38 THEN 'B21'
  WHEN 39 THEN 'B22'
  WHEN 40 THEN 'B23'
  WHEN 41 THEN 'B24'
  WHEN 42 THEN 'B25'
  WHEN 43 THEN 'B26'
  WHEN 44 THEN 'B27'
  WHEN 45 THEN 'B28'
  WHEN 10001 THEN 'LC1'
  WHEN 10002 THEN 'LC217'
  WHEN 10003 THEN 'LC125'
  ELSE CASE WHEN problem_id BETWEEN 100001 AND 199999
    THEN 'LC' || (problem_id - 100000)::text
    ELSE problem_id::text END
END);
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM public.solutions WHERE problem_id ~ '^[0-9]+$')
  THEN RAISE EXCEPTION 'Unmapped numeric problem_id remains in solutions';
  END IF;
END $$;
COMMIT;

-- Verify after migration:
-- select problem_id,count(*) from public.solutions group by problem_id order by problem_id;
