---
title: Typescript - [7] 제네릭 Generics
date: 2022-02-12T14:25:55.754Z
description: Typescript - 제네릭에 대해 정리했던 문서를 노션에서 블로그로 옮겼습니다.
tags:
  - 개발
---
이  공부한 것은 작년 7월이었는데, 타입스크립트를 사용할 일이 없었다보니 잊어버리고 있었다. 최근 면접에서 타입스크립트의 any와 제네릭의 차이에 대한 질문을 받았고 대답하지 못했다. 아쉬운 마음에 예전에 강의를 들으며 정리했던 것을 다시 읽어볼 겸 블로그에 옮겨본다.

제네릭은 여러가지 타입을 사용해야할 때 사용할 수 있다. 마치 함수의 파라미터처럼 (타입을 미리 지정하는 것이 아니라) 상황에 맞게 필요한 타입을 지정해줄 수 있다.

예를 들어 아래와 같은 상황에서 인자 arr의 타입을 지정해주려면 어떻게 해야할까? 

함수 오버로드나 유니온 타입을 사용하면 되겠지만, 하나하나 작성해 줘야한다는 것이 비효율적이다.

⇒ 이럴 때 유용하게 사용할 수 있는 것이 바로 제네릭이다. 제네릭을 사용하면 상황에 따라 타입을 결정해줄 수 있어서 코드를 재사용하기에 용이하다.

```tsx
// 정녕 이렇게 해야하는 것인가???
function getSize(arr:number[] | string[] | boolean[] | object[]):number {
    return arr.length
}

const arr1 = [12,4,5];
const arr2 = ['a', 'v', 'c'];
const arr3 = [true, false];
const arr4 = [{},{},{}];
```

위의 코드를 제네릭을 이용해서 간단하게 바꿔보자.

꺾쇠 안에 <T>를 입력하고 arr타입을 T로 받는다. 그 다음 사용하는 쪽에서 아래와 같이 꺾쇠 안에 타입을 지정해 주면 된다. T라는 문자는 변경되어도 상관없지만 대부분 T를 사용한다.

```tsx
function **getSize<T>(arr:T[])**:number {
    return arr.length
}

const arr1 = [12,4,5];
getSize<number>(arr1); // getSize(arr1);라고 박성해도 에러가 발생하지 않음
const arr2 = ['a', 'v', 'c'];
getSize<string>(arr2);
const arr3 = [true, false];
getSize<boolean>(arr3);
const arr4 = [{},{},{}];
getSize<object>(arr4);
```

만약 타입이 서로 같다면 굳이 <타입>을 지정하지 않더라도 타입 추론이 가능하기 때문에 에러가 발생하지는 않는다.

다음은 인터페이스에서 제네릭을 사용할 수 있는 예시이다. 

```tsx
interface Mobile {
    name : string,
    price: number,
    option: any
}

const m1:Mobile = {
    name: "s1",
    price: 1000,
    option: 'good'
}

const m2:Mobile = {
    name: "s1",
    price: 1000,
    option: {
        color: 'red',
        coupon: false
    }
}
```

옵션에 어떤 타입의 값이 들어가는지 알 수 없다고 가정해보자. any 타입이 너무 광범위헤서 사용하기 곤란하다면 제네릭을 활용해 볼 수 있다. 

인터페이스 생성시, 어떤 타입의 값이 들어올지 모르는 option에 T를 넣은 뒤,

해당 인터페이스를 이용해 객체를 생성할 때에 타입을 지정해 준다. 이렇게 하면 하나의 인터페이스로 다른 모양의 객체들을 많이 만들 수 있다.

```tsx
interface Mobile**<T>** {
    name : string,
    price: number,
    **option: T**
}

const m1:Mobile**<string>** = {
    name: "s1",
    price: 1000,
    option: 'good'
}

const m2:Mobile**<object>** = {
    name: "s1",
    price: 1000,
    option: {
        color: 'red',
        coupon: false
    }
}

// 들어오는 값의 타입이 명확하다면 이렇게 작성할 수도 있다.
const m3:Mobile**<{color:string, coupon: boolean}>** = {
    name: "s1",
    price: 1000,
    option: {
        color: 'red',
        coupon: false
    }
}
```

만약에 서로 다른 인터페이스를 가지고 만든 객체들이 있을 때, 동일한 함수를 가지고 다양한 객체들의 특정한 프로퍼티를 리턴하고 싶다면 어떻게 해야할까? 

아래에서 생성된 user, car, book 객체를 showName 함수의 아규먼트(data 파라미터)로 넘겨 name 값을 리턴하려고 한다. 그런데 작성을 해보면 에러가 난다.

```tsx
interface User {
    name: string;
    age: number;
}

interface Car {
    name: string;
    color: string;
}

interface Book {
    price: number;
}

const user:User = {name: 'a', age: 10}
const car:Car = {name: 'a', color: 'red'}
const book:Book = {price: 3000}

function showName<T>(data:T):string {
    return data.name
} // 에러남

function showName(data:object):string {
    return data.name
} // 이렇게 해도 에러남

showName(user);
showName(car);
showName(book);
```

⇒ 어떤 타입을 아규먼트로 받는지 타입스크립트가 알 수 없고, 타입을 객체로 지정해도 모든 객체에  name이라는 프로퍼티가 없기 때문에 발생하는 오류이다.

이럴 경우에는 아래와 같이 적어주면 된다. 

```tsx
// name이 string인 객체를 확장한 형태의 어떠한 T가 온다는 뜻
function showName<T extends {name: string}>(data:T):string {
    return data.name
}

showName(user);
showName(car);
showName(book); // 에러 (name이 없음)
```

어떠한 T를 받을 건데, 그 T는 name이 string인 프로퍼티를 가진 객체를 확장한 형태라는 것이라는 의미이다. 이제는 받아야 할 T에 **반드시** name이라는 문자열의 프로퍼티가 포함되기 때문에 에러가 발생하지 않는다. 

⇒ 당연히 T에 name이 없거나 타입이 문자가 아닐 경우 에러가 발생한다.