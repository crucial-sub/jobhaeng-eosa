<h1 align="center"> 잡행어사 </h1>

<p align="center"><img width="390" height="700" src="https://user-images.githubusercontent.com/87363422/180652820-a7c169ac-9bd1-48f5-aa85-92d2451235bb.jpeg" /></p>

<h3 align="center"> 서비스 링크: https://job-hang-a-sa.vercel.app/ </h3>

<p align="center"></p>

# 👏 프로젝트 소개

> <h3>TypeScript, Next.js와 Firebase를 사용하여 잡일을 도와줄 사람을 찾는 서비스를 개발했습니다.

<br/><br/>

## 🙋‍♀️🙋‍♂️ 팀원

<br/>

<table>
<thead>
<tr>
<th>프로필</th>
<th>이름</th>
<th>Github</th>
<th>담당 기능</th>
</tr>
</thead>

<tbody>
<tr>
<td>
<a href="https://github.com/crucial-sub"
><img
src="https://avatars.githubusercontent.com/crucial-sub"
width="100px;"
alt=""
/></a>
</td>
<td><b>박중섭</b></td>
  <td align="center"><a href="https://github.com/crucial-sub" >crucial-sub</a></td>
<td>...</td>
</tr>

<tr>
<td>
<a href="https://github.com/Space-Belt"
><img
src="https://avatars.githubusercontent.com/Space-Belt"
width="100px;"
alt=""
/></a
></td>
<td align="center"><b>우혁주</b></td>
  <td align="center"><a href="https://github.com/Space-Belt" >Space-Belt</a></td>
<td>...</td>
</tr>
</tbody>
</table>

<br/><br/>

## 🚀 스택

<img src="https://img.shields.io/badge/-typescript-brightgreen"/></a> &nbsp;
<img src="https://img.shields.io/badge/-react-blue"/></a> &nbsp;
<img src="https://img.shields.io/badge/-NextJS-lightgrey"/></a> &nbsp;
<img src="https://img.shields.io/badge/-Firebase-orange"/></a> &nbsp;
<img src="https://img.shields.io/badge/-emotion-pink"/></a> &nbsp;

## ⚙ 설치

```
# clone the project
$ git clone https://github.com/console-lo9/messenger.git

# install modules
$ cd job-hang-a-sa
$ npm install || yarn install

# start
$ npm run dev || yarn dev

⠀
⠀  You can now view this project in the browser.
⠀  http://localhost:3000/
⠀
```

## 🔗 의존성

```
"dependencies": {
    "@emotion/core": "^11.0.0",
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@reduxjs/toolkit": "^1.8.2",
    "@types/react-redux": "^7.1.24",
    "axios": "^0.27.2",
    "firebase": "^9.8.3",
    "next": "12.1.6",
    "next-redux-wrapper": "^7.0.5",
    "react": "18.1.0",
    "react-daum-postcode": "^3.1.0",
    "react-dom": "18.1.0",
    "react-icons": "^4.4.0",
    "react-redux": "^8.0.2",
    "redux-logger": "^3.0.6",
    "redux-persist": "^6.0.0",
    "swr": "^1.3.0"
  },
```

## ✨ 구현 사항

-   [x] `Next.js`와 `Typescript` 사용
-   [x] `Firebase`를 사용하여 DB 구현
-   [x] 재사용 가능한 layout과 util 함수
-   [x] 전역상태관리 툴 사용(`Redux-toolkit`)
-   [x] `redux-persist`를 사용하여 새로고침 시에도 일부 redux store 데이터 유지
-   [ ] 반응형 페이지 구현

-   [x] 회원가입 및 로그인

    -   [x] Firebase Auth 이용하여 구현
    -   [x] Firestore DB에 유저 data 생성
    -   [x] 중복 이메일 방지
    -   [x] 구글 소셜 로그인 구현
    <details>
    <summary>회원가입</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179768028-65bd105e-e0c5-4ac1-b1e9-d7a6d5f6f268.gif">
    </details>
    <details>
    <summary>구글 로그인</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179787391-5be8114c-9f21-436e-bfa9-29386ae64311.gif">
    </details>

-   [x] 이메일 인증

    -   [x] 회원가입 후 첫 로그인 시 이메일 인증 페이지 렌더링
    -   [x] 로그인한 이메일로 인증 메일 발송
    -   [x] 인증 메일 내 링크를 클릭하여 이메일 인증
    -   [x] 이메일 인증 여부를 DB에 저장하여 추후 로그인 시 인증 페이지 렌더링 여부 결정
    <details>
    <summary>이메일 인증메일 발송</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179769987-791ea7fb-4d8e-49f2-9cfe-3d0c55aeb3a0.gif">
    </details>
    <details>
    <summary>내 이메일에서 메일 인증</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179770853-ba7026af-3aae-4ccf-a8af-cdceb9744106.gif">
    </details>
    <details>
    <summary>이메일 인증 확인</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179771220-53153f45-26a4-48a8-98c4-c1eba5d00d38.gif">
    </details>

-   [x] 유저 정보 입력 및 수정(/user/edit)

    -   [x] 이메일 인증 완료 시 자동으로 유저 정보 입력 페이지로 이동
    -   [x] 닉네임, 연락처, 주소
    -   [x] 연락처 입력 시 정규표현식으로 휴대전화 번호 패턴 검증(01X-XXXX-XXXX)
    -   [x] 주소 입력은 Daum 우편번호 서비스를 사용하여 구현
    -   [x] 입력한 정보를 토대로 redux store에 현재 유저 정보 저장 및 firestore DB 업데이트
    <details>
    <summary>첫 회원가입시 유저 정보 입력</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179772292-924e74e4-057c-45a4-aff1-6503c7006197.gif">
    </details>

-   [x] 로고 및 헤더

    -   [x] 탑로고 클릭 시 메인페이지 이동
    -   [x] `useRouter`로 받아온 url 정보를 기준으로 헤더 내용 변경
    -   [x] 뒤로가기 버튼 구현
    -   [x] 로그인 및 인증 페이지를 제외한 어떤 페이지에서든 렌더링

-   [x] 하단 탭

    -   [x] 글(/), 채팅(/chats), 마이페이지(/user) 3개의 탭으로 구성
    -   [x] 탭 클릭 시 해당 페이지로 이동
    -   [x] 선택한 탭 배경색 변경하여 구분
    -   [x] 로그인 및 인증 페이지를 제외한 어떤 페이지에서든 렌더링

-   [x] 메인 페이지(/)

    -   [x] 헤더는 필터와 검색 입력칸으로 구성
    -   [x] 필터 정보에 맞게 잡행 요청글 출력
    -   [x] 우측 하단에 요청글 작성 버튼 고정

-   [x] 잡행어사 출두 요청글 작성(/request)

    -   [x] 제목, 잡행 보상금, 잡행어사 출두 위치, 잡행 요청 내용
    -   [x] 잡행 보상금 입력 시 자동으로 맨 앞에 단위(₩) 입력 및 세 자리 수 마다 쉼표 추가
    -   [x] 출두 위치 입력은 '내 주소 입력'과 '지도로 선택' 둘 중 선택
    -   [x] '내 주소 입력' 선택 시 현재 유저 정보에 저장된 주소 사용
    -   [x] '지도로 선택' 선택 시 카카오맵 API 사용하여 실제 지도에서 위치 지정
    -   [x] 요청하기 확인 시 누른 순간의 날짜 정보를 데이터에 저장
    -   [x] 요청하기 확인 시 Firestore DB & redux store 양쪽에 저장
    <details>
    <summary>잡행 요청글 등록</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179774814-7fd9adbd-86a9-4fc4-9d39-0caf040ed6fd.gif">
    </details>

-   [x] 잡행어사 출두 요청글(/items/[id])

    -   [x] 현재 유저와 요청글과의 관계 및 요청글 상태(진행 중, 완료)에 따라 우측 상단 햄버거 메뉴의 내용을 다르게 출력
    -   [x] 요청글 작성자일 경우 채팅 목록 열기 버튼, 작성자가 아닐 경우 채팅하기 버튼 렌더링
    -   [x] 요청글 상태에 따라 상단에 안내 문구 표시
    <details>
    <summary>잡행어사 임명시 출두중 표시</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179781351-1bb06592-d27f-4333-8f4e-53f290b90a2c.png">
    </details>
    <details>
    <summary>집행 완료</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179782105-319e7a5a-144d-4d35-bece-bf281c759702.gif">
    </details>
    <details>
    <summary>잡행 완료 후 잡행 요청글 리스트에 완료 표시</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179782177-4a8700aa-73d1-45a7-9dde-02914e5e1832.png">
    </details>

-   [x] 필터

    -   [x] 대한민국 법정동 코드 조회 API를 활용하여 구현
    -   [x] 필터 버튼을 누를 시 필터 박스에 서울시 내의 모든 구가 출력되며 구를 선택 시 해당 구의 모든 법정동 출력
    -   [x] 법정동을 선택하여 해당 동의 요청글만 출력
    -   [x] 필터 지정하지 않을 시 default 값으로 현재 유저 정보에 저장된 동네 사용
    -   [x] 'xx구 전체'를 선택할 시 해당 구의 모든 요청글 출력
    <details>
    <summary>필터 적용</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179784931-8d71f788-065d-4a51-badd-0193178cc66a.gif">
    </details>

-   [x] 검색(/search/[searchValue])

    -   [x] 입력한 검색값을 제목/내용에 포함하는 모든 요청글 출력

-   [x] 채팅(/chats/[chatId])

    -   [x] 요청글의 채팅하기 버튼을 눌러 첫 대화 입력시 채팅방 생성
    -   [x] 채팅방 상단에 요청글 정보 표시
    -   [x] 요청글 작성자일 경우 헤더에 잡행어사 임명 버튼 출력
    -   [x] 요청글 작성자이거나 임명된 잡행어사일 경우 헤더에 잡행어사 해임 버튼 출력
    -   [x] 채팅방 나가기 클릭 시 채팅 리스트에서 안보이도록 숨김 처리
    -   [x] 채팅 참여자 두 명 모두 채팅방 나가기를 누르면 DB에서 해당 채팅방 삭제
    -   [x] 상대방 채팅과 내 채팅을 좌우 양쪽에 나눠서 출력
    <details>
    <summary>채팅 보내기</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179776736-1a4db64f-8f46-456b-b3c8-220d3ccf3101.gif">
    </details>
    <details>
    <summary>채팅 수신</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179777256-546c0ab5-7cd2-40f5-8edb-9d1d054df106.gif">
    </details>
    <details>
    <summary>잡행어사 임명</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179780829-46c5fcaf-cefa-48a5-9869-b4bee9e5031a.gif">
    </details>
    <details>
    <summary>잡행어사 임명시 잡행 요청글 리스트 중 진행중 표시</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179781644-f9f47466-de1a-465e-aa98-e85df6f21aa9.png">
    </details>
    <details>
    <summary>잡행어사 해임</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179781387-e76c6cf5-ec84-4391-8ffe-49af0fce75a8.gif">
    </details>

-   [x] 채팅리스트(/chats)

    -   [x] 채팅 탭을 눌러 이동 가능
    -   [x] 내가 참여 중인 모든 채팅방 출력
    -   [x] 각 채팅방의 마지막 메시지 표시
    -   [x] 채팅방 클릭 시 해당 채팅방으로 이동
    <details>
    <summary>내 채팅목록</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179787829-8bdbdf3e-254f-46fb-aa98-69d2495b64c0.png">
    </details>

-   [x] 마이페이지(/user)

    -   [x] 내 정보와 내 글 내역 두 가지로 구성
    -   [x] 내 글 내역은 요청 내역(default)과 출두 내역 중 하나를 선택하여 출력
    -   [x] 요청 내역 선택 시 내가 작성한 모든 요청글 출력
    -   [x] 출두 내역 선택 시 내가 잡행어사로서 출두한 모든 글 출력
    <details>
    <summary>마이페이지 내 요청&출두 내역</summary>
    <img src="https://user-images.githubusercontent.com/82592845/179786200-23b05fe7-438c-427e-8c8f-e1eb32fb4ad3.gif">
    </details>
