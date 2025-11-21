--
-- PostgreSQL database dump
--

\restrict yKHvgmZk4Kt7PRnkAcyUuDkKla5Dig7k9bDR9X7PcgGD5ndJOexzPVrM1rE3xbO

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
-- Data for Name: consts; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.consts (key, value) FROM stdin;
APPLICATION_NAME	Word Collection
WORD_COLOR	blue
PHRASE_COLOR	red
IDIOM_COLOR	green
SPECIAL_CHARACTERS	[".", ",", "'s", ")", "(", "!", "?", ";", ":", "“", "”", "’", "‘", "\\""]
\.


--
-- PostgreSQL database dump complete
--

\unrestrict yKHvgmZk4Kt7PRnkAcyUuDkKla5Dig7k9bDR9X7PcgGD5ndJOexzPVrM1rE3xbO

