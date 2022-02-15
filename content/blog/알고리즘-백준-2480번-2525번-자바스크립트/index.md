---
title: 알고리즘  - 백준 2480번, 2525번 자바스크립트
date: 2022-02-15T11:40:40.861Z
description: 풀이
tags:
  - 개발
  - 알고리즘
---
### 2480번

1에서부터 6까지의 눈을 가진 3개의 주사위를 던져서 다음과 같은 규칙에 따라 상금을 받는 게임이 있다. 

1. 같은 눈이 3개가 나오면 10,000원+(같은 눈)×1,000원의 상금을 받게 된다. 
2. 같은 눈이 2개만 나오는 경우에는 1,000원+(같은 눈)×100원의 상금을 받게 된다. 
3. 모두 다른 눈이 나오는 경우에는 (그 중 가장 큰 눈)×100원의 상금을 받게 된다.  

예를 들어, 3개의 눈 3, 3, 6이 주어지면 상금은 1,000+3×100으로 계산되어 1,300원을 받게 된다. 또 3개의 눈이 2, 2, 2로 주어지면 10,000+2×1,000 으로 계산되어 12,000원을 받게 된다. 3개의 눈이 6, 2, 5로 주어지면 그중 가장 큰 값이 6이므로 6×100으로 계산되어 600원을 상금으로 받게 된다.

3개 주사위의 나온 눈이 주어질 때, 상금을 계산하는 프로그램을 작성 하시오.

```
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const a = input[0];
const b = input[1];
const c = input[2];

const calcFunc = (a, b, c) => {
    if (a == b && b == c) {
        console.log(10000+(a*1000));
    } else if (a == b || a == c || b == c) {
        a == b || a == c ? console.log(1000+(a*100)) : console.log(1000+(b*100));
    } else {
        const sortArr = input.sort();
        console.log(sortArr[2]*100); // 혹은 .pop()
    }
}

calcFunc(+a, +b, +c);
```



### 2525번

KOI 전자에서는 건강에 좋고 맛있는 훈제오리구이 요리를 간편하게 만드는 인공지능 오븐을 개발하려고 한다. 인공지능 오븐을 사용하는 방법은 적당한 양의 오리 훈제 재료를 인공지능 오븐에 넣으면 된다. 그러면 인공지능 오븐은 오븐구이가 끝나는 시간을 분 단위로 자동적으로 계산한다. 

또한, KOI 전자의 인공지능 오븐 앞면에는 사용자에게 훈제오리구이 요리가 끝나는 시각을 알려 주는 디지털 시계가 있다. 

훈제오리구이를 시작하는 시각과 오븐구이를 하는 데 필요한 시간이 분단위로 주어졌을 때, 오븐구이가 끝나는 시각을 계산하는 프로그램을 작성하시오.

```
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let hour = input[0].split(" ")[0];
let min = input[0].split(" ")[1];
let time = input[1];

solution(+hour, +min, +time);

function solution(hour, min, time) {
    min += time;
 
    while (min >= 60){
        min -= 60;
        hour += 1;
    }
 
    hour %= 24;
    console.log(hour, min);
}
```



\=> 그런데 이렇게 작성하면 조리 시간을 120분 이상으로 입력할 경우엔 출력 값이 제대로 안나올 것 같은데... ? ???