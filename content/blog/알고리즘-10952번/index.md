---
title: 알고리즘  - 10952번
date: 2022-02-19T12:25:25.202Z
description: while문을 사용하여 더한 값을 구하기 (javascript)
tags:
  - 개발
  - 알고리즘
---
## 문제

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

## 입력

입력은 여러 개의 테스트 케이스로 이루어져 있다.

각 테스트 케이스는 한 줄로 이루어져 있으며, 각 줄에 A와 B가 주어진다. (0 < A, B < 10)

입력의 마지막에는 0 두 개가 들어온다.

## 출력

각 테스트 케이스마다 A+B를 출력한다.



```javascript
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const inputLegth = input.length;
let i = 0;

// 참일때만 반복, 거짓이면 끝
while (i !== inputLegth - 1) {
    const numbers = input[i].split(" ");
    if (+numbers[0] + +numbers[1] === 0) {
        break;
    } else {
        console.log(+numbers[0] + +numbers[1]);
        i++;
    }
}
```



while문을 평소에 잘 사용하지 않다 보니 갑자기 헷갈렸다....

여태 풀었던 문제들은 풀이가 비슷비슷했던 것 같은데, 이 문제는 사람마다 푸는 방식의 차이가 있어서 구경하는 재미가 있었다.