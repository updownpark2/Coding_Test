# CodingTest_Retry
코딩테스트 Level 1 부터 다시시작

## 숫자의표현 (level2)
자연수를 연속된 자연수로 표현할 수 있는 경우의 수를 묻는 문제
조건식과 반복식을 이용하여 풀수도 있지만 더 좋은 아이디어가 있어서 메모한다.

### 연속하는 자연수의 합의 경우를 구하는 건 약수 중 홀수의 갯수를 구하는 문제와 같다.

```js
const n = 24;
function solution(n) {
  let count = 0;
  for (i = 1; i <= n; i++) {
    if (i % 2 === 1 && n % i === 0) {
      count++;
    }
  }
  return count;
}
solution(n);
```

## 다음큰숫자(level2) , match

이 문제를 풀며 match함수에 대해 배울 수 있었다. 

### string.match(찾을단어) 이렇게 쓰인다.
indexOf와 다른 점은 정규식 검색을 통해 결과값을 배열로 받아볼 수 있다.

```js
const RR = "love you , love, everything, love"
console.log(RR.match(/love/gi))//없으면 null값이나온다.
//return [love,love,love]
```

## 짝지어제거하기 ( level2 ) ,Splice vs slice

이 문제를 풀며 반복문(for문) + splice,slice에 대해 배울 수 있었다.

### Splice = > 원본에 영향을 준다. 제거하고 남은 배열을 반환하고 만약 제거할게 없다면 undefined를 반환한다.
### Slice => 원본에 영향을 주지 않는다. return이 필요 , 삭제할 배열 요소를 반환 받을 수 있다. 

헤맸던 부분 
```JS
const s = "baabaa";
function solution(s) {
  let A = [...s];

  for (i = 0; i < A.length; i++) {
    if (A[i] === A[i + 1]) {
      A.splice(i, 2);
      i = 0; // 여기서 i=0으로 리셋했는데 반복문은 i=1로 돌아갔다. 반복문은 시작값을 0으로 시작할 뿐
      // 다음 loop를 돌 때는 +1이 되기 때문에 i= -1 을 해주어야 정상적으로 작동되었다.
    } 
  }
  return A.length === 0 ? 1 : 0;
}
solution(s);
```
이렇게 풀었는데 결과값은 정상적으로 나오지만 효율성 테스트를 통과하지 못했다.


```JS
const s = "baabaa";
function solution(s) {
  let A = [...s];
  let B = [];
  for (i = 0; i < A.length; i++) {
    if (A[i] === B[B.length - 1]) {
      B.pop();
    } else if (A[i] !== B[B.length - 1]) {
      B.push(A[i]);
    }
  }
  return B.length === 0 ? 1 : 0; //이렇게 풀었더니 통과했다. 
  //블로그를 찾아보았다ㅠㅠ
}
solution(s);
```
### splice는 효율성이 떨어진다 ( 반복마다 새로운 배열을 만들기때문) 반복문은 한 번의 loop만 돌리면서 즉각적으로 데이터를 비교하려면 하나의 배열을 생성하여 실시간으로 비교하는 방법이 더 좋다.

## 멀리뛰기 (피보나치수열)

<img width="550" alt="image" src="https://user-images.githubusercontent.com/101778169/196688477-48c37f30-96f8-488b-9032-c025cba389e6.png">

해당문제를 보고 처음엔 팩토리얼을 활용하여 해결했다.
```js
const n = 10;

function solution(n) {
  const A = Math.floor(n / 2);
  let answer = 0;
  for (i = 1; i <= A; i++) {
    let Sum = 1;
    let count = i + n - i * 2; //6
    for (j = 0; j < i; j++) {
      Sum = Sum * ((count - j) / (i - j));
    }
    answer = answer + Sum;
  }
  const answers = (answer + 1) % 1234567;
  return answers;
}
solution(n);
```
하지만 해당문제는 피보나치 수열을 활용해서 푸는 것만 정답으로 처리가 됐다

### 피보나치수열
(n-2)번째 항 + (n-1)번째 항이 n 번째 항인 수열을 말한다.

1,1,2,3,5,8,13,21 이 이러하다

문제를 보면 n=1 일때 1 n=2 일 때 2 n=3 일때 3 n= 4일때 5 n= 5일때 8이 리턴값으로 나오는것을 보면
이는 피보나치 수열임을 알 수있다. 

그렇기 때문에 
```js
function solution(n) {
  let answer = [0, 1, 2];
  for (i = 3; i <= n; i++) {
    answer[i] = (answer[i - 2] + answer[i - 1]) % 1234567;
  }
  return answer[n] % 1234567;
}//이렇게 해결할 수 있다.
```

## 행렬의 곱셉(reduce 메소드)

reduce 메소드는 map 과 forEach와 비슷하다!

```js
const number = [1,2,3,4]

number.reduce((누산값,현재요소값,현재요소의index,현재배열)={
return 다음누산값 },초기누산값)

```
예를들어 이렇게 사용할 수 있다.

```js
const numbers = [1,2,3,4]
const sum = numbers.reduce((sum,num,index)=>{
return sum+num},0)
//10 순차적으로 더해준다.
```
참고 https://bigtop.tistory.com/69

## new Map() 활용법 (배열에서 특정 원소 몇개인지 찾거나 이를 이용하는 문제)

```js

const arr = [1,2,3,3,4,4,5,6,6]
```
arr을 forEach() 메서드를 통해 순환하며 map에 저장하면서하면 간단하게 내용을 저장할 수 있다.

```js
arr.forEach((item))=>{
map.set(item,map.get(item)+1)
}

```

# 코딩테스트를 연습하는 방법을 바꾸어보려고한다! 

**_매일 1~2문제를 꾸준히 푸는 것은 좋지만 어떻게 꾸준히 풀어나가냐가 중요한 것같다.
앞으로는 30분안에 문제를 해결하지 못했을 때는 실패로 간주하고 해답을 볼것이다.
그리고 타인이 써주신 코드를 확인하고 그곳에서 배운 점을 정리하여 내 것으로 만들어보자!!_ **

문제풀이는 정답 성공률 순서로 정렬하여 풀어나가겠다.

## 최댓값과 최솟값

내가 푼 풀이

```js
const s = "1 2 3 4";

function solution(s) {
  const arr = s.split(` `).sort((a, b) => b - a);

  const lastIndex = arr.length - 1;

  return `${arr[lastIndex]} ${arr[0]}`;
}
solution(s);
```
나의 문제 계획은 다음과 같다.
1. 문자열을 배열로 변경하자. (split)
2. 변경된 배열을 내림차순으로 정렬하자. (sort)
3. 0인덱스는 최댓값 lastIndex는 최솟값이 된다.
4. return `${} ${}`로 중간 공백을 표시하자.

내가 본 풀이
```js
function solution(s) {
  const arr = s.split(``);

  return Math.min(...arr) + ` ` + Math.max(...arr);
}
```

굳이 배열을 정돈할 필요없이 split으로 공백을 제거한 배열로 만든 후
...의 spread operator를 활용하여 공백이 없는 string으로 만들어준다
"1","2","3","4" 의 형태
> 그 후 Math 메소드를 활용하여 Math.max, Math.min 함수를 사용한다.
> _**위 함수는 string사이에서도 사용이가능하다!!**_


## JadenCase 문자열 


문제는 다음과 같다! 
![문제 사진](https://velog.velcdn.com/images/tkdgk1996/post/f86f3a39-82a4-41b7-9e0b-4d03b23c8dc4/image.png)

문제는 간단했지만 이상하게 풀리지가 않았다. 그럼 필자에겐 간단하지 않았다는 말..

이 전에 풀었을 때는 통과했었지만 코드가 굉장히 지저분했다. 

나의 문제 해결 계획은 다음과 같다.

> 1. split 메서드로 스트링을 배열화 시킨다 
2. 받아온 요소에서 공백이 아닌 요소는 다시 한번 map을 사용한다.
3. 그 때 받아온 요소의 인덱스가 0이고 첫 번째 인자가 숫자가 아니라면 toUpperCase를하고
나머지 요소엔 toLowerCase를 한다.

결과는 실패 ! 

실패한 코드는 다음과 같다.
```js
const s = "3people   unFollowed me";

function solution(s) {
  const arr = s
    .toLowerCase()
    .split(` `)
    .map((item) => {
      if (item === ``) {
        return item;
      }
      return item
        .split()
        .map((charset, index) => {
          const check = /^[a-zA-Z]+$/;
          console.log(charset);
          return check.test(charset) === false && index === 0
            ? charset
            : charset.toUpperCase();
        })
        .join(``);
    });

  return arr;
}
solution(s);
```
정규식에.. map 두번 split 두번 굉장히 복잡해보인다.

특히 정규식에선 왜 헤맸는지 모르겠다.
**기본적인 정규식.test(string) ** 이걸 왜 그렇게 헤멨는지 모르겠다.

정리하면서 해보니 내가 아는게 제대로 아는게 아니었구나 라는 점을 알게된다..

다시 해답을 보면서 느낀 점 및 잘못된 오류는 다음과 같다.

> toUpperCase와 toLowerCase는 숫자에 적용하나 빈칸에 적용하나 변하지 않는 효과는 동일하다
 즉, 굳이 숫자와 빈칸을 나누어줄 필요가 없다.
 그냥 첫번 째 인덱스는 UpperCase() 나머지는 LowerCase()를 적용해주면된다.
 

이렇게 생각하니 정규식이 필요가 없어졌다.  이젠 그냥 string의 첫 번째 요소와 나머지 요소에 접근할 수 있으면 된다.

내가 본 코드는 다음과 같다.

```js
const S = "3people   unFollowed me";

const arr = S.split(` `)
  .map((item) =>
    item === ""
      ? item
      : item.charAt(0).toUpperCase() + item.substring(1).toLowerCase()
  )
  .join(` `);
```

위 코드는 

### CharAt, substring

위 두 메서드를 사용해서 문제를 해결했다. map과 forEach는 배열에서만 사용이 가능하다.
이 매서드를 쓰려고 다시한번 배열을 생성하는 바보같은 짓을 했다..

string 자체에서 몇 번째 요소를 사용하고 싶다면 charAt,substring 두개면 된다.

먼저 charAt으로 string에서 첫번째 요소를 가져와서 toUpperCase해주고
나머지 요소는 substring으로 접근하여 toLowerCase 해주면 된다.
javascript에서는 string 끼리의 + 연산이 가능하다.
그렇기 때문에 item.charAt(0).toUpperCase() + item.substring(1).toLowerCase()
이렇게 return 해줄 수 있다.

이 문제를 풀면서 알게된 필자의 좋지 않은 습관은 
문제에 써진대로 푼다는 점이다 문제를 보고 생각한 후 해결하는 습관을 가져야 할 거 같다.
문제에 써진 힌트대로 해결하다보니 문제가 복잡해지고 필요없는 연산이 들어간다.

## 최솟값 만들기

이 문제는 비교적 쉬운 문제였다. 

![](https://velog.velcdn.com/images/tkdgk1996/post/cf3a01db-02ea-430e-8c41-6d96e62a05e5/image.png)

 배열의 요소를 랜덤하게 곱했을 때 가장 최소가 나오는 값을 리턴하면 되는 문제이다.
 
 필자의 접근법은 다음과같다.
 
>  A배열의 가장 작은 숫자에 B배열의 가장 큰숫자를 곱하면 결과값이 가장 작지않나?

결과는 성공! 

내가 푼 코드

```js
const A = [1, 4, 2];
const B = [5, 4, 4];

function solution(A, B) {
  const a = A.sort((a, b) => a - b);
  const b = B.sort((a, b) => b - a);

  let answer = 0;
  for (let i = 0; i < A.length; i++) {
    answer = answer + a[i] * b[i];
  }
  

  return answer;
}
```

그럼에도 여기서 더 간단하게 만들수 있는 타인의 코드가 있었다.

```js

function solution(A,B){
    A.sort((a, b) => a - b)
    B.sort((a, b) => b - a)
    return A.reduce((total, val, idx) => total + val * B[idx], 0)
}
```
여기서 배운 점은 2가지이다

1. sort는 원본을 변경시킨다! 그럼으로 새로 그 값을 저장하지 않아줘도 된다.
2. reduce

### reduce

reduce함수는 가끔 썼었지만 자주 쓰지는 않았다. 뭔가 reduce를 쓰는 것보다 for문을 사용하는 것이
개인적으로는 더 좋았기 때문이다. 그럼에도 reduce를 한번 알아보고 넘어가야할 거 같아 정리를 해본다.

reduce 메서드는 다음과 같이 사용한다. 
> 배열.reduce((누적값,현재값,인덱스,요소)=>{return 결과, 초기값}

여기서 초기값은 설정해주지 않으면 자동으로 0이 된다.

하지만 reduce를 무조건 덧셈에 활용할 수 있는 것은 아니다.

map, filter와 동일하게 사용할 수 있다.

```js
result = array.reduce((acc,cur)=>{
acc.push(cur%2===0 ? "홀수" : "짝수")
 return acc;
},[])

```
이렇게 초기값을 [] 인 배열로 설정하면 조건에 따른 배열로 리턴도 가능하다. 

정리하면
array.reduce((누적값, 현재값, 인덱스)=>{
return 
},초기값)

이렇게 사용하고 return된 값을 받는 메서드이다! 
[제로초 Reduce 설명글](https://www.zerocho.com/category/JavaScript/post/5acafb05f24445001b8d796d)


## 올바른괄호

올바른 괄호문제는 "스택" 문제이다

![](https://velog.velcdn.com/images/tkdgk1996/post/22f2157d-8c70-4448-83ea-9f1293031b66/image.png)


스택문제는 
[프로그래머스 JS 코딩테스트 인터넷강의](https://school.programmers.co.kr/learn/courses/13213/13213-%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8-%EA%B4%91%ED%83%88-%EB%B0%A9%EC%A7%80-a-to-z-javascript)

여기서 다루어 보았다. 스택은 First In Last Out이다. 
처음에 들어온것이 마지막에 나가는 순서인데 여기서는 그냥 검증을 해주는 용도로 스택을 사용하면된다.

>나의 접근법은 아래와 같다. "(" 를 보면 arr에 무언가를 담고 
")"를 보면 arr에서 한가지를 빼자
만약 arr이 비었는데 (length가 0 인데) ")" 가 나온다면 false를 return 
또 모든 배열 순환이 끝난 후 length가 0보다 크면 false를 return 하는 것으로 정했다.

나의 풀이법은 다음과 같다. 

```js
const s = "(())()";

function solution(s) {
  const check = [];

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === "(") {
      check.push(0);
    }
    if (s.charAt(i) === ")") {
      if (check.length === 0) {
        return false;
      }
      check.pop();
    }
  }
  if (check.length > 0) {
    return false;
  }
  return true;
}
```

앞서 배운 문제에서 split 하지 않고 charAt으로 string 내부의 index에 접근하여 
문제를 해결하였다.

## 이진변환반복하기!
![](https://velog.velcdn.com/images/tkdgk1996/post/97ccb0bc-2a5f-449c-86c2-fe7593270746/image.47)

나의 풀이는 
1. s==="1"이 될 때 까지 s를 깎아 나가야겠다!
2. "0"을 filter로 제거할 때마다 zeroCount를 1씩 높이자
3. 그 후 s= 0이 제거 된 배열의 길이를 2진법으로 나타낸 값으로 "재할당" 해준다
4. 그리고 transCount(2진법으로 바꾼 횟수)를 높인다

나의 코드 
```js
function solution(s) {
  let zeroCount = 0;
  let transCount = 0;

  while (s !== "1") {
    //.split 보다 spread Operator를 사용해서 string => arr로 변경하였다.
    const ArrLength = [...s].filter((item) => {
      if (item === "1") {
        return item;
      }
      if (item === "0") {
        zeroCount = zeroCount + 1;
      }
    }).length;

    s = ArrLength.toString(2);
    transCount = transCount + 1;
  }
  //0다 사라짐

  return [transCount, zeroCount];
}

```



이 문제를 해결하면서 재할당에 대한 개념을 좀 더 학습해야 겠다는 생각이 들었다.

필자가 이 문제에서 헤맸던 부분은 재할당을 해주는 시점을 헷갈려했다.. 아마 let과 const의 재할당을

다시 학습해야겠다 생각을 했다.

### const, let, var 

1. 변수선언방식 

Var : 
중복 선언 ⭕️ 재할당 ⭕️ 

```js
var A ="123"

var A ="345"
```
이게 된다 ㄷ ㄷ var은 마지막에 할당된 값이 최종 변수에 저장된다.
이는 양날의 검이 될 수 있다. 유연하게 사용도 가능하지만 나의 실수를 어떤 것도 알려주지 않는다..

Let : 
중복선언 ❌ 재할당 ⭕️

```js
let A ="123"

let A ="345"
//이러면 오류메세지 바로 등장!! 

A = "456" 
//이건 가능! 
```
위 코드와 같이 중복선언은 안되지만 재할당은 가능하다.
재할당이 가능하다는 점이 코딩테스트 문제를 풀때 유용하게 작용할 거 같다.

Const:
중복선언 ❌ 재할당❌ 
```js
const A ="123"
const A="345"
//오류발생!!!
A="678"
//오류발생!!!
```
Const는 변하지 않는 값을 선언하는데 유용하다
그러나 array에 push 되는 것은 중복선언하거나 재할당 하는것이 아님으로
배열에는 const를 사용하는 것이 좋다.

2.스코프

Var: 
함수레벨스코프

즉, 함수 내부에 있는 var이면 함수 내에서 유효하다! 
```js
const AA = (a)=>{
 if(a==="1"){
 var b="234"
 }
  console.log(b)
}

AA(a) //이게 에러나지않고 가능하다 그저 함수안에서만 선언된다면 
//그 함수 내부에서는 모두 사용이 가능하다.
```

Const, Let : 
블록레벨스코프

함수 뿐 아니라 if 절 for while try/catch forEach 등 모든 코드블록 내부에서 선언된 변수는 블록 내부에서만 유효하다.

```js
const AA =()=>{
 for(let i = 0 ; i<3;i++){
  const A = "123" 
   
 }
  console.log(A)
}
//이러면 바로 오류가 발생한다. A는 for문 안에서 선언됐기 때문에 for문 안에서만 사용이 가능하다.
//for문 안의 값을 외부의 let 변수에 재할당해줄 수는 있다.

```

3. 호이스팅 방식

먼저 호이스팅이란 함수내 필요한 모든 변수값들은 유효범위의 최상단에 선언한것처럼 동작하는것을 말한다.
그냥 변수,함수들은 맨위로 올라온다는 말! 


Var:
```js
console.log(a); //undefined

var a = 123;
console.log(a); //123
```
a에 할당만 안됐을 뿐 선언되었음을 알고 undefined로 초기화를 시켜놓아서 undefined를 출력한다.

Const,Let:
```js
console.log(a); //ReferenceError: a is not defined

let a = 123;
console.log(a); // 123
```
let과 const는 선언만해놓고 초기회가 이루어지지않아 오류가 발생한다.

**즉, 초기화 차이이다.** 
Var은 선언과 동시에 변수 값에 대한 초기화가 이루어지지만 
const 와 let은 변수 선언문을 만나야 초기화가 이루어진다.

[var,const,let](https://cheershennah.tistory.com/231)


## 숫자의 표현 

![](https://velog.velcdn.com/images/tkdgk1996/post/ef35b22c-9d04-403c-963e-1edc5bed203a/image.48)

문제는 1씩 더해서 n이 되는 경우의 수를 구하는 문제였다.
사실 이 문제를 금방 풀수 있을 거라 생각했는데 35분정도 걸렸던 거 같다..

이 전에 이 문제를 접했을 때 이중for문(이번도사용했지만 ㅠㅠ) else if 불필요한 점을 제거하고
최선의 방법으로 수행하고 싶었다. 

이전에 내가 풀었던 풀이 방법은 
```js

function solution(n) {
  let arr = [];
  let sum = 0;
  let count = 0;
  let check = 0;
  for (i = 1; i <= n; i++) {
    arr.push(i);
  }
  for (i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
    if (sum > n) {
      check = check + 1;
      i = check;
      sum = 0;
    } else if (sum === n) {
      check += 1
      count +=1
      i = check;
      sum = 0;
    }
  }
  return count;
}
```
다음과 같다. 먼저 n까지의 배열을 만들고 그 배열을 for문 속에서 순회하면서 순차적으로 더했다.
이중for문을 사용하는 대신에 check라는 변수를 만들어 그것으로 i를 재할당 하여 1개의 for문이 
반복되도록 하였다. 

개선점 
1. 배열을 굳이 만들필요가 있을까?
2. else if를 안써도 될거 같다.
3. check라는 변수를 넣어주는 것보다는 다른 방법은 없을까?

위 세가지 사항을 고려하여 다시 코드를 구성해 보았다.
```js
const n = 15;
function solution(n) {
  let count = 0;
  for (let i = 1; i < n / 2; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum = sum + j;
      if (sum === n) {
        count = count + 1;
        break;
      }
      if (sum > n) {
        break;
      }
    }
  }
  return count + 1;
}
solution(n);
```
일단 이중포문을 사용하였고 break를 통해 내부의 for 문을 컨트롤하였다.
외부의 for문은 굳이 n 까지 돌지 않아도 된다고 생각하여 n/2 까지만 돌도록 코드를 짰다.

타인의 코드

```js
function expressions(num) {
  var answer = 1; //(15)
  var n, sum;

  for(var i=1;i<=Math.floor(num/2);i++){
    n = i;
    sum = 0;
    while(sum<num) sum += n++;
    if(sum==num) answer++;
  }
  return answer;
}
```
내가 머리속에 구상했던 건 저 코드이다!! 

while(sum<num) 으로 제한을 걸어두어서 자동으로 합이 num을 넘어서면 다음 i로 진행되도록
코드가 짜여져있어서 보기편했다. 

## 피보나치수열문제
![](https://velog.velcdn.com/images/tkdgk1996/post/41bd01b7-47d4-4f65-8fa4-03fb9fce3c78/image.49)

피보나치 수열은 0,1,1,2,3,5,8,13,21 ... 이렇게 끝에 두개씩 더한게 다음 수열의 원소가 된다.

이 문제는 처음 풀었을 때 이해하지 못하여 미해결 문제로 남아있었다.

그런데 다시 풀어보니 생각보다 쉽게 해결이 되었다 !!!! ㅎㅎ

내가 생각한 논리는 이렇다.

1. 배열로 생각했을 때 기본 배열 [0,1]에 lastIndex의 원소와 lastIndex-1의 원소가 다음 배열 원소가 된다.
2. 그렇다면 lastIndex를 알아내고 각각 lastIndex원소와 lastIndex-1의 원소를 더해 배열에 push한다.
3. 이를 n-1 만큼 순화하면서 push 해야 원하는 마지막 배열원소를 얻을 수 있고 이것이 답이겠다!

해서 처음 짠 코드는 다음과 같다.

```js
const n = 5;
function solution(n) {
  const arr = [0, 1];
  while (arr.length !== n + 1) {
    const Arrlength = arr.length;
    arr.push((arr[Arrlength - 1] + arr[Arrlength - 2]));
    
  }
  return arr[arr.length - 1] % 1234567;
}
```

그러나 이렇게 해결하려고 하자 효율성테스트에서 모두 불합격 하였다. n은 100,000까지 나올 수 있다.

그렇게 되면 100,000번째 피보나치수열은 너무 거대해 %1234567에서 오류가 발생하는 것이다.

오를 오버플로우 라고한다. 이 숫자들은 32비트 정수 범위를 넘기때문에 모든 단계에 %연산을 사용해야한다.

그렇게 수정한 코드는 
```js
const n = 5;
function solution(n) {
  const arr = [0, 1];
  while (arr.length !== n + 1) {
    const Arrlength = arr.length;
    arr.push((arr[Arrlength - 1] + arr[Arrlength - 2]) % 1234567;);
    
  }
  return arr[arr.length - 1];
}
```
위 코드이다. push를 하기전에 각 원소를 더해주는 과정에서 먼저 % 연산을 활용하여 값이 일정 이상 커지지 않게 만들었다. 

## 다음큰숫자

문제만 이해하면 쉬운문제이다! 

![](https://velog.velcdn.com/images/tkdgk1996/post/5988637a-a7cc-4e38-aabc-2337aa56650f/image.03)

해당 문제는 이전에 풀었을 때도 풀었었고 지금의 코드와 크게 다르지 않았다.

논리는 다음과 같다.
1. n을 toString() 메서드를 이용하여 이진법으로 나타낸 후 배열로 변환, 그때 "1"만 filter하여 그 배열의 길이를 반환한다.
2. 그리고 for문을 만들어 n+1을 시작으로 1,000,000 까지 순환하도록 만든 후 
3. 해당 i의 이진법 변환, 배열화 후 "1"만 필터링하여 위 n의 길이와 같은지 확인한다! 

코드는 다음과 같다.
```js
const n = 78;

function solution(n) {
  const oneCount = n
    .toString(2)
    .split(``)
    .filter((item) => item === "1").length;

  for (let i = n + 1; i < 1000000; i++) {
    if (
      i
        .toString(2)
        .split(``)
        .filter((item) => item === "1").length === oneCount
    ) {
      return i;
    }
  }
}

solution(n);
```

## 짝지어제거하기

![](https://velog.velcdn.com/images/tkdgk1996/post/a7ca9fe7-bb72-4859-8f9d-c77a2c350dcd/image.05)

위 문제는 스택문제였다.

스택 Arr을 생성하여 배열을 순회하면서 이전의값들과 비교 후 스택 Arr을 제거해나가면된다.

이 문제는 이전에도 풀었었고 논리도 그 전과크게 다르지 않았다

```js
function solution(s) {
  const Arr = s.split(``);
  const check = [];
  for (let i = 0; i < Arr.length; i++) {
    if (check[check.length - 1] === Arr[i]) {
      check.pop();
      continue;
    }
    check.push(Arr[i]);
  }

  return check.length === 0 ? 1 : 0;
}
```
위 코드는 처음 풀었던 코드이다. continue를 통해 if를 최대한 두번 안쓰려고 노력했다
우아한테크코스 프리코스에서 if와 else는 최대한 지양하는 것이 좋다고 배웠기 때문이다.
 그럼에도 비교를 위해 else를 써보았는데 이 문제에선 그게 더 효율성이 좋게 나왔다.
 
 else를 사용한 문제풀이
 ```js


function solution(s) {
  const Arr = s.split(``);
  const check = [];
  for (let i = 0; i < Arr.length; i++) {
    if (check[check.length - 1] === Arr[i]) {
      check.pop();
    } else {
      check.push(Arr[i]);
    }
  }

 return check.length === 0 ? : 1 : 0
}
```

문제별로 else를 썼을 때 더 나은 효율을 보일 수 있나보다

그리고 또 하나 배운점은 for문에서 ++ 와 +=1 의 비교이다.

++보다 +=1 의 효율성이 더 높게나왔다. 이것 역시 문제별로 달라 

혹시 효율성 문제에서 통과하지 못했을 때 위 두 가지를 변경해 보아야겠다.

그리고 처음에는 forEach로 접근했었는데 

forEach보다는 for문이 더 나은 효율성을 보였다.

## 영어끝말잇기

이 전에도 풀어본 문제지만 이번에 새롭게 풀 때 효율성이 많이 개선되어 기분이 좋았다.

이 문제는 약간 타당성검사와 비슷한 문제이다. 몇가지 조건에 따라 return 값이 달라진다

먼저 과거에 내가 풀었던 코드를 보겠다!

```js
function findFailPerson(index, n) {
  const answer = [];
  const person = (index + 1) % n;
  const personOrder = Math.ceil((index + 1) / n);

  if (person === 0) {
    answer.push(n, personOrder);
  }
  if (person !== 0) {
    answer.push(person, personOrder);
  }

  return answer;
}

function findWordLength(wordArr) {
  if (wordArr.length < 2) {
    return false;
  }
}

function findWordDuplicate(word, checkDupArr) {
  if (checkDupArr.includes(word)) {
    return false;
  }
  checkDupArr.push(word);
}

function findWordLine(wordArr, checkLineArr, index) {
  const wordArrLastIndex = wordArr.length - 1;
  const checkLineArrLastIndex = checkLineArr.length - 1;

  if (index !== 0 && checkLineArr[checkLineArrLastIndex] !== wordArr[0]) {
    return false;
  }
  checkLineArr.push(wordArr[wordArrLastIndex]);
}

function solution(n, words) {
  const checkDupArr = [];
  const checkLineArr = [];
  let index = 0;

  for (index; index < words.length; index++) {
    const wordArr = words[index].split(``);
    if (findWordLength(wordArr) === false) {
      console.log("asdd");
      return findFailPerson(index, n);
    }
    if (findWordDuplicate(words[index], checkDupArr) === false) {
      return findFailPerson(index, n);
    }
    if (findWordLine(wordArr, checkLineArr, index) === false) {
      console.log("Ads");
      return findFailPerson(index, n);
    }
    console.log(wordArr);
  }
  return [0, 0];
}

```
이때는 뭔가..함수를 나누는데 심취해있었던 거 같다.. 결과적으로 이렇게 나눴던 부분이 더 좋지 않은 효율을
만들었다. 하지만 이때의 내 코드도 꽤 마음에 든다! 생각보다 길어서 당황했지만 하나하나 보다보니
어떤 역할을 하는 함수인지 보이긴한다.ㅎㅎㅋㅋ

아래는 오늘 새롭게 푼 풀이이다.

```js
function solution(n, words) {
  const check = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].length === 1) {
      return [(i % n) + 1, Math.ceil((i + 1) / n)];
    }

    if (check.includes(words[i])) {
      return [(i % n) + 1, Math.ceil((i + 1) / n)];
    }
    const checkLastIndex = check.length - 1;

    check.push(words[i]);

    if (i > 0) {
      if (
        check[checkLastIndex].charAt(check[checkLastIndex].length - 1) !==
        words[i].charAt(0)
      ) {
        return [(i % n) + 1, Math.ceil((i + 1) / n)];
      }
    }
  }
  return [0, 0];
}
```
함수를 나누지 않았을 뿐 과정은 비슷하다.

논리는 이렇다. 

1. 이전에 등장했던 단어를 찾는 조건문이 필요
 - 배열을 includes 함수로 확인하면 되겠다.
 2. 이어지지않는 단어 찾는 조건문이필요
 - stack 처럼 배열을 순회하며 stack arr에 넣어  stack arr의 마지막 인덱스 값과 for문 i 인덱스의 값을 비교하면되겠다.
 3. 한 글자인지를 찾는 조건문이 필요
 - for문 속에서 length를 거르는 조건문이 필요
 
 그리고 Math.ceil,charAt 등으로 디테일한 부분을 구현하였다.
 
 다른 분들이 푼 풀이를 보니 slice로 푼 풀이가 많이 보였다. 그래서 간단하게
 slice와 splice를 비교하여 학습해보았다.
 
 ### splice vs slice
 
 - slice 
 slice 메소드는 시작부터 끝까지를 프로퍼티로 받아 새로운 배열을 반환한다. 
 ~~_이때, 원본 배열은 수정되지 않는다!! _~~
 
 -splice
 splice 메소드는 기존의 배열을 삭제 또는 추가가 가능하다.
 ~~_즉 원본배열은 수정된다._~~
 splice(시작인덱스,제거할 요소의 수 , 추가할 요소)
  
```js
let arr =[1,2,3,4]

const arr2 = arr.splice(0,2,"5")

console.log(arr) //[3,4,5]
console.log(arr2) //[1,2]

 ```
 즉 원본은 잘려나가고 또, 잘려나간 부분은 새로운 변순에 할당하여 가져올 수 있다.
 대신 splice는 효율적으로 꽤 불리하다
 
 ## 구명보트
 
 이 문제는 저번에 풀었을 때 실패했었다. 그래서 다른 분들이 풀어놓은 코드를 보고 학습했었는데
 기억이 잘 나지않아.. 이번에도 헤멨다..
 문제를 제대로 읽지 않아서 더욱 더 헤멨다..
 
 문제는 다음과 같다.
 
 ![](https://velog.velcdn.com/images/tkdgk1996/post/1755bc0e-017b-47f4-aa6f-acb9f94c15cf/image.png)
 
 위에 최대 2명씩인 것을 빼먹고 혼자 아주 골머리를 앓았다..
 역시 문제를 꼼꼼히 읽어보는 자세가 중요하다..
 처음 저 문제를 봤을 때 그냥 최대한 많이 태우는게 중요하니까 몸무게가 조금 나가는 사람을
 최대한 태우고 몸무게가 많이 나가는 사람은 1명씩 태우면 되지않나? 라는 생각을 했다.
 
 내 논리는 이랬다.
 1. sort메서드를 이용하여 몸무게가 작은 순서대로 정렬하고 앞에서부터 더해
 2. limit를 넘어서면 그때 count를 하는 방법
 
 근데 이 방법은 완전히 잘못됐다..
 
 사실 최대한 limit에 근접하게 태워야 가장 적은 횟수로 사람들을 옮길 수 있다. 
 
 그렇게 하기 위해서 문제는 2명만 태울 수 있다고 친절하게 설명해준다.
 
 그렇다면 가장 몸무게가 적은사람과 가장 많이나가는 둘을 합쳤을 때 limit에 가장 근접할 것이다! 
 
 30,40,60,70 이고 limit이 100이라면
 
 sort를 한 뒤 맨 앞 요소와 맨 뒤 요소가 limit 을 넘어가지 않는다면 pop, shift로 배열을 변경하고
 반복문을 초기화하면된다.
 
 코드는 다음과 같다! 
 
 ```js
function solution(people, limit) {
  let Arr = people.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < people.length; i++) {
    if (Arr[0] + Arr[Arr.length - 1] <= limit) {
      Arr.pop();
      Arr.shift();
      i = 0;
      count = count + 1;
    } else if (Arr[0] + Arr[Arr.length - 1] > limit) {
      Arr.pop();
      i = 0;
      count = count + 1;
    }
  }
  return count + Arr.length;
}
```
 양쪽을 비교 후 limit 이 넘으면 shift만
 넘지않으면 pop과 shift를 사용하면된다! 
 
 아쉬운 점은 for문 보다는 while 문이 더 적합했을 거 같아 코드를 다시 구성해보았다.
 
 ```js
function solution(people, limit) {
  let Arr = people.sort((a, b) => a - b);
  let count = 0;
  while(Arr.length<2){
    if (Arr[0] + Arr[Arr.length - 1] <= limit) {
      Arr.pop();
      Arr.shift();
    } else if (Arr[0] + Arr[Arr.length - 1] > limit) {
      Arr.pop();
    }
  count = count + 1;
  }
  return count + Arr.length;
}
```
이렇게 while 문을 사용하면 i를 초기화해주지않아도 된다!! 

다른 분들의 코드도 보통 이런 논리로 문제를 해결했다.

## 카펫

![](https://velog.velcdn.com/images/tkdgk1996/post/250c15ab-7e7a-4af6-9ece-43e6b0bdf6d8/image.png)

이 문제는 완전탐색 카테고리로 분류되어 있었다. 완전 탐색이란 반복문을 사용하여 말 그대로 경우의 수를 구하는 문제이다. 
필자는 이 문제에서 구해야 하는 것은 전체 카펫의 가로길이와 세로길이임을 알고
규칙이 있을 거란 생각을 했다. 내가 발견한 규칙은 다음과 같다.

> 1. x, y를 사용한 연립방정식으로 풀수있겠다.
2. 여기서 x는 yellow의 가로길이 y는 yellow의 세로길이이다.
3. x+y = (brown-4)/4
4. xy = yellow 

즉, yellow의 가로길이와 세로길이를 알게 되면 전체 카펫의 가로, 세로길이는

yellow가로 +2 , yellow세로 +2 

가 될 것이다!

그렇게 내가 생각한 코드는 

```js
function solution(brown, yellow) {
  const plus = (brown - 4) / 2;
  let x = 0;
  let y = 0;
  for (let i = 1; i <= plus; i++) {
    y = plus - i;
    //y = plus-x
    if (i * y === yellow) {
      //xy= yellow
      x = i;
      break;
    }
  }
  return [x + 2, y + 2].sort((a, b) => b - a);
}
```
저번 시간에 학습해두었던 let의 재할당에 대한 개념을 사용하니 풀이가 이 전보다 더 간결해진거 같다.

const , let , var에 대한 설명은 (2)에 정리해놓았다.

또, 다른 분들의 코드를 보니 Math.sqrt와 Math.pow를 사용하신 분이 많이 계셔서 이 두 메서드에 대한 정리를 해보았다.

### Math.sqrt
위 메서드는 number 에 루트를 씌워주는 메서드이다.

사용법은 다음과 같다.

```js
console.log(Math.sqrt(36))
//return 6

```

### Math.pow
위 메서드는 number에 제곱근을 시켜주는 메서드이다.

사용법은 다음과 같다.

```js
console.log(Math.pow(2,3))
//return 8
```

## 예상대진표

예상 대진표 문제는 그냥 월드컵에서 D조에 있는 팀을 몇번째에 만날 수 있나!! 

이 말과 동일했다. 최근 월드컵을 보면서 혼자 생각을 해본적이 있어서 로직을 더 쉽게 짤 수 있었다.

저번에 풀었을 때는 사실 해결하지 못해 질문하기에 있는 답을 긁어왔던 기억이 난다.

이번에는 좀 더 생각을 해보니 다음과 같은 logic을 생각할 수 있었다.

> 1,2 3,4 5,6 7,8

위 모두 조로 생각을 했을 때 1조 2조=> 1조로, 3조4조는=> 2조로 5조6조 => 3조, 7조8 => 4조로 

결국 이건 2로 나눈 몫에 올림을 한 결과같이 같아야 경기때 만나는 구나 라고 생각을 했다.

```js
let n = 8;
let a = 4;
let b = 7;

function solution(n, a, b) {
  let count = 0;
  while (true) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    count = count + 1;
    if (a === b) {
      return count;
    }
  }
}
```

다른 분들의 코드도 위와 같은 로직으로 해결을 했다!!🔥🔥🔥

## N개의최소공배수

위 문제는 배열로 숫자가 주어졌을 때 이 들의 최소 공배수를 구하면 된다.

결국, 가장 큰 수를 나머지 배열원소로 나누었을 때 모두 나머지가 0일 때 그때의 가장 큰 수의 배수가 
최소 공배수가 된다.

logic은 다음과 같다.
> 1. 배열의 최대값을 꺼내온다. (Math.max 함수를 이용)
2. 최대값을 제외한 하나의 배열을 만든다.
3. 만든 배열을 순회하며 최대값을 나눈다.
4. 나머지가 0이 아닌게 있다면ㅁ 최대값에 최대값을 더 한후 처음부터 순회한다.
5. 만약 모두 나머지가 0이라면 그때의 최대값을 리턴한다.

```js
function solution(arr) {
  const Max = Math.max(...arr);
  let plusMax = Math.max(...arr);
  //한 번 더 같은 값을 다른 변수에 저장한 이유는
  //plusMax는 계속 변해야하지만 Max값은 고정되어야하기때문이다.
  let check = [];

  const filterArr = arr.filter((item) => item !== Max);
  // 최대값을 제외한 하나의 배열을 만든다.
  while (true) {
    check = filterArr.filter((item) => plusMax % item === 0);
    //for문으로 i를 리셋하는 형식으로하면 더 효율을 높일 수 있을 거 같다.
    if (check.length === filterArr.length) {
      return plusMax;
    }
    plusMax = plusMax + Max;
  }
}
```
