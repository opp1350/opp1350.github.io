---
title: 알고리즘 - node.js로 자바스크립트 알고리즘 풀기
date: 2022-02-15T06:53:02.845Z
description: 값을 입력 받기 위한 설정 메모 (계속 추가 예정)
tags:
  - 개발
  - 알고리즘
---
백준에는 자바스크립트가 없으므로 언어를 node.js로 설정한 뒤 문제를 풀어야 한다. 

그리고 값을 입력 받기 위한 설정을 따로 해줘야 하는데 매번 찾기 번거로우니 여기에 하나하나 추가하며 정리를 하겠다. 

```
const fs = require('fs');
// 하나의 값만 입력 받을 때
const input = fs.readFileSync('/dev/stdin').toString().trim();

// n개의 값을 한줄로 입력 받을 때
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' '); 

// 2개의 값을 각각 한줄에 입력 받을 때
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// n개의 값을 2줄 이상으로 받을 때
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const firstLineVal = input[0].split(' '); 
const a = firstLineVal[0];
const b = firstLineVal[1];
const c = input[1]; // 2번째 줄의 필요값이 1개일 경우
```