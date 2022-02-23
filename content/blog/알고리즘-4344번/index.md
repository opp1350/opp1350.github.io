---
title: 알고리즘  - 4344번
date: 2022-02-23T14:59:17.259Z
description: 부제는 reduce에 대해 이해하기
tags:
  - 개발
  - 알고리즘
---
## 문제

대학생 새내기들의 90%는 자신이 반에서 평균은 넘는다고 생각한다. 당신은 그들에게 슬픈 진실을 알려줘야 한다.

## 입력

첫째 줄에는 테스트 케이스의 개수 C가 주어진다.

둘째 줄부터 각 테스트 케이스마다 학생의 수 N(1 ≤ N ≤ 1000, N은 정수)이 첫 수로 주어지고, 이어서 N명의 점수가 주어진다. 점수는 0보다 크거나 같고, 100보다 작거나 같은 정수이다.

## 출력

각 케이스마다 한 줄씩 평균을 넘는 학생들의 비율을 반올림하여 소수점 셋째 자리까지 출력한다.

\================

아래는 나의 답변이다. 답이 맞기는 한데 뭔가 썩 아름답지 않아 보인다. 일단 for문 안에 똑같은 조건의 for문이 두 개나 들어가 있다.

정녕 다른 방법은 없는 것인지? 다른 사람의 답변을 조금 찾아보았다.  

```javascript
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const testNum = Number(input[0]); // 테스트 케이스의 수

for(let i = 1 ; i <= testNum; i++) {
    let arr = input[i].split(" ").map(Number);
    let scoreAdd = 0; // 평균 점수
    let count = 0; // 평균 점수 이상인 학생의 수
    for(let j = 1; j <= arr[0]; j++) {
        scoreAdd += arr[j];
    }
    let average = scoreAdd/arr[0]; // 평균 점수 계산
    
    for(let j = 1; j <= arr[0]; j++) {
        if(arr[j] > average) {
            count++;
        }
    }
    console.log(`${(count/arr[0]*100).toFixed(3)}%`);
}
```



배열 안 숫자의 총 합을 구하기  for문을 이용할 수 있겠지만, 리듀서(reducer) 함수를 실행하는 방법이 있다.

```javascript
let arr = input[i].split(" ").map(Number);

// for문
for(let j = 1; j <= arr[0]; j++) {
    scoreAdd += arr[j];
}

// reducer
let scores = arr.shift(); // 대신 점수만 있는 배열이 필요
let scoreAdd = scores.reduce((pre,cur)=>{return pre + cur})

// => scoreAdd의 값은 같음
```



사실 reduce()는 정말 많이 들어보았고, 또 많은 사람들이 즐겨 사용하는 메서드이지만 개인적으로 이해가 부족하여 사용을 자제하고 있었다. 이 기회에 모질라 문서를 보며 조금 자세히 이해하는 시간을 가져보려 한다. 



\========

24일에 이어서 작성 예정