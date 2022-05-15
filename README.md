# wanted_pre_onboarding_grip_company

<div>
<img src="https://img.shields.io/badge/TypeScript-v4.4.2-blue"/>
<img src="https://img.shields.io/badge/React-v18.1.0-blue"/>
<img src="https://img.shields.io/badge/Recoil-v0.7.3 alpha 2-blue"/>
<img src="https://img.shields.io/badge/React Router Dom-v6.3.0-blue"/>
</div>
<br/>

<ul>
  <li>영화 검색 App</li>
  <li>즐겨찾기 기능을 추가하여 저장할 수 있다</li>
  <li>즐겨찾기 영화 localstorage 저장</li>
  <li>검색 페이지 무한 스크롤 구현</li>
  <li>페이지 끝에 도달하면 알림</li>
  <li>초기 로드된 데이터와 스토리지 데이터와 비교하여 즐겨찾기 저장</li>
</ul>

 Installation
 --------
 ```
 yarn install
 ```
Usage
-------
 ````
 yarn start
 ````
Directory Structure
--------------
```
──src
    ├─components
    │  ├─common
    │  │  ├─modal
    │  │  └─movieList
    │  ├─layout
    │  ├─searchBar
    │  └─tabBar
    ├─hooks
    ├─pages
    │  ├─favorites
    │  └─home
    ├─recoil
    ├─styles
    │  └─base
    ├─types
    └─utils

```
라우터를 중심으로 pages 폴더에 home과 favorites 컴포넌트 구성하였다.  
components 폴더를 만들어 재사용이 높은 컴포넌트는 common에 저장하였고,  
그 외 나머지는 개인 폴더(layout, searchBar, tabBar)에 저장하였다.  
recoil폴더를 만들어 atom함수를 저장하였고, type폴더에도 api data type을 저장하였다.  
그 외 styles 폴더엔 styles관련 파일을 저장하였다.

Preview
-------
<img src="https://user-images.githubusercontent.com/98396758/168460118-aa5307fd-fc90-4316-af7d-77d5ec320b4c.gif" width="350px">


초기화면  
검색중인 목록이 없으면 검색 결과가 없습니다. 알림  
하단 탭바는 
메인, 즐겨찾기로 구성  
요청한 영화가 없을경우 메시지 알림  


<img src="https://user-images.githubusercontent.com/98396758/168459660-47bcb688-d848-4945-a830-6b5a445979d0.gif" width="350px">

포스터 클릭 시 즐겨찾기 모달창이 보이며  
즐겨찾기 추가 버튼이 현재 상태에 따라 변경된다.  
즐겨찾기가 완료된 영화는 포스터 hover시 별이 보이게 된다. 

<img src="https://user-images.githubusercontent.com/98396758/168459817-60139ad5-e436-4fa8-900f-688ccfc9fa01.gif" width="350px">
즐겨찾기도 구성은 동일하며  

localstorage에 저장되어 데이터가 보존된다.  

<img src="https://user-images.githubusercontent.com/98396758/168460009-f6cc5dc8-30a1-46f2-b202-00055b85027e.gif" width="350px">

초기 영화를 불러올 때 localstorage에서 불러온 데이터와 비교해  
즐겨찾기에 저장하게 구성하였다.

<img src="https://user-images.githubusercontent.com/98396758/168460175-8b2889c4-1c4b-4458-ac29-5377d8f2f96e.gif" width="350px">

영화가 더 이상 없으면 마지막 페이지 알림 구현
