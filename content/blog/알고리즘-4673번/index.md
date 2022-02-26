---
title: 알고리즘  - 4673번
date: 2022-02-26T10:57:00.520Z
description: 셀프넘버 구하기 (javascript)
tags:
  - 개발
  - 알고리즘
---
## 문제

셀프 넘버는 1949년 인도 수학자 D.R. Kaprekar가 이름 붙였다. 양의 정수 n에 대해서 d(n)을 n과 n의 각 자리수를 더하는 함수라고 정의하자. 예를 들어, d(75) = 75+7+5 = 87이다.

양의 정수 n이 주어졌을 때, 이 수를 시작해서 n, d(n), d(d(n)), d(d(d(n))), ...과 같은 무한 수열을 만들 수 있다. 

예를 들어, 33으로 시작한다면 다음 수는 33 + 3 + 3 = 39이고, 그 다음 수는 39 + 3 + 9 = 51, 다음 수는 51 + 5 + 1 = 57이다. 이런식으로 다음과 같은 수열을 만들 수 있다.

33, 39, 51, 57, 69, 84, 96, 111, 114, 120, 123, 129, 141, ...

n을 d(n)의 생성자라고 한다. 위의 수열에서 33은 39의 생성자이고, 39는 51의 생성자, 51은 57의 생성자이다. 생성자가 한 개보다 많은 경우도 있다. 예를 들어, 101은 생성자가 2개(91과 100) 있다. 

생성자가 없는 숫자를 셀프 넘버라고 한다. 100보다 작은 셀프 넘버는 총 13개가 있다. 1, 3, 5, 7, 9, 20, 31, 42, 53, 64, 75, 86, 97

10000보다 작거나 같은 셀프 넘버를 한 줄에 하나씩 출력하는 프로그램을 작성하시오.

## 입력

입력은 없다.

## 출력

10,000보다 작거나 같은 셀프 넘버를 한 줄에 하나씩 증가하는 순서로 출력한다.

\===========================

## 풀이

슬슬 혼자 풀기 버겁다. 이번 문제는 뇌가 돌아가지 않아서 다른 분들의 풀이를 접하고 나서야 이해할 수 있었다.

풀이들은 사람마다 상이하지만 공통적으로 2가지의 함수가 필요하다. 

1. 생성자가 있는(= 셀프넘버가 아닌) 숫자를 구하는 함수
2. 위의 함수를 이용해 셀프넘버를 구하는 함수

일단 1) 함수를 작성해보자. 

받은 숫자를 문자열로 변경한 뒤 for문을 이용하여 계산할 수도 있고, if문으로 10, 100, 1000, 10000 단위별 조건을 걸어가며 계산하는 방법도 있으나 내가 생각하지 못한 깔끔한 방법이 있어서 참고해 보려고 한다. 

```javascript
const arr = []; // 값을 넣을 빈 배열을 준비

const notSelfNumber = (num) => {
  let addNum = num; // 더한 값을 담는 변수 (결과 값)
  while (true) {
    if (num === 0) break; // num이 0이 되면 반복문 중단
    console.log(`최초 addNum : ${addNum}`);
    addNum += num % 10; // 1의 자리 더하기
    num = Math.floor(num / 10); // num을 10으로 나눠가며 각 자릿수를 계산한다.
    console.log(`num : ${num}, addNum : ${addNum}`);
  }
  arr[addNum] = addNum; 
  // 빈 배열의 index [addNum] 자리에 결과 값이 담긴다.
};
```

어떻게 작동하는지 보자. 

```javascript
notSelfNumber(1234); // 예시값 입력

// "최초 addNum : 1234"
// "num : 123, addNum : 1238"
// "최초 addNum : 1238"
// "num : 12, addNum : 1241"
// "최초 addNum : 1241"
// "num : 1, addNum : 1243"
// "최초 addNum : 1243"
// "num : 0, addNum : 1244"
```

값이 담기는 배열 콘솔에 찍어보았다. 10을 notSelfNumber 함수의 인자로 전달하면 빈 배열의 11번째 index에 11이 들어간다. 11보다 작은 인덱스에는 아직 값이 들어가지 않았으므로 undefined가 출력된다.

```javascript
notSelfNumber(10); // 10 + 1 + 0 => 11
console.log(arr);

//[undefined, undefined, undefined, undefined,
// undefined, undefined, undefined, undefined,
// undefined, undefined, undefined, 11]
```

이렇게 이 함수에 1부터 10000까지의 숫자를 넣어서 계산하면 셀프넘버가 아닌 값(생성자가 있는 숫)이 들어간 array를 만들 수 있다. 셀프넘버와 동일한 인덱스에는 undefined가 들어가 있을 것이다. 

2. 이제 이 값을 이용해서 1~10000사이의 셀프넘버를 구해보자.

```javascript
const selfNumber = () => {
    for (let i = 1; i <= 10000; i++) {
      notSelfNumber(i);
      if (arr[i] === undefined) {
        console.log(i);
      };
    };
};

selfNumber(); // => 셀프넘버라면 출력
```

제출 답변은 이러하다. 

```javascript
const arr = [];

const notSelfNumber = (num) => {
  let addNum = num;
  while (true) {
    if (num == 0) break;
    addNum += num % 10;
    num = Math.floor(num / 10);
  }
  arr[addNum] = addNum;
}

const selfNumber = () => {
    for (let i = 1; i <= 10000; i++) {
      notSelfNumber(i);
      if (arr[i] === undefined) {
        console.log(i);
      };
    };
};

selfNumber();
```