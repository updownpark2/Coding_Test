SELECT  FOOD_TYPE,REST_ID,REST_NAME,(FAVORITES) AS FAVORITES
FROM REST_INFO GROUP BY FOOD_TYPE
ORDER BY FOOD_TYPE DESC

SELECT DISTINCT FOOD_TYPE,REST_ID,REST_NAME,FAVORITES FROM REST_INFO

GROUP BY FOOD_TYPE
HAVING FAVORITES = 734

/*유니크한 값을 가져올 수 없음 DISTINCT 이렇게 쓰면 X */

SELECT FOOD_TYPE,MAX(FAVORITES),FAVORITES FROM REST_INFO 
GROUP BY FOOD_TYPE

/*GROUP BY는 묶은 후 묶여진 카테고리의 그 값을 빼서 사용한다고 생각하면된다. */
/* 값이 아닌 다른 column은 정렬되지않는다.*/


SELECT FOOD_TYPE,REST_ID,REST_NAME,FAVORITES FROM REST_INFO
WHERE FAVORITES IN (SELECT MAX(FAVORITES) FROM REST_INFO GROUP BY FOOD_TYPE)
GROUP BY FOOD_TYPE
ORDER BY FOOD_TYPE DESC
/* 성공 */