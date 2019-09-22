[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3d3892a9ba4e46078d75f1454c5467f7)](https://www.codacy.com/app/peurocs4/BlocklyLibrarySystem?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=soicem/BlocklyLibrarySystem&amp;utm_campaign=Badge_Grade)

# BlocklyLibrarySystem

## 개요

## 가이드 

### 파일 위치
* __Playground 실행 위치__: Blockly > google-block-xxx > tests > playground.html

* __소스 코드 위치__: Blockly > google-block-xxx > tests > src

* __블록 정의 코드 위치__: Blockly > google-block-xxx > blocks

* __JS 생성 코드 위치__: Blockly > google-block-xxx > generators > javascript



### UI 키워드 설명
* __작업공간__: 블록을 작업할 수 있는 공간 (화면 중앙에 위치)

* __프로젝트 설정 창__: 프로젝트와 관련된 작업을 설정할 수 있는 공간 (화면 오른쪽 하단에 위치)

* __카테고리__: 화면 왼쪽에 세로로 나열되어 목록으로 보여주는 화면을 뜻한다. (Logic, Loops, Maths 툴박스 등이 나열되어 있는 화면)

* __툴박스__: 카테코리에서 목록 하나를 클릭했을 때 보이는 창

* __뮤테이션 창__: 블록의 설정/모양을 변경할 수 있는 창

* __뮤테이션 버튼__: 뮤테이션 창을 띄우는 버튼 (블록 왼쪽 상단에 위치한 톱니바퀴 모양)



### 라이브러리 사용 방법

#### 라이브러리 내보내기

1. 카테고리에서 'Functions' 툴박스를 누른다.

2. 두 종류의 함수 중, 용도에 맞는 함수를 선택하여 작업공간에 추가한다.

3. 함수의 명을 지정한다. 매개변수를 추가하고 싶다면, 함수 블록의 뮤테이션 버튼(톱니바퀴)을 눌러 설정한다.

4. 함수 내부에 다른 블록들로 구현 내용을 추가한다.

5. 프로젝트 설정 창에서 'Export Library' 버튼을 눌른 후, 라이브러리 정보 입력이 끝나면 라이브러리 파일(BLK)이 생성된다.

> 깃연동 시나리오: [Library file sharing using git](https://www.youtube.com/watch?v=Eh-RbXjaSYY&feature=youtu.be)
>> 1. github 로그인 정보 입력
>> 2. Export 라이브러리
>> 3. 원격 저장소에 저장(저장소 동적 생성은 구현 안되어 있음)
>> - 현재는 soicem_forever_with_seperatedEventCode 브랜치에 올라가 있음!!!

#### 라이브러리 불러오기

라이브러리를 불러오는 방법은 총 두 가지가 존재한다.

1.'Import' 이벤트 블록을 사용한 방법

> 1. 카테고리에서 'Import' 툴박스를 누른다.
> 2. '라이브러리 사용하기' 이벤트 블록을 작업공간에 추가한다.
> 3. 다시 'Import' 툴박스를 누른다.
> 4. url을 적을 수 있는 블록을 '라이브러리 사용하기' 이벤트 블록 아래에 추가한다.
> 5. url에 BLK 파일의 raw 데이터를 받아올 수 있는 주소를 넣어준다.
> * url에 상대 주소를 넣어주면, 로컬서버의 경로에서 BLK를 읽어올 수도 있다.
> 6. 프로젝트 설정 창에서 'Read library header'를 누르면 카테고리 목록의 맨 끝에 라이브러리가 추가된다.

2. 'Import Library' 버튼을 사용하는 방법

> 1. 프로젝트 설정 창에서 'Import Library' 버튼을 누른다.
> 2. 읽어올 BLK 파일을 선택한다.
> 3. 선택된 라이브러리가 카테고리 목록의 맨 끝에 추가된다.

#### 라이브러리 사용하기

1. 카테고리에 추가된 라이브러리 중 원하는 라이브러리의 툴박스를 누른다.
2. 일반 블록과 동일하게 사용하면 된다.
* 라이브러리 블록의 뮤테이션 창은 함수의 구현 블록을 보여주도록 되어 있다. (수정 반영 안됨)
