
-- Create storage bucket for avatars
create bucket if not exists avatars;

-- Set RLS policies for the avatars bucket
-- Allow authenticated users to upload their own avatar
create policy "Users can upload their own avatar"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars' 
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow anyone to read avatars
create policy "Anyone can read avatars" 
on storage.objects for select
using (bucket_id = 'avatars');

-- Enable Row Level Security
alter bucket avatars enable row level security;
