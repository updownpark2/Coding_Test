SELECT MEMBER_ID, MEMBER_NAME, GENDER, SUBSTR(DATE_OF_BIRTH,1,10) AS DATE_OF_BIRTH FROM MEMBER_PROFILE
WHERE DATE_OF_BIRTH LIKE "%-03-%" AND GENDER = "W" AND NOT TLNO="NULL"
ORDER BY MEMBER_ID ASC