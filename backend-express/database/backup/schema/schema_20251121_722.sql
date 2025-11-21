--
-- PostgreSQL database dump
--

\restrict rETwyVtDgp0SffBda0gHOiwDcRGVZTIDQbYcQCTeBmEFHRTQ2Mzcc8ekWYuvA4Z

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
-- Name: elp; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA elp;


ALTER SCHEMA elp OWNER TO admin;

--
-- Name: fn_parse_json_array(text, text, text, text); Type: FUNCTION; Schema: elp; Owner: admin
--

CREATE FUNCTION elp.fn_parse_json_array(p_key_id text, p_key_value text, p_key_output text, p_json_array text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    elem json;
    v_result text;
BEGIN
    -- Loop through the JSON array safely, handle single objects
    FOR elem IN
        SELECT value
        FROM json_array_elements(
            CASE
                WHEN json_typeof(p_json_array::json) = 'array' THEN p_json_array::json
                ELSE ('[' || p_json_array || ']')::json
            END
        )
    LOOP
        IF elem->>p_key_id = p_key_value THEN
            v_result := elem->>p_key_output;
            RETURN v_result;
        END IF;
    END LOOP;

    RETURN NULL; -- return NULL if nothing matches
END;
$$;


ALTER FUNCTION elp.fn_parse_json_array(p_key_id text, p_key_value text, p_key_output text, p_json_array text) OWNER TO admin;

--
-- Name: prc_crud_consts(text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_consts(IN p_key text, IN p_value text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$

DECLARE
    l_count int;
BEGIN
    p_error := NULL;

    ---------------------------------------------------------------------------
    -- UPDATE
    ---------------------------------------------------------------------------
    IF p_action = 'UPDATE' THEN

        IF p_key IS NULL THEN
            p_error := 'Key is required for update!';
            RETURN;
        END IF;

        IF p_value IS NULL THEN
            p_error := 'Value is required!';
            RETURN;
        END IF;

        BEGIN
            UPDATE consts
            SET value      = p_value
            WHERE key = p_key;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
        WHEN OTHERS THEN
            p_error := SQLERRM;
        END;

    ---------------------------------------------------------------------------
    -- INVALID ACTION
    ---------------------------------------------------------------------------
    ELSE
        p_error := 'Invalid action. Must be UPDATE.';
    END IF;

END;

$$;


ALTER PROCEDURE elp.prc_crud_consts(IN p_key text, IN p_value text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_examples(text, text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_examples(IN p_id text, IN p_word text, IN p_part_of_speech text, IN p_example text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id text;
    l_count int;
BEGIN
    p_error := NULL;

    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN no_data_found THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
        OPEN p_rows FOR
        SELECT *
        FROM examples e
        WHERE 1 = 1
            AND (p_word IS NULL OR e.word = p_word)
            AND (p_part_of_speech IS NULL OR e.part_of_speech = p_part_of_speech)
            AND user_id = l_user_id
        ORDER BY CAST(e.id AS bigint) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_word IS NULL OR p_part_of_speech IS NULL OR p_example IS NULL THEN
            p_error := 'Word, part_of_speech, and example must not be null!';
            RETURN;
        END IF;

        -- Check for duplicates
        SELECT count(*) INTO l_count
        FROM examples
        WHERE user_id = l_user_id
          AND word = p_word
          AND part_of_speech = p_part_of_speech
          AND example = p_example;

        CALL elp.prc_log(l_user_id || ', ' || p_word || ', ' || p_part_of_speech || ', example=' || p_example || ', count=' || l_count);

        IF l_count >= 1 THEN
            p_error := 'Example already exists for this word and part_of_speech!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO examples (id, word, part_of_speech, example, user_id)
            VALUES (p_id, p_word, p_part_of_speech, p_example, l_user_id);
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- UPDATE action
    ELSIF p_action = 'UPDATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_word IS NULL OR p_part_of_speech IS NULL OR p_example IS NULL THEN
            p_error := 'Word, part_of_speech, and example must not be null!';
            RETURN;
        END IF;

        -- Check for duplicates excluding current record
        SELECT count(*) INTO l_count
        FROM examples
        WHERE user_id = l_user_id
          AND word = p_word
          AND part_of_speech = p_part_of_speech
          AND example = p_example
          AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update because another example exists with same word and part_of_speech!';
            RETURN;
        END IF;

        BEGIN
            UPDATE examples
            SET word = p_word,
                part_of_speech = p_part_of_speech,
                example = p_example
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- DELETE action
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM examples
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_examples(IN p_id text, IN p_word text, IN p_part_of_speech text, IN p_example text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_idioms(text, text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_idioms(IN p_id text, IN p_idiom text, IN p_meaning text, IN p_example text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id TEXT;
    l_count INT;
BEGIN
    p_error := NULL;

    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN no_data_found THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
        OPEN p_rows FOR
        SELECT *
        FROM elp.idioms i
        WHERE 1 = 1
              AND (p_idiom IS NULL OR i.idiom ILIKE '%' || p_idiom || '%')
              AND i.user_id = l_user_id
        ORDER BY CAST(i.id AS bigint) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_idiom IS NULL OR p_meaning IS NULL THEN
            p_error := 'Idiom and meaning must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.idioms
        WHERE user_id = l_user_id
          AND idiom = p_idiom;

        IF l_count >= 1 THEN
            p_error := 'Idiom already exists for this user!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO elp.idioms (id, idiom, meaning, example, user_id)
            VALUES (p_id, p_idiom, p_meaning, p_example, l_user_id);
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- UPDATE action
    ELSIF p_action = 'UPDATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_idiom IS NULL OR p_meaning IS NULL THEN
            p_error := 'Idiom and meaning must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.idioms
        WHERE user_id = l_user_id
          AND idiom = p_idiom
          AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update because another idiom exists with the same text!';
            RETURN;
        END IF;

        BEGIN
            UPDATE elp.idioms
            SET idiom = p_idiom,
                meaning = p_meaning,
                example = p_example
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- DELETE action
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM elp.idioms
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_idioms(IN p_id text, IN p_idiom text, IN p_meaning text, IN p_example text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_meanings(text, text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_meanings(IN p_id text, IN p_meaning text, IN p_word text, IN p_part_of_speech text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id text;
    l_count int;
BEGIN
    p_error := NULL;


    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN no_data_found THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
			  call prc_log('p_word=' || p_word || ',' || 'l_user_id=' || l_user_id);

        OPEN p_rows FOR
        SELECT *
        FROM meanings m
        WHERE 1 = 1
					  and (
							p_word is null
							or m.word = p_word
						)
            AND user_id = l_user_id
        ORDER BY cast(m.id AS bigint) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_meaning IS NULL OR p_word IS NULL OR p_part_of_speech IS NULL THEN
            p_error := 'Meaning, word, and part_of_speech must not be null!';
            RETURN;
        END IF;
				
				CALL elp.prc_log('before =' || l_count);

        SELECT count(*) INTO l_count
        FROM meanings 
        WHERE user_id = l_user_id
          AND word = p_word
          AND part_of_speech = p_part_of_speech;
				
    			CALL elp.prc_log(l_user_id || ', ' || p_word || ', ' || p_part_of_speech || ', count =' || l_count);

        IF l_count >= 1 THEN
            p_error := 'Meaning already exists for this word and part_of_speech!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO meanings (id, meaning, word, part_of_speech, user_id)
            VALUES (p_id, p_meaning, p_word, p_part_of_speech, l_user_id);
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- UPDATE action
    ELSIF p_action = 'UPDATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_meaning IS NULL OR p_word IS NULL OR p_part_of_speech IS NULL THEN
            p_error := 'Meaning, word, and part_of_speech must not be null!';
            RETURN;
        END IF;

        SELECT count(*) INTO l_count
        FROM meanings
        WHERE user_id = l_user_id
          AND word = p_word
          AND part_of_speech = p_part_of_speech
          AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update because another record exists with same word and part_of_speech!';
            RETURN;
        END IF;

        BEGIN
            UPDATE meanings
            SET meaning = p_meaning,
                word = p_word,
                part_of_speech = p_part_of_speech
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- DELETE action
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM meanings
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_meanings(IN p_id text, IN p_meaning text, IN p_word text, IN p_part_of_speech text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_phrases(text, text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_phrases(IN p_id text, IN p_phrase text, IN p_meaning text, IN p_example text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id TEXT;
    l_count INT;
BEGIN
    p_error := NULL;

    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN no_data_found THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
        OPEN p_rows FOR
        SELECT *
        FROM elp.phrases p
        WHERE (p_phrase IS NULL OR p.phrase = p_phrase)
          AND user_id = l_user_id
        ORDER BY CAST(p.id AS BIGINT) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_phrase IS NULL OR p_meaning IS NULL THEN
            p_error := 'Phrase and meaning must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.phrases
        WHERE user_id = l_user_id
          AND phrase = p_phrase;

        IF l_count >= 1 THEN
            p_error := 'Phrase already exists for this user!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO elp.phrases (id, phrase, meaning, example, user_id)
            VALUES (p_id, p_phrase, p_meaning, p_example, l_user_id);
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- UPDATE action
    ELSIF p_action = 'UPDATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_phrase IS NULL OR p_meaning IS NULL THEN
            p_error := 'Phrase and meaning must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.phrases
        WHERE user_id = l_user_id
          AND phrase = p_phrase
          AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update because another record exists with same phrase!';
            RETURN;
        END IF;

        BEGIN
            UPDATE elp.phrases
            SET phrase = p_phrase,
                meaning = p_meaning,
                example = p_example
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- DELETE action
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM elp.phrases
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_phrases(IN p_id text, IN p_phrase text, IN p_meaning text, IN p_example text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_posts(text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_posts(IN p_id text, IN p_title text, IN p_content text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id TEXT;
    l_count INT;
BEGIN
    p_error := NULL;

    -- Optional debug logging
    CALL prc_log('Action: ' || p_action);
    CALL prc_log('Title: ' || COALESCE(p_title, 'NULL'));

    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
        OPEN p_rows FOR
        SELECT *
        FROM elp.posts p
        WHERE (p_title IS NULL OR p.title = p_title)
          AND user_id = l_user_id
        ORDER BY CAST(p.id AS BIGINT) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_title IS NULL OR p_content IS NULL THEN
            p_error := 'Title and content must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.posts
        WHERE user_id = l_user_id
          AND title = p_title;

        IF l_count >= 1 THEN
            p_error := 'Post with the same title already exists for this user!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO elp.posts (id, title, content, user_id)
            VALUES (p_id, p_title, p_content, l_user_id);
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- UPDATE action
    ELSIF p_action = 'UPDATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_title IS NULL OR p_content IS NULL THEN
            p_error := 'Title and content must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.posts
        WHERE user_id = l_user_id
          AND title = p_title
          AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update because another record exists with the same title!';
            RETURN;
        END IF;

        BEGIN
            UPDATE elp.posts
            SET title = p_title,
                content = p_content
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- DELETE action
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM elp.posts
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_posts(IN p_id text, IN p_title text, IN p_content text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_source_translates(text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_source_translates(IN p_id text, IN p_chunks text, IN p_source_id text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id text;
    l_count int;
    rec json; -- declare record as json for json_array_elements
BEGIN
    p_error := NULL;

    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN no_data_found THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
        OPEN p_rows FOR
        SELECT *
        FROM elp.source_translates st
        WHERE (p_source_id IS NULL OR st.source_id = p_source_id)
          AND st.user_id = l_user_id
        ORDER BY CAST(st.id AS bigint) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_chunks IS NULL OR p_chunks = '[]' THEN
            RETURN;
        END IF;

        -- Delete existing translations for this user and source
        DELETE FROM elp.source_translates
        WHERE source_id = p_source_id
          AND user_id = l_user_id;

        -- Insert new translations from JSON array
        BEGIN
            FOR rec IN SELECT * FROM json_array_elements(p_chunks::json)
            LOOP
                INSERT INTO elp.source_translates (id, chunk, translate, source_id, user_id)
                VALUES (
                    rec->>'id',
                    rec->>'chunk',
                    rec->>'translate',
                    p_source_id,
                    l_user_id
                );
            END LOOP;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE or READ.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_source_translates(IN p_id text, IN p_chunks text, IN p_source_id text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_sources(text, text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_sources(IN p_id text, IN p_source text, IN p_name text, IN p_note text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id TEXT;
    l_count INT;
BEGIN
    p_error := NULL;

    CALL prc_log(p_action);
    CALL prc_log(p_source || ',' || p_name);

    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
        OPEN p_rows FOR
        SELECT *
        FROM elp.sources s
        WHERE (p_source IS NULL OR s.source = p_source)
          AND (p_name IS NULL OR lower(s.name) LIKE '%' || lower(p_name) || '%')
          AND (l_user_id IS NULL OR s.user_id = l_user_id)
        ORDER BY CAST(s.id AS BIGINT) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_source IS NULL OR p_name IS NULL THEN
            p_error := 'Source and name must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.sources
        WHERE user_id = l_user_id
          AND source = p_source
          AND name = p_name;

        IF l_count >= 1 THEN
            p_error := 'Source with this name already exists for this user!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO elp.sources (id, source, name, user_id)
            VALUES (p_id, p_source, p_name, l_user_id);
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- UPDATE action
    ELSIF p_action = 'UPDATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_source IS NULL OR p_name IS NULL THEN
            p_error := 'Source and name must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.sources
        WHERE user_id = l_user_id
          AND source = p_source
          AND name = p_name
          AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update — duplicate source for this user!';
            RETURN;
        END IF;

        BEGIN
            UPDATE elp.sources
            SET source = p_source,
                name = p_name
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- DELETE action
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM elp.sources
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_sources(IN p_id text, IN p_source text, IN p_name text, IN p_note text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_synonyms(text, text, text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_synonyms(IN p_id text, IN p_word text, IN p_synonym text, IN p_note text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id TEXT;
    l_count INT;
BEGIN
    p_error := NULL;
		
		call prc_log(p_action);
call prc_log(p_word || ',' || p_synonym);

    -- Get user id from username
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
            WHEN no_data_found THEN
                p_error := 'User not exist';
                RETURN;
        END;
    END IF;

    -- READ action
    IF p_action = 'READ' THEN
        OPEN p_rows FOR
        SELECT *
        FROM elp.synonyms s
        WHERE (p_word IS NULL OR s.word = p_word)
          AND user_id = l_user_id
        ORDER BY CAST(s.id AS BIGINT) DESC;

    -- CREATE action
    ELSIF p_action = 'CREATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

				call prc_log(p_word || ',' || p_synonym);

        IF p_word IS NULL OR p_synonym IS NULL THEN
            p_error := 'Word and synonym must not be null!';
            RETURN; 
        END IF; 

        SELECT COUNT(*) INTO l_count
        FROM elp.synonyms
        WHERE user_id = l_user_id
          AND word = p_word
          AND synonym = p_synonym;

        IF l_count >= 1 THEN
            p_error := 'Synonym already exists for this word and user!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO elp.synonyms (id, word, synonym, note, user_id)
            VALUES (p_id, p_word, p_synonym, p_note, l_user_id);
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- UPDATE action
    ELSIF p_action = 'UPDATE' THEN
        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_word IS NULL OR p_synonym IS NULL THEN
            p_error := 'Word and synonym must not be null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM elp.synonyms
        WHERE user_id = l_user_id
          AND word = p_word
          AND synonym = p_synonym
          AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update because another record exists with same word and synonym!';
            RETURN;
        END IF;

        BEGIN
            UPDATE elp.synonyms
            SET word = p_word,
                synonym = p_synonym,
                note = p_note
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    -- DELETE action
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM elp.synonyms
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;
$$;


ALTER PROCEDURE elp.prc_crud_synonyms(IN p_id text, IN p_word text, IN p_synonym text, IN p_note text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_crud_words(text, text, text, text, refcursor, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_crud_words(IN p_id text, IN p_word text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text)
    LANGUAGE plpgsql
    AS $$

DECLARE
    l_user_id text;
    l_count int;
    l_comparison_sign text;
BEGIN

	-- Log full input
	CALL prc_log(
	    'Entered prc_crud_words: p_id=' || COALESCE(p_id,'NULL') || 
	    ', p_word=' || COALESCE(p_word,'NULL') || 
	    ', p_username=' || COALESCE(p_username,'NULL') || 
	    ', p_action=' || COALESCE(p_action,'NULL') || 
	    ', p_json_params=' || COALESCE(p_json_params,'NULL')
	);

    p_error := NULL;

    -- Parse JSON params
    IF p_json_params IS NOT NULL THEN
        l_comparison_sign := fn_parse_json_array(
            p_key_id       => 'field',
            p_key_value    => 'word',
            p_key_output   => 'comparison_operation',
            p_json_array   => p_json_params
        );
    END IF;

    -- Resolve user id
    IF p_username IS NOT NULL THEN
        BEGIN
            SELECT id
            INTO l_user_id
            FROM users
            WHERE username = p_username;

        EXCEPTION
        WHEN no_data_found THEN
            p_error := 'User not exist';
            RETURN;
        END;
    END IF;

    -- READ
    IF p_action = 'READ' THEN

CALL prc_log(
	    'READ prc_crud_words: l_user_id=' || COALESCE(l_user_id,'NULL') || 
	    ', l_comparison_sign=' || COALESCE(l_comparison_sign,'NULL') || 
	    ', p_word=' || COALESCE(p_word,'NULL')
	);

				OPEN p_rows FOR
				SELECT *
				FROM words w
				WHERE 1=1
				  AND (
				      (l_comparison_sign IS NULL AND w.word ILIKE '%' || COALESCE(p_word,'') || '%')
				      OR (l_comparison_sign = '=' AND w.word = p_word)
				      OR (l_comparison_sign = 'LIKE' AND w.word ILIKE '%' || COALESCE(p_word,'') || '%')
				  )
				  AND user_id = l_user_id
				ORDER BY CAST(w.id AS bigint) DESC;

    -- CREATE
    ELSIF p_action = 'CREATE' THEN

        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_word IS NULL THEN
            p_error := 'Word is null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM words
        WHERE user_id = l_user_id AND word = p_word;

        IF l_count >= 1 THEN
            p_error := 'Word existed!';
            RETURN;
        END IF;

        BEGIN
            INSERT INTO words(id, word, user_id)
            VALUES (p_id, p_word, l_user_id);

        EXCEPTION
        WHEN OTHERS THEN
            p_error := SQLERRM;
        END;

    -- UPDATE
    ELSIF p_action = 'UPDATE' THEN

        IF l_user_id IS NULL THEN
            p_error := 'User id is null!';
            RETURN;
        END IF;

        IF p_word IS NULL THEN
            p_error := 'Word is null!';
            RETURN;
        END IF;

        SELECT COUNT(*) INTO l_count
        FROM words
        WHERE user_id = l_user_id AND word = p_word AND id <> p_id;

        IF l_count >= 1 THEN
            p_error := 'Cannot update word because another word existed!';
            RETURN;
        END IF;

        BEGIN
            UPDATE words
            SET word = p_word
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to update.';
            END IF;

        EXCEPTION
        WHEN OTHERS THEN
            p_error := SQLERRM;
        END;

    -- DELETE
    ELSIF p_action = 'DELETE' THEN
        BEGIN
            DELETE FROM words
            WHERE id = p_id;

            IF NOT FOUND THEN
                p_error := 'No record found to delete.';
            END IF;

        EXCEPTION
        WHEN OTHERS THEN
            p_error := SQLERRM;
        END;

    ELSE
        p_error := 'Invalid action. Must be CREATE, READ, UPDATE, or DELETE.';
    END IF;

END;

$$;


ALTER PROCEDURE elp.prc_crud_words(IN p_id text, IN p_word text, IN p_username text, IN p_action text, INOUT p_rows refcursor, INOUT p_error text, IN p_json_params text) OWNER TO admin;

--
-- Name: prc_get_read_data(text, text, refcursor, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_get_read_data(IN p_source_id text, IN p_username text, INOUT p_rows refcursor, INOUT p_error text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_user_id text;
BEGIN
    -- Try to find the user's ID
    BEGIN
        SELECT id INTO l_user_id
        FROM users
        WHERE username = p_username;

        IF l_user_id IS NULL THEN
            p_error := 'No user found for username: ' || p_username;
            RETURN;
        END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            p_error := 'No user found for username: ' || p_username;
            RETURN;
        WHEN OTHERS THEN
            p_error := SQLERRM;
            RETURN;
    END;

    -- Clear previous errors
    p_error := NULL;

    -- Build the combined JSON result
    OPEN p_rows FOR
        SELECT json_build_object(
            'words', (
                SELECT json_agg(w)
                FROM words w
                WHERE w.user_id = l_user_id
            ),
            'idioms', (
                SELECT json_agg(i)
                FROM idioms i
                WHERE i.user_id = l_user_id
            ),
            'phrases', (
                SELECT json_agg(p)
                FROM phrases p
                WHERE p.user_id = l_user_id
            ),
					 'meanings', ( 
                SELECT json_agg(m)
                FROM meanings m
                WHERE m.user_id = l_user_id
            ),
            'source_translates', (
                SELECT json_agg(st)
                FROM source_translates st
                JOIN sources s ON st.source_id = s.id
                WHERE st.user_id = l_user_id
                  AND s.id = p_source_id
            ),
            'sources', (
                SELECT json_agg(s)
                FROM sources s
                WHERE s.user_id = l_user_id
                  AND s.id = p_source_id
            )
        ) AS result;

EXCEPTION
    WHEN OTHERS THEN
        p_error := SQLERRM;
END;
$$;


ALTER PROCEDURE elp.prc_get_read_data(IN p_source_id text, IN p_username text, INOUT p_rows refcursor, INOUT p_error text) OWNER TO admin;

--
-- Name: prc_log(text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_log(IN p_text text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    l_id TEXT := gen_random_uuid()::text;
BEGIN

	--IMPORTANT: p_text can be null because string || null = null

   PERFORM dblink_exec(
	  'host=localhost dbname=' || current_database() || ' user=admin password=admin123',
	  'INSERT INTO elp.log(id, created_at, text) VALUES (''' || l_id || ''', now(), ''' || replace(p_text, '''', '''''') || ''')'
	);

END;
$$;


ALTER PROCEDURE elp.prc_log(IN p_text text) OWNER TO admin;

--
-- Name: prc_signup(text, text, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_signup(IN p_id text, IN p_username text, IN p_password_hash text, OUT p_error text)
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM elp.users WHERE username = p_username) THEN
    p_error := 'User already exists!';
    RETURN;
  END IF;

  INSERT INTO elp.users (id, username, password_hash, created_at)
  VALUES (p_id, p_username, p_password_hash, NOW());

  p_error := NULL;
END;
$$;


ALTER PROCEDURE elp.prc_signup(IN p_id text, IN p_username text, IN p_password_hash text, OUT p_error text) OWNER TO admin;

--
-- Name: prc_test(text, refcursor, text); Type: PROCEDURE; Schema: elp; Owner: admin
--

CREATE PROCEDURE elp.prc_test(IN p_id text, INOUT p_rows refcursor, INOUT p_error text)
    LANGUAGE plpgsql
    AS $$
BEGIN
	p_error := 'error ne';
    OPEN p_rows FOR
      SELECT *
      FROM words w
      ORDER BY CAST(w.id AS BIGINT) DESC;

END;
$$;


ALTER PROCEDURE elp.prc_test(IN p_id text, INOUT p_rows refcursor, INOUT p_error text) OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: consts; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.consts (
    key text,
    value text,
    visible boolean DEFAULT false NOT NULL
);


ALTER TABLE elp.consts OWNER TO admin;

--
-- Name: COLUMN consts.key; Type: COMMENT; Schema: elp; Owner: admin
--

COMMENT ON COLUMN elp.consts.key IS 'yyyy';


--
-- Name: events; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.events (
    id text,
    "timestamp" text,
    status text,
    data text
);


ALTER TABLE elp.events OWNER TO admin;

--
-- Name: examples; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.examples (
    id text NOT NULL,
    word text NOT NULL,
    part_of_speech text NOT NULL,
    example text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE elp.examples OWNER TO admin;

--
-- Name: idioms; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.idioms (
    id text NOT NULL,
    idiom text NOT NULL,
    meaning text NOT NULL,
    example text,
    user_id text NOT NULL
);


ALTER TABLE elp.idioms OWNER TO admin;

--
-- Name: log; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.log (
    id text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    text text NOT NULL
);


ALTER TABLE elp.log OWNER TO admin;

--
-- Name: meanings; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.meanings (
    id text NOT NULL,
    meaning text NOT NULL,
    word text NOT NULL,
    part_of_speech text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE elp.meanings OWNER TO admin;

--
-- Name: part_of_speechs; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.part_of_speechs (
    id text,
    name text
);


ALTER TABLE elp.part_of_speechs OWNER TO admin;

--
-- Name: phrases; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.phrases (
    id text NOT NULL,
    phrase text NOT NULL,
    meaning text NOT NULL,
    example text,
    user_id text NOT NULL
);


ALTER TABLE elp.phrases OWNER TO admin;

--
-- Name: posts; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.posts (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE elp.posts OWNER TO admin;

--
-- Name: source_translates; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.source_translates (
    id text NOT NULL,
    chunk text NOT NULL,
    translate text NOT NULL,
    source_id text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE elp.source_translates OWNER TO admin;

--
-- Name: sources; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.sources (
    id text NOT NULL,
    source text NOT NULL,
    name text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE elp.sources OWNER TO admin;

--
-- Name: speaking_scores; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.speaking_scores (
    id text,
    speaking_id text,
    score numeric,
    text_listened text,
    text text
);


ALTER TABLE elp.speaking_scores OWNER TO admin;

--
-- Name: speakings; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.speakings (
    id text,
    question text,
    answer text
);


ALTER TABLE elp.speakings OWNER TO admin;

--
-- Name: synonyms; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.synonyms (
    id text NOT NULL,
    word text NOT NULL,
    synonym text NOT NULL,
    note text,
    user_id text NOT NULL
);


ALTER TABLE elp.synonyms OWNER TO admin;

--
-- Name: tts; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.tts (
    id text,
    text text,
    audio_base64 text
);


ALTER TABLE elp.tts OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.users (
    id text NOT NULL,
    username text NOT NULL,
    email text,
    password_hash text NOT NULL,
    full_name text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE elp.users OWNER TO admin;

--
-- Name: words; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.words (
    id text NOT NULL,
    word text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE elp.words OWNER TO admin;

--
-- Name: writing_answers; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.writing_answers (
    id text,
    question_id text,
    answer text,
    review text
);


ALTER TABLE elp.writing_answers OWNER TO admin;

--
-- Name: writing_questions; Type: TABLE; Schema: elp; Owner: admin
--

CREATE TABLE elp.writing_questions (
    id text,
    question text
);


ALTER TABLE elp.writing_questions OWNER TO admin;

--
-- Name: examples examples_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.examples
    ADD CONSTRAINT examples_pkey PRIMARY KEY (id);


--
-- Name: idioms idioms_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.idioms
    ADD CONSTRAINT idioms_pkey PRIMARY KEY (id);


--
-- Name: log log_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);


--
-- Name: meanings meanings_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.meanings
    ADD CONSTRAINT meanings_pkey PRIMARY KEY (id);


--
-- Name: phrases phrases_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.phrases
    ADD CONSTRAINT phrases_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: source_translates source_translates_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.source_translates
    ADD CONSTRAINT source_translates_pkey PRIMARY KEY (id);


--
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- Name: synonyms synonyms_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.synonyms
    ADD CONSTRAINT synonyms_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: words words_pkey; Type: CONSTRAINT; Schema: elp; Owner: admin
--

ALTER TABLE ONLY elp.words
    ADD CONSTRAINT words_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict rETwyVtDgp0SffBda0gHOiwDcRGVZTIDQbYcQCTeBmEFHRTQ2Mzcc8ekWYuvA4Z

