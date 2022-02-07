---
title: Javascript - 호이스팅
date: 2022-02-07T02:34:07.662Z
description: Javascript - 호이스팅에 대해 정리했던 문서를 노션에서 블로그로 옮겼습니다.
tags:
  - 개발
---
## 호이스팅이란?

Hoisting은 “게양하다”(높이 걺) 라는 의미의 단어이며, Mozilla에서 제공하는 JavaScript 호이스팅에 대한 설명을 첨부한다.

> JavaScript에서 **호이스팅**(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미합니다. `var`로 선언한 변수의 경우 호이스팅 시 `undefined`로 변수를 초기화합니다. 반면 `let`과 `const`로 선언한 변수의 경우 호이스팅 시 변수를 초기화하지 않습니다.
>
> 호이스팅을 설명할 땐 주로 "변수의 선언과 초기화를 분리한 후, 선언만 코드의 최상단으로 옮기는" 것으로 말하곤 합니다. 따라서 변수를 정의하는 코드보다 사용하는 코드가 앞서 등장할 수 있습니다.

여기서 var와 let, const의 차이가 발생한다. 

var는 선언문이 순서상 아직 등장하지 않은 상태이더라도 사용할 수 있다. 즉 호이스팅이 일어나면서 `undefined`로 변수를 초기화한다는 이야기인데, 아래의 코드에 자세한 내용을 작성하였다. 

```jsx
console.log(name); // undefined 
var name = 'mike';
```

위와 같이 name 이라는 이름의 변수를 뒤늦게 선언했음에도 console에 에러가 나지 않는다. 하지만 mike라는 할당 값이 반영이 되지 않은 상태로 초기화되어 undefined가 뜬다.

이는 `var` 가 아래와 같이 최상위로 끌어올려진 것처럼 동작하기 때문이다. 이를 **호이스팅**이라고 한다. 

```jsx
var name; // 호이스팅 됨
console.log(name); // undefined 
name = 'mike';
```

## let과 const는 호이스팅이 일어나지 않는다?

여기서 많은 사람들이 `let`과 `const`는 `var`와 달리 호이스팅되지 않는다고 이야기하지만... 호이스팅이 된다. 

다만 `let`과 `const`는 `var`와 다르게 TDZ(Temporal Dead Zone)의 제약을 받고 있어 레퍼런스에러를 출력하는 것이다.

호이스팅은 스코프(Scope) 단위로 일어나는데, 변수가 전역선언이 되었는지, 지역선언이 되었는지에 따라 다르게 일어난다. 아래의 함수는 문제 없이 동작한다.

왜냐하면 age라는 전역선언 변수를 showAge에서 참조하고 있기 때문이다.

```jsx
let age = 30;
function showAge() {
    console.log(age);
}
showAge(); // 문제 없이 30을 찍음
```

하지만 아래와 같이 변경할 경우에는 에러가 발생한다. 

```jsx
let age = 30;
function showAge() {
    console.log(age); // age가 console 아래에 선언되어 있음 (함수 내부 지역변수)
    let age = 20;
}
showAge(); // error
```

## 변수의 생성과정

변수는 선언단계, 초기화단계, 할당단계의 세가지 생성과정을 가진다.

**`var`**같은 경우 선언 및 초기화 단계를 동시에 가지기 때문에 에러가 나지 않는다. (하지만 위에서 적은 것과 같이 초기화되어 undefined 출력)

하지만`let`은 선언단계, 초기화단계가 분리되어있기 때문에, 선언이 먼저 되어도 초기화단계는 실제 코드에 도달했을 때 일어나기 때문에 레퍼런스에러가 발생한다. 

`const`같은 경우 선언단계, 초기화단계, 할당단계를 동시에 진행한다. let이나 var는 선언한 후에 할당을 따로 해도 에러가 나지 않지만 const는 선언과 동시에 값을 함께 할당해야한다.

```jsx
let name;
var age; 
age = 30; // => 문제 없음
name = 'mike'; // => 문제 없음

const gender;
gender = 'male'; // => 에러 발생
```

## 스코프

var는 함수스코프이고,

let과 const는 블록스코프이다.

var는 함수스코프이기 때문에 함수(function)를 제외한 그 외의 블록(if, for, while, try, catch 등)에서 선언했을 경우 어디에서나 출력이 가능하다.

반면 let과 const는 블록스코프이기 때문에 함수를 포함한 if, for, while, try, catch 문 등, 블록에서 선언했을 경우 해당 블록에서만 사용이 가능하다.

아래와 같이 if문 내부에서 var로 선언한 변수는 if문 바깥에서 사용이 가능하다. let과 const는 사용이 불가하다. 

```jsx
if(age>19) {
   var txt = '성인';
   let txt2 = '성인2';
   const txt3 = '성인3';
}
console.log(txt); // 성인
console.log(txt2); // error
console.log(txt3); // error

// 하지만 함수 내부에서 선언되었을 경우 외부에서 출력할 수 없다.
function testFunc (n1, n2) {
   var result = n1 + n2;
}
add(1,2);
console.log(result); // error
```

\================================

1. 인터프리터(interpreter) : 프로그래밍 언어의 소스 코드를 바로 실행하는 컴퓨터 프로그램 또는 환경을 의미하며 컴파일러 언어와 반대되는 의미인 경우 코드를 한 줄씩 읽어 내려가며 실행하는 프로그램을 뜻한다. 
2. 스코프 : 변수가 접근할 수 있는 범위라는 의미를 가진다. “만약 **변수** 또는 다른 표현식이 "해당 스코프"내에 있지 않다면 사용할 수 없다. 스코프는 또한 계층적인 구조를 가지기 때문에 하위 스코프는 상위 스코프에 접근할 수 있지만 반대는 불가하다.”