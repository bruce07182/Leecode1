-- Live DB hardening applied 2026-09-29.
-- Keeps existing behavior while reducing RLS overhead and narrowing access to authenticated users.

drop policy if exists "Users can read permitted intern prep" on public.intern_prep;
drop policy if exists "Users can read own intern prep" on public.intern_prep;
drop policy if exists "Admin can read intern prep" on public.intern_prep;
drop policy if exists "Users can insert own intern prep" on public.intern_prep;
drop policy if exists "Users can update own intern prep" on public.intern_prep;

create policy "Users can read permitted intern prep"
on public.intern_prep for select to authenticated
using (
  (select auth.uid()) = user_id
  or (select lower(coalesce(auth.jwt()->>'email',''))) = 'bruce0421@gmail.com'
);

create policy "Users can insert own intern prep"
on public.intern_prep for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own intern prep"
on public.intern_prep for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

alter policy "Users can read own solutions" on public.solutions to authenticated;
alter policy "Users can insert own solutions" on public.solutions to authenticated;
alter policy "Users can update own solutions" on public.solutions to authenticated;
alter policy "Users can delete own solutions" on public.solutions to authenticated;

-- These RPCs intentionally use SECURITY DEFINER because admin_progress reads auth.users
-- and admin_db_structure reads protected metadata. Both enforce the admin email internally.
revoke all on function public.admin_progress() from public, anon;
revoke all on function public.admin_db_structure() from public, anon;
grant execute on function public.admin_progress() to authenticated;
grant execute on function public.admin_db_structure() to authenticated;
