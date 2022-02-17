---
title: Next.js 기본 정리
date: 2022-02-17T02:01:07.689Z
description: 강의 내용 & Documents를 읽으며 정리
tags:
  - 개발
  - Next.js
---
## Next.js

React.js를 기반으로 한 프레임워크로, SEO 최적화 작업을 쉽게 진행할 수 있으며 필요에 따라 SSR, CSR을 사용할 수 있다는 장점이 있다.  

* 기본적으로 생성되는 pages아래의 파일들은 라우팅 작업없이 바로 이용이 가능하다. 

  **Example**: If you create `pages/about.js` that exports a React component like below, it will be accessible at `/about`.
* 동적 라우팅을 이용하려면 `pages/posts/[id].js`라는 폴더를 생성한다. 그러면 `posts/1`, `posts/2`와 같이 사용할 수 있다.

### 정적 생성(Static Rendering / **SSG**) vs 서버사이드 렌더링(SSR)

Next.js에서는 정적 생성 or 서버사이드 렌더링 여부를 각 페이지마다 설정 할  수 있다. 이 둘의 차이점은 언제 html이 생성되는가?임. 

#### \[정적생성]

* 프로젝트가 빌드하는 시점에 html 파일들을 "미리" 생성
* 모든 요청에 재사용
* 퍼포먼스를 이유로 Next.js에서는 정적 생성을 권고하고 있다.
* getStaticProps / getStaticPaths
* 정적 생성된 페이지는 CND(콘텐츠 전송 네트워크)에 캐시로 저장 (?????)
* 마케팅 페이지, 블로그 게시물, 제품 목록, 도움말/ 문서 

#### \[서버사이드 렌더링]

* "매 요청마다" html을 생성하므로 항상 최신상태를 유지한다. 
* getServerSideProps 
* 관리자 페이지, 분석차트 

### _app.js 파일

* 페이지 전환시 레이아웃 유지 가능, 페이지 탐색시 상태 유지
* 전역 css 추가
* `componentDidCatch`를 통해 사용자 정의 오류 처리

### _document.js 파일

* **모든** 화면에 적용되는 html, head, body tag의 마크업 정의를 보강
* 예를 들어 lang속성을 변경할 수 있다. `<Html lang="ko">`
* 전역 css, script 적용 안됨
* 여기서 사용된 `head`는 `next/head`와 상이하니 주의할 것. `next/head`는 각각의 화면에서 사용하는 용도이다. 

### 404.js

* 클라이언트 접근 에러 페이지
* 기본적으로 Next.js에서 제공을 하고 있으나, 커스텀하고 싶다면 생성

### _error.js

* 500번대(서버) 에러 페이지