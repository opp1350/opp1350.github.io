---
title: String을 Number로 바꾸는 여러가지 방법 정리
date: 2022-02-20T14:12:49.070Z
description: "문자를 숫자로 바꾸는 방법은 여러가지가 있습니다. 정확히 어떤 차이가 있는지 정리합니다.  "
tags:
  - 개발
---
## String to Number

알고리즘 문제를 풀면서 문자열을 숫자로 변경해야 하는 경우가 많았는데, 방법이 생각보다 다양했다. 

나는 보통 Number를 많이 이용하지만, parseInt도 굉장히 많이 쓰인다. 또 간편하게 문자 앞에 + 연산자를 붙여서 변경하는 사람도 있다. (이 방법을 알게 되었을 때 굉장히 신기했다... ) 각각의 차이점이 무엇인지 정리를 해보려고 한다.



### 1) Number vs parseInt

만약 문자열(예: "1234")이 **숫자**로만 구성되어 있다면 Number를 사용했든 parseInt를 사용했든 같은 결과(예: 1234)를 출력한다. 

그런데 문자열에 숫자가 아닌 문자(예: "~입니다.")가 섞여 있다면 Number는 NaN(숫자가 아님, Not-A-Number)를 출력하는 반면에 parseInt은 앞의 숫자(정수) "1234"만을 골라 숫자로 반환한다.  

```javascript
let test = "1234"
let test2 = "1234입니다."

console.log(Number(test)); // 1234
console.log(parseInt(test)); // 1234

console.log(Number(test2)); // NaN
console.log(parseInt(test2)); // 1234
```



그런데! 모질라 문서를 참고하면 parseInt NaN을 반환하는 경우가 있다. 

1. `radix`**가 2보다 작거나 36보다 큰 경우**
2. **공백이 아닌 첫 문자를 숫자로 변환할 수 없는 경우**

2번은 "이것은1234"와 같이 첫 문자가 숫자가 아닌 경우를 말한다. 

```javascript
let test3 = "이것은1234"

console.log(parseInt(test3)); // NaN
```



그렇다면 1번 "`radix`**가 2보다 작거나 36보다 큰 경우**"는  말일까? 

parseInt는 문자열 외에도 radix를 매개변수로 받고 있다. 매개변수 radix는 앞 string의 진수를 나타내는 2 ~ 36까지의 정수인데,  2진수부터 36진수까지 매개변수로 받을 수 있지만, 36진수 이상 && 2진수 이하는 받을 수 없다. 

그런데 모질라 문서에서는 parseInt의 **기본 radix의 값**이 우리가 익숙하게 사용하는 **10(10진수)이 아니므로 주의**하라고 이야기하고 있다. 이것이  \

문서를 더 읽어보면 radix 매개변수가 없을 경우, 주어진 string가지고 진수를 판단하여 숫자로 반환한다고 적혀있다.

```javascript
parseInt(string);
parseInt(string, radix); 
```