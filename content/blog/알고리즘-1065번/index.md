---
title: 알고리즘  - 1065번
date: 2022-03-01T13:02:17.679Z
description: 한수 구하기 (javascript)
tags:
  - 개발
  - 알고리즘
---
## 문제

어떤 양의 정수 X의 각 자리가 등차수열을 이룬다면, 그 수를 한수라고 한다. 등차수열은 연속된 두 개의 수의 차이가 일정한 수열을 말한다. N이 주어졌을 때, 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력하는 프로그램을 작성하시오. 

## 입력

첫째 줄에 1,000보다 작거나 같은 자연수 N이 주어진다.

## 출력

첫째 줄에 1보다 크거나 같고, N보다 작거나 같은 한수의 개수를 출력한다.



\==================

## 풀이 및 답



문제가 이해되지 않았다. 아래 QnA를 보고 문제를 이해함.

<https://www.acmicpc.net/board/view/25689>

예를 들어 1234라는 숫자가 있으면, 1 / 2 / 3 / 4 가 일정한 수열(-1)을 가지고 있으므로 한수가 된다.

1~99까지의 수는 전부 한수이다. 

따라서 100부터 1000까지의 한수를 구하는 것이 중요한데, 1000은 어차피 한수가 아니므로 999까지의 세자리 숫자만 고려하면 된다. 

(첫번째 자리의 수 - 두번째 자리의 수) === (두번째 자리의 수 - 세번째 자리의 수) 라는 조건을 만족하면 한수이다.

예를 들어 135라는 수가 주어졌다고 가정 했을 때, 1 / 3 / 5 가 각각 -2의 일정한 수열을 가졌으므로 한수로 판단한다. 

1 - 3 (-2) === 3 - 5 (-2)

```javascript
const input = require('fs').readFileSync('/dev/stdin').toString().trim();

const number = Number(input);
let result = 0;

const calcResult = (num) => {
    for(let i = 1; i <= num; i++){
        let _num = i.toString(); // length 계산을 위함
        if(i < 100) result++;
        else if(100 <= i && i < 1000) {
            let a = Number(_num[0]) - Number(_num[1]);
            let b = Number(_num[1]) - Number(_num[2]);
            if (a === b) result++;
        }
    }
};
calcResult(number); // 실행
console.log(result); // 결과 출력
```