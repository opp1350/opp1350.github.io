---
title: 알고리즘 - 백준 2439
date: 2022-02-17T00:32:38.815Z
description: 중첩 for문
tags:
  - 개발
  - 알고리즘
---
중첩 for문이 오랜만에 헷갈려서 작성함.. 기본적인 구구단 출력 방식 생각하면 된다.

```javascript
const input = require('fs').readFileSync('/dev/stdin').toString().trim();

const num = Number(input);

// num 만큼 반복
// 초기값 1
for(let i = 1; i <= num; i++) {
    let result = '';
  // num만큼 반복, 초기값 3
    for (let j = num; j >= 1; j--) {
      // 초기값을 기준으로,
      // j = 3, i = 1 임으로 ' '
      // j = 2, i = 2 임으로 ' '
      // j = 1, i = 3 임으로 '*'
        result += j <= i ? '*' : ' ';
    }
    console.log(result);
}
```