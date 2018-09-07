REVOKE ALL ON SCHEMA public FROM PUBLIC;

CREATE TABLE public.logs (
  id serial PRIMARY KEY,
  level varchar NOT NULL,
  text varchar NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now()
);