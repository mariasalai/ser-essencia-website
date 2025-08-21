-- Create default admin user function
CREATE OR REPLACE FUNCTION create_default_admin()
RETURNS VOID AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Check if any admin exists
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
    -- Insert a default admin user into auth.users
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_user_meta_data,
      is_super_admin,
      role
    ) VALUES (
      gen_random_uuid(),
      'admin@essenciabrasil.com',
      crypt('admin123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"display_name": "Administrador"}',
      false,
      'authenticated'
    ) RETURNING id INTO admin_user_id;
    
    -- Insert the profile with admin role
    INSERT INTO public.profiles (id, display_name, role)
    VALUES (admin_user_id, 'Administrador', 'admin');
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute the function
SELECT create_default_admin();