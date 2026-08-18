-- Perbaikan trigger handle_new_user:
-- - SECURITY DEFINER dengan qualified schema (public.user_role) agar tidak
--   bergantung search_path role yang menjalankan insert (GoTrue).
-- - body berisi blok EXCEPTION: kegagalan pembuatan profile dicatat ke
--   tabel trigger_error_log, tidak membatalkan pembuatan akun di auth.users.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $body$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
      NEW.email,
      COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'warga')
    );
  EXCEPTION WHEN OTHERS THEN
    INSERT INTO public.trigger_error_log (err_msg)
    VALUES ('handle_new_user: ' || SQLERRM);
  END;
  RETURN NEW;
END;
$body$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();