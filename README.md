# blossom-logger

Blossom 프로젝트에서 사용되는 node.js 용 로깅 모듈 입니다.

## Motivation

`blossom-logger`는 [winston](https://github.com/winstonjs/winston) 오픈소스 라이브러리를 기반으로 제작된 Blossom 프로젝트 전반에서 공통적으로 사용하는 로깅 라이브러리 입니다. 기존 [winston](https://github.com/winstonjs/winston) 라이브러리의 로컬 파일 저장 기능과 더불어 [firebase 클라우드 메시징](https://firebase.google.com/docs/cloud-messaging)을 활용한 푸시 전송 기능, [MongoDB](https://www.mongodb.com/)를 활용한 로그 저장 기능을 지원합니다.

## Installation

``` bash
npm install blossom-logger
```

## Usage
`blossom-logger`를 사용하는 예시 코드는 다음과 같습니다.

``` js
const { createLogger } = require('blossom-logger')

const fcmConfig = {
    serviceAccountKey: {
        type: "",
        project_id: "",
        private_key_id: "",
        private_key: "",
        client_email: "",
        client_id: "",
        auth_uri: "",
        topic_uri: "",
        auth_provider_x509_cert_url: "",
        client_x509_cert_url: "",
        universe_domain: "",
    },
    topic: {
        android: "",
        ios: "",
    },
}

const mongoConfig = {
    host: "",
    username: "",
    password: "",
    database: "",
    collection: "",
    requester: "",
}

const winstonConfig = {
    projectName: "",
    logLevel: "",
    logLevelMaxFiles: 336,
    infoLevelMaxFiles: 30,
    errorLevelMaxFiles: 30,
    logPath: "",
    logZipArchive: false, 
}

const doLogger = async () => {
    const logger = await createLogger(fcmConfig, mongoConfig, winstonConfig)

    logger.fatal("test logger fatal")
    logger.error("test logger error")
    logger.warning("test logger warning")
    logger.alert("test logger alert")
    logger.info("test logger info")
    logger.debug("test logger debug")
    logger.trace("test logger trace")
}

doLogger()
```

createLogger 호출시 다음 3개의 객체가 필요합니다.
- [fcmConfig](#fcmconfig)
- [mongoConfig](#mongoconfig)
- [winstonConfig](#winstonconfig)

아래는 각 설정 객체별 옵션들의 설명입니다.

### FcmConfig
`fcmConfig.serviceAccountKey` 의 경우 firebase 클라우드 메시징에 사용되며, `firebase` > `프로젝트 설정` > `서비스 계정` > `Firebase Admin SDK` 에서 발급받은 json 파일과 동일한 구조를 사용하며 해당 파일을 참조하여 동일 값을 대입하면 됩니다. `fcmConfig.topic`은 스마트폰 플랫폼에 따라 각각 구독중인 토픽 이름을 값으로 지정하면 됩니다. 

``` js
// ...

const fcmConfig = {
    serviceAccountKey: {
        type: "",
        project_id: "",
        private_key_id: "",
        private_key: "",
        client_email: "",
        client_id: "",
        auth_uri: "",
        topic_uri: "",
        auth_provider_x509_cert_url: "",
        client_x509_cert_url: "",
        universe_domain: "",
    },
    topic: {
        android: "",
        ios: "",
    },
}

// ...
```

### MongoConfig
``` js
// ...

const mongoConfig = {
    host: "",
    username: "",
    password: "",
    database: "",
    collection: "",
    requester: "",
}

// ...
```
* `host` 접속할 mongoDB 의 ip 혹은 도메인명
* `username` 접속할 mongoDB 의 계정이름
* `password` 접속할 mongoDB 의 비밀번호
* `database` 접속할 mongoDB 의 데이터베이스 이름 
* `collection` 로그 도큐먼트를 삽입할 collection 의 이름
* `requester` 서버를 구별하기 위한 현재 구동중인 서버 이름

### WinstonConfig
``` js
// ...

const winstonConfig = {
    projectName: "",
    logLevel: "",
    errorLevelMaxFiles: 30,
    infoLevelMaxFiles: 30,
    logLevelMaxFiles: 336,
    logPath: "",
    logZipArchive: false, 
}
// ...
```
* `projectName` log 파일을 구분할 이름 (projectName-%DATE%.log 형식으로 저장됨)
* `logLevel` 로그를 출력 또는 파일로 저장할 로그 레벨 (아래 표 [참조](#loglevel))
* `errorLevelMaxFiles` error 로그 수준에서 저장할 파일 개수 (숫자형식, 30 지정시 최근 30일 저장)
* `infoLevelMaxFiles` info 로그 수준에서 저장할 파일 개수
* `logLevelMaxFiles` 사용자가 [logLevel](#loglevel) 로 지정한 로그 수준에서 저장할 파일 개수
* `logPath` 로그 파일이 저장될 위치
* `logZipArchive` 신규 로그 파일 생성 시 기존 로그파일을 압축할 것인지 유무

> 생성된 로그 파일명은 로그 수준에 따라 `${projectName}-YYYY-MM-DD-HH` 또는 `${projectName}-YYYY-MM-DD` 로 저장 됩니다.

### LogLevel
`blossom-logger` 에서 사용되는 로그 수준은 다음과 같습니다.

| 수준        | level | FCM 전송         | MongoDB 저장 | 색상      | 저장 위치           | 파일 저장 단위 |
| ---------- | ----- | -------------- | ----------- | -------- | ----------------- | ------- |
| `fatal`    | 0     | 전송됨           | 저장함        | `red`    | ${logPath}/error | 일      |
| `error`    | 1     | 전송됨           | 저장함        | `red`    | ${logPath}/error | 일      |
| `warning`  | 2     | 전송됨           | 저장함        | `yellow` | ${logPath}/info  | 일      |
| `alert`    | 3     | 전송됨           | 저장함        | `green`  | ${logPath}/info  | 일      |
| `info`     | 4     | 전송 안 함       | 저장 안 함     | `blue`   | ${logPath}/info  | 일      |
| `debug`    | 5     | 전송 안 함       | 저장 안 함     | `white`  | ${logPath}       | 시간     |
| `trace`    | 6     | 전송 안 함       | 저장 안 함     | `cyan`   | ${logPath}       | 시간     |

> 로깅 수준은 `createLogger` 호출시 `winstonConfig` 옵션의 `logLevel` 속성에 지정 가능합니다.
> 위 표에서 정의 한 7개의 수준 중 하나여야 합니다.

``` js
const { createLogger } = require('blossom-logger');

// ...

const logger = await createLogger(fcmConfig, mongoConfig, {
    // ...
    logLevel: "trace",
    // ...
});

// ...

```