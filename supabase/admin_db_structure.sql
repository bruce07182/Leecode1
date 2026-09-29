-- Admin-only, read-only schema metadata endpoint. Live migration: add_admin_db_structure_inspector
create or replace function public.admin_db_structure() returns jsonb language plpgsql security definer set search_path = pg_catalog, public, auth as $$
declare result jsonb;
begin
 if lower(coalesce(auth.jwt() ->> 'email','')) <> 'bruce0421@gmail.com' then raise exception 'Not authorized'; end if;
 select jsonb_build_object(
 'tables',coalesce((select jsonb_agg(t order by t->>'table') from (
 select jsonb_build_object('table',c.relname,'rls',c.relrowsecurity,
 'columns',(select jsonb_agg(jsonb_build_object('name',a.attname,'type',pg_catalog.format_type(a.atttypid,a.atttypmod),'nullable',not a.attnotnull,'default',pg_catalog.pg_get_expr(ad.adbin,ad.adrelid)) order by a.attnum) from pg_catalog.pg_attribute a left join pg_catalog.pg_attrdef ad on ad.adrelid=a.attrelid and ad.adnum=a.attnum where a.attrelid=c.oid and a.attnum>0 and not a.attisdropped),
 'constraints',(select coalesce(jsonb_agg(jsonb_build_object('name',con.conname,'type',con.contype,'definition',pg_catalog.pg_get_constraintdef(con.oid,true)) order by con.conname),'[]'::jsonb) from pg_catalog.pg_constraint con where con.conrelid=c.oid),
 'indexes',(select coalesce(jsonb_agg(jsonb_build_object('name',i.indexname,'definition',i.indexdef) order by i.indexname),'[]'::jsonb) from pg_catalog.pg_indexes i where i.schemaname='public' and i.tablename=c.relname),
 'policies',(select coalesce(jsonb_agg(jsonb_build_object('name',p.policyname,'command',p.cmd,'roles',p.roles,'using',p.qual,'check',p.with_check) order by p.policyname),'[]'::jsonb) from pg_catalog.pg_policies p where p.schemaname='public' and p.tablename=c.relname)) t
 from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind in ('r','p')) x),'[]'::jsonb),
 'functions',coalesce((select jsonb_agg(jsonb_build_object('name',p.proname,'security_definer',p.prosecdef,'arguments',pg_catalog.pg_get_function_identity_arguments(p.oid),'result',pg_catalog.pg_get_function_result(p.oid)) order by p.proname) from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace where n.nspname='public'),'[]'::jsonb)) into result;
 return result;
end; $$;
revoke all on function public.admin_db_structure() from public, anon;
grant execute on function public.admin_db_structure() to authenticated;
