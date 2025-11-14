WITH table_info AS (
    SELECT
        cols.column_name AS "Column",
        cols.data_type AS "Type",
        CASE
            WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'PK'
            WHEN tc.constraint_type = 'FOREIGN KEY' THEN 'FK'
            ELSE ''
        END AS "Key",
        CASE
            WHEN cols.is_nullable = 'NO' THEN 'NO'
            ELSE 'YES'
        END AS "Null",
        CASE
            WHEN tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE') THEN 'YES'
            ELSE 'NO'
        END AS "IsUnique",
        COALESCE(pgd.description, '') AS "Description"
    FROM
        information_schema.columns cols
    LEFT JOIN
        pg_catalog.pg_statio_all_tables st
        ON st.relname = cols.table_name
    LEFT JOIN
        pg_catalog.pg_description pgd
        ON pgd.objoid = st.relid
        AND pgd.objsubid = cols.ordinal_position
    LEFT JOIN
        information_schema.key_column_usage kcu
        ON kcu.table_name = cols.table_name
        AND kcu.column_name = cols.column_name
    LEFT JOIN
        information_schema.table_constraints tc
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_name = cols.table_name
    WHERE
        cols.table_name = 'words'
)
SELECT
    '| Column | Type | Key | Null | IsUnique | Description |' AS markdown_row
UNION ALL
SELECT
    '|------------|-----------|-----|------|---------|-----------------|'
UNION ALL
SELECT
    '| ' || "Column" || ' | ' || "Type" || ' | ' || "Key" || ' | ' 
        || "Null" || ' | ' || "IsUnique" || ' | ' || "Description" || ' |'
FROM table_info;
