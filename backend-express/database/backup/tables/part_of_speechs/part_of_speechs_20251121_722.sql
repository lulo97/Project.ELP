--
-- PostgreSQL database dump
--

\restrict 3s9hjnT0Xkh2hgnKTKwBSdgb1U8CyByWoZTA1buKmPpQzMCVDct9aOF8uRX5LdK

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
-- Data for Name: part_of_speechs; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.part_of_speechs (id, name) FROM stdin;
noun	Noun
verb	Verb
adjective	Adjective
adverb	Adverb
\.


--
-- PostgreSQL database dump complete
--

\unrestrict 3s9hjnT0Xkh2hgnKTKwBSdgb1U8CyByWoZTA1buKmPpQzMCVDct9aOF8uRX5LdK

