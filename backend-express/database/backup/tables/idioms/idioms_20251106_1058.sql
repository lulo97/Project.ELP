--
-- PostgreSQL database dump
--

\restrict 7BbZdxigMIVHcpfJnXiVGj8NKuOWUF1RD2h2N8vz0uQ5ad78lOPaC6TZRO71klP

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
-- Data for Name: idioms; Type: TABLE DATA; Schema: elp; Owner: admin
--

COPY elp.idioms (id, idiom, meaning, example) FROM stdin;
202509251305001582	to add insult to injury	Thêm muối vào vết thương, thêm dầu vào lửa	He was late for the meeting, and to add insult to injury, he forgot the documents
202509250647417784	in the red	Thâm hụt, lỗ	The company has been in the red for the last three quarters
202509250648227989	in the black	Có lãi	Our bussiness is in the black this year
202509250724227429	footing a bill	Chịu trả, thanh toán	The goverment is footing a bill for the new highway
202510260831186790	let nature take its course	để tự nhiên diễn ra	He could be kept alive artificially, but I think it would be kinder to let nature take its course. 
\.


--
-- PostgreSQL database dump complete
--

\unrestrict 7BbZdxigMIVHcpfJnXiVGj8NKuOWUF1RD2h2N8vz0uQ5ad78lOPaC6TZRO71klP

