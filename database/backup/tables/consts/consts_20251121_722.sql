--
-- PostgreSQL database dump
--

\restrict vPnE9Mhh8fRLHWSBcMDbZEimN5K93l3U0y7lfYyKHfEDF6juDBMisG95PC92xMh

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

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
-- Data for Name: consts; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.consts (key, value, visible) FROM stdin;
WORD_COLOR	blue	t
PHRASE_COLOR	red	t
IDIOM_COLOR	green	t
SPECIAL_CHARACTERS	[".", ",", "'s", ")", "(", "!", "?", ";", ":", "“", "”", "’", "‘", "\\""]	t
APPLICATION_NAME	ELP	t
JWT_MAX_AGE	3600000	f
JWT_EXPIRES_IN	1h	f
JWT_SECRET	luong	f
HASH_SALT_LENGTH	10	f
ENVIRONMENT	DEVELOPMENT	f
\.


--
-- PostgreSQL database dump complete
--

\unrestrict vPnE9Mhh8fRLHWSBcMDbZEimN5K93l3U0y7lfYyKHfEDF6juDBMisG95PC92xMh

