--
-- PostgreSQL database dump
--

\restrict aHMIvkEGUCIcHUq57Z0w9fW94A2jiEiHdTEkxPT8eXSSyXOU7SFKbMSS4SIPg1g

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
-- Data for Name: events; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.events (id, "timestamp", status, data) FROM stdin;
202511130539576958	1762987197208	COMPLETE	
202511151215220263	1763183722433	COMPLETE	
202511181525559994	1763454355689	PROCESSING	Generating question and answers...
202511181526040043	1763454364229	INIT	
202511181526524016	1763454412555	PROCESSING	Generating question and answers...
202511181527043436	1763454424474	PROCESSING	Generating question and answers...
202511181528269812	1763454506274	COMPLETE	
202511181530118048	1763454611178	PROCESSING	Generating question and answers...
202511181530139112	1763454613589	PROCESSING	Generating question and answers...
202511181530222589	1763454622433	COMPLETE	
\.


--
-- PostgreSQL database dump complete
--

\unrestrict aHMIvkEGUCIcHUq57Z0w9fW94A2jiEiHdTEkxPT8eXSSyXOU7SFKbMSS4SIPg1g

