--
-- PostgreSQL database dump
--

\restrict Y8vJvjm8pV50kVW9sA8jzDoozPe3xzfS4DU3RbjHwEKMt1hXnBBWivHiXPcbxYh

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.users (id, username, email, password_hash, full_name, is_active, created_at) FROM stdin;
ADMIN	admin	luongpysl2@gmail.com	$2a$12$6.BW9j78BrORKMuR4EA4duAPrwwxUZVcsOpJn4WE8W6plpslfmgi2	Admin	t	2025-11-04 15:04:03.676856+00
202511042323417648	a	\N	$2b$10$VpZMHoEa.3h94MAno9Ar9OiyfGl.zNlvFI6MicUAd0AW042JvTBb2	\N	t	2025-11-04 16:23:41.683314+00
202511042336323315	b	\N	$2b$10$oOplF6wA/AKcokv02Ie0neUMTI7JvD8jCJThROHsG3rc/3fzAWo0e	\N	t	2025-11-04 16:36:32.703747+00
\.


--
-- PostgreSQL database dump complete
--

\unrestrict Y8vJvjm8pV50kVW9sA8jzDoozPe3xzfS4DU3RbjHwEKMt1hXnBBWivHiXPcbxYh

