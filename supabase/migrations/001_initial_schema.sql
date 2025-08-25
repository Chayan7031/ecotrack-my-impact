-- Enable Row Level Security
alter table if exists auth.users enable row level security;

-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create activities table
create table if not exists public.activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  type text not null check (type in ('transport', 'energy', 'food', 'shopping', 'waste')),
  description text not null,
  carbon_emitted decimal(10,2) not null,
  activity_date date not null default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create goals table
create table if not exists public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  target_value decimal(10,2) not null,
  current_value decimal(10,2) default 0,
  target_date date not null,
  status text not null default 'active' check (status in ('active', 'completed', 'paused')),
  category text not null check (category in ('transport', 'energy', 'food', 'shopping', 'waste', 'general')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create achievements table
create table if not exists public.achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text not null,
  earned boolean default false,
  earned_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security Policies

-- Profiles policies
alter table public.profiles enable row level security;

create policy "Users can view own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can insert own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- Activities policies
alter table public.activities enable row level security;

create policy "Users can view own activities" 
  on public.activities for select 
  using (auth.uid() = user_id);

create policy "Users can insert own activities" 
  on public.activities for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own activities" 
  on public.activities for update 
  using (auth.uid() = user_id);

create policy "Users can delete own activities" 
  on public.activities for delete 
  using (auth.uid() = user_id);

-- Goals policies
alter table public.goals enable row level security;

create policy "Users can view own goals" 
  on public.goals for select 
  using (auth.uid() = user_id);

create policy "Users can insert own goals" 
  on public.goals for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own goals" 
  on public.goals for update 
  using (auth.uid() = user_id);

create policy "Users can delete own goals" 
  on public.goals for delete 
  using (auth.uid() = user_id);

-- Achievements policies
alter table public.achievements enable row level security;

create policy "Users can view own achievements" 
  on public.achievements for select 
  using (auth.uid() = user_id);

create policy "Users can insert own achievements" 
  on public.achievements for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own achievements" 
  on public.achievements for update 
  using (auth.uid() = user_id);

-- Function to automatically create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_activities
  before update on public.activities
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_goals
  before update on public.goals
  for each row execute procedure public.handle_updated_at();
