---
title: String을 Number로 바꾸는 여러가지 방법 정리
date: 2022-02-20T14:12:49.070Z
description: "Number, parseInt, 연산자 사용하기 "
tags:
  - 개발
---
## String to Number

알고리즘 문제를 풀면서 문자열을 숫자로 변경해야 하는 경우가 많았는데, 방법이 생각보다 다양했다. 

나는 보통 Number를 많이 이용하지만, parseInt도 굉장히 많이 쓰인다. 또 간편하게 문자 앞에 + 연산자를 붙여서 변경하는 사람도 있다. (이 방법을 알게 되었을 때 굉장히 신기했다... ) 각각의 차이점이 무엇인지 정리를 하려고 한다.

### 1) Number vs parseInt

#### 간단히 눈에 보이는 둘의 큰 차이

만약 문자열(예: "1234")이 **숫자**로만 구성되어 있다면 Number를 사용하든 parseInt를 사용하든 같은 결과(예: 1234)를 출력할 것이다.

그런데 문자열에 숫자가 아닌 문자(예: "~입니다.")가 섞여 있다면 Number는 NaN(숫자가 아님, Not-A-Number)를 반환하는 반면, parseInt은 앞의 숫자(정수) "1234"만을 골라 숫자로 반환한다.  

```javascript
let test = "1234"
let test2 = "1234입니다."

console.log(Number(test)); // 1234
console.log(parseInt(test)); // 1234

console.log(Number(test2)); // NaN
console.log(parseInt(test2)); // 1234
```



### parseInt를 자세하게 알아보자.

그런데! 모질라 문서를 참고하면 parseInt가 NaN을 반환하는 경우는 2가지 있다고 한다. 

1. `radix`**가 2보다 작거나 36보다 큰 경우**
2. **공백이 아닌 첫 문자를 숫자로 변환할 수 없는 경우**

2번은 아래와 같이 첫 문자가 숫자가 아닌 경우를 말한다. 

```javascript
let test3 = "이것은1234"

console.log(parseInt(test3)); // NaN
```

그렇다면 1번 "`radix`**가 2보다 작거나 36보다 큰 경우**"는  무슨 의미일까? 

parseInt는 문자열 외에도 radix를 매개변수로 받고 있다. 매개변수 radix는 앞 string의 진수를 나타내는 2 ~ 36까지의 정수인데, 이것은 parseInt이 **2진수부터 36진수까지만** 해석이 가능하다는 의미이다. 

그런데 모질라 문서에서는 parseInt의 **기본 radix의 값**이 우리가 익숙하게 사용하는 **10(10진수)이 아니므로 주의**하라고 이야기하고 있다. 개인적으로 흥미로운 부분이었는데, radix 매개변수가 없을 경우, 주어진 string가지고 진수를 알아서 판단하여 숫자로 반환한다고 한다. (반환하는 숫자는 10진수를 기준으로 한다.)

```javascript
parseInt(string);
parseInt(string, radix); 

// 예시
parseInt('1111', 2); // => 15 (2진수에서 1111은 15이다.)


// es3에서는 radix의 값이 없을 경우,
// 0으로 시작하는 숫자형 문자열을 8진수로 판단했다고 한다.
// 그러나 이러한 문제는 es5에서 개선되었다.
parseInt('015'); // =>15 (es5)
parseInt('015', 8); // => 13 (8진수에서 015는 13이다.)
parseInt('546', 2);   // 0과 1을 제외한 숫자는 2진법에서 유효하지 않으므로 NaN

```

그리고 parseInt는 매우 큰 숫자나, 매우 작은 소수점을 값으로 넣을 경우 원치 않는 값을 반환할 수 있으니 Math.floor 대신에 사용하는 경우는 없도록 하자.  

참고 => [프로그래머-유머](https://twitter.com/PR0GRAMMERHUM0R/status/1488436988051181568?s=20&t=JFBSpHBD08DIW9sw3e5clw)



#### 그렇다면 Number는?

Number는 parseInt에 비하면 좀 더 간편히 사용할 수 있다. 

진수 값을 매개변수로 받지도 않는다. 물론 Number도 받을 수 있는 최대, 최소 값이 존재하지만 9007199254740991이상이나 -9007199254740991이하의 값을 넣을 일은 거의 없을 것이다.. 



### 2) 연산자를 이용한 변환

간편하지만 좋은 방법인지는 모르겠다. 

"+" 연산자를 많이 이용하는 이유는 아래의 방법 중에서 가장 가독성이 있기 때문일까?

```javascript
let test = "4";
console.log(test*1); // 4
console.log(test/1); // 4
console.log(+test); // 4 => 보기 깔끔해서 제일 보편적으로 사용되는 듯 하다.
console.log(test-0); // 4

// 불가능한 방법
console.log(-test); // -4 가 나오므로 사용 불가
console.log(test+0); // "40"이 나옴. 이 방법은 불가하다.
```



\=========

그 외에도 parseFloat(); 이나 물결 연산자(\~\~) 등을 사용할 수 있겠지만, 특별한 경우가 아닌 이상 위의 3가지 방법을 많이 사용하는 것 같다. 

많이 사용 또 다른 방식을 발견하면 추가로 작성할 예정이다.