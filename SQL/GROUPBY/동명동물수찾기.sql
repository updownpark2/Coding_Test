SELECT NAME, COUNT(*) AS COUNT FROM ANIMAL_INS GROUP BY NAME HAVING COUNT>1 ORDER BY NAME


/*COUNT(*)=> NULL까지 포함 COUNT(column)=> NULL 미포함 */