---
title: 알고리즘  - 4344번 (+reduce)
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

정녕 다른 방법은 없는 것인지? 다른 답변을 조금 찾아보았는데, 많은 사람들이 for문과 reduce()를 함께 사용했다는  것을 알았다. 

배열의 총 합을 구할 때 for문을 용하는 것도 나쁘지 않지만,

줄을 좀 줄이고 싶거나, 위처럼 이미 for문을 많이 사용했을 때, 혹은 for문 특유의 (let i = 1 ; i <= n; i++) 코드가 가독성이 떨어진다고 생각할 때... 등등 여러 이유로 리듀서(reducer) 함수를 사용하기도 한다.

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

reduce()는 많은 사람들이 즐겨 사용하는 메서드이지만 개인적으로 이해가 부족하여 사용을 자제하고 있었다.

이 기회에 모질라 문서를 보며 조금 자세히 이해하는 시간을 가져보려 한다. 

\========

## reduce

배열의 각 요소에 실행할 콜백 함수는 총 4개의 매개변수를 받고, 그 외에는 초기 값(initial value)을 설정할 수 있다.

콜백함수의 매개변수는 순서대로 다음과 같다.

* Accumulator (누산 값) : 콜백의 반환 값을 누적한다. 만약 초기 값이 따로 설정되지 않았을 경우, 누산 값은 배열의 첫번째 요소로 시작하고, 초기 값이 있는 경우 최초의 누산 값 초기 값과 동일하다. 

  줄여서 쓰면 acc인데, pre라고도 많이 쓰이는 듯 하다.
* Current value : 현재 처리하는 값이다.
* Current Index : 현재 처리하는 값의 인덱스. 여기서 헷갈리지 말아야할 것은 배열의 인덱스와는 다르다. 초기 값(initial value)이 인덱스 0이기 때문에 초기 값을 지정하지 않았다면 인덱스는 1부터 시작한다. 
* Array : reduce를 호출한 배열이다. 

초기 값은 다음과 같다. 

* 초기 값(initial value) : 최초 콜백에서 첫 번째로 제공하는 값. 제공하지 않는다면 배열의 첫 번째 요소를 사용하게 된다. 만약 reduce를 호출한 배열에 값이 없고, 초기 값도 없는 경우 타입 에러가 발생한다. 

  모질라 문서에서는 이러한 오류 발생을 방지하기 위해 초기 값을 지정하기를 권고하고 있다. 

```javascript
let scores = [24, 15, 12, 90, 100];

// reduce
let scoreAdd = scores.reduce((acc,cur,idx,array)=>{
  console.log(`acc: ${acc}, cur: ${cur}, idx: ${idx}, array: ${array}`)
  return acc + cur;
});
console.log(scoreAdd); // 총 합 출력

// console
// "acc: 24, cur: 15, idx: 1, array: 24,15,12,90,100"
// "acc: 39, cur: 12, idx: 2, array: 24,15,12,90,100"
// "acc: 51, cur: 90, idx: 3, array: 24,15,12,90,100"
// "acc: 141, cur: 100, idx: 4, array: 24,15,12,90,100"
// 241

```

위의 코드를 살펴보자. 초기 값이 없어서 최조 누산 값(acc)은 24가 되고, **(주의 0이 아님!)** index 또한 1부터 시작한다.

여기서 초기 값을 준다면 어떻게 변화할까? 아래의 코드와 비교해보자. 

```javascript
let scores = [24, 15, 12, 90, 100];

// reduce
let scoreAdd = scores.reduce((acc,cur,idx,array)=>{
  console.log(`acc: ${acc}, cur: ${cur}, idx: ${idx}, array: ${array}`)
  return acc + cur;
}, 10); // <= 초기 값
console.log(scoreAdd); // 총 합 출력

// console
// "acc: 10, cur: 24, idx: 0, array: 24,15,12,90,100"
// "acc: 34, cur: 15, idx: 1, array: 24,15,12,90,100"
// "acc: 49, cur: 12, idx: 2, array: 24,15,12,90,100"
// "acc: 61, cur: 90, idx: 3, array: 24,15,12,90,100"
// "acc: 151, cur: 100, idx: 4, array: 24,15,12,90,100"
// 251
```

위에서 정리한 내용대로, 초기 값의 인덱스는 0, 최초의 누적 값은 초기 값과 동일하다는 것을 알 수 있다. 총 합의 값 또한 초기 값인 10만큼 더해진 숫자가 출력되었다.  



이렇게 콘솔로 찍어보니 reduce가 어떤 방식으로 배열의 값이 누적하는지 알 수 있었다. 

배열의 값을 누적 하는 것 외에도 좀 더 복잡하고 다양한 계산을 할 수 있는 것 같으니 적극적으로 활용해 볼 수 있는 기회가 되었으면 좋겠다.