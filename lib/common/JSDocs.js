/*******************************************************************************************************/
/* FCM */
/**
 * firebase-admin 인증시 사용되는 설정 객체
 * @typedef  {Object} ServiceAccountKey
 * @property {string} ServiceAccountKey.type       
 * @property {string} ServiceAccountKey.project_id  
 * @property {string} ServiceAccountKey.private_key_id   
 * @property {string} ServiceAccountKey.private_key   
 * @property {string} ServiceAccountKey.client_email 
 * @property {string} ServiceAccountKey.client_id 
 * @property {string} ServiceAccountKey.auth_uri 
 * @property {string} ServiceAccountKey.topic_uri 
 * @property {string} ServiceAccountKey.auth_provider_x509_cert_url 
 * @property {string} ServiceAccountKey.client_x509_cert_url 
 * @property {string} ServiceAccountKey.universe_domain 
 */

/**
 * send 함수 실행 후 정상 동작시 return 되는 객체 
 * @typedef  {Object} FcmSendResult
 * @property {string} FcmSendResult.android 메시지가 FCM 서비스에 전달된 후 string.
 * @property {string} FcmSendResult.ios     메시지가 FCM 서비스에 전달된 후 string.
 */

/**
 * FCM 발송시 사용되는 토픽 객체
 * @typedef {Object} FcmTopic
 * @property {string} FcmTopic.android 안드로이드로 발송할 FCM 토픽 이름
 * @property {string} FcmTopic.ios     IOS (아이폰)으로 발송할 FCM 토픽 이름
 */

/**
 * FCM init 호출시 사용되는 설정 객체
 * @typedef  {Object}            FcmConfig
 * @property {ServiceAccountKey} FcmConfig.serviceAccountKey
 * @property {FcmTopic}          FcmConfig.topic
 */
/*******************************************************************************************************/
/* Logger */
/**
 * logger 생성시 사용되는 설정 객체
 * @typedef  {Object}   WinstonConfig
 * @property {string}   WinstonConfig.projectName
 * @property {LogLevel} WinstonConfig.logLevel
 * @property {number}   WinstonConfig.logLevelMaxFiles
 * @property {number}   WinstonConfig.infoLevelMaxFiles
 * @property {number}   WinstonConfig.errorLevelMaxFiles
 * @property {string}   WinstonConfig.logPath
 * @property {boolean}  WinstonConfig.logZipArchive
 */

/**
 * Logger 객체
 * @typedef  {Object} BlossomLogger
 * @property {function(string, ...*): void} fatal   Logs a fatal error message.
 * @property {function(string, ...*): void} error   Logs an error message.
 * @property {function(string, ...*): void} warning Logs a warning message.
 * @property {function(string, ...*): void} alert   Logs an alert message.
 * @property {function(string, ...*): void} info    Logs an info message.
 * @property {function(string, ...*): void} debug   Logs a debug message.
 * @property {function(string, ...*): void} trace   Logs a trace message.
 */

/**
 * 로그 레벨 enum
 * @typedef {'fatal' | 'error' | 'warning' | 'alert' | 'info' | 'debug' | 'trace'} LogLevel
 */
/*******************************************************************************************************/
/* mongo */

const { Db, Collection, MongoClient } = require('mongodb')

/**
 * Mongo 접속시 사용되는 설정 객체
 * @typedef  {Object} MongoConfig
 * @property {string} MongoConfig.host       접속 host
 * @property {string} MongoConfig.username   접속 유저 이름
 * @property {string} MongoConfig.password   접속 비밀번호
 * @property {string} MongoConfig.database   db 이름
 * @property {string} MongoConfig.collection collection 이름
 * @property {string} MongoConfig.requester  동작 중인 서버 고유 명칭
 */

/**
 * Mongo 연결을 관리하는 객체 
 * @typedef  {Object}      Mongo
 * @property {string}      Mongo.url
 * @property {MongoClient} Mongo.client
 * @property {Db}          Mongo.db
 * @property {Collection}  Mongo.collection
 * @property {string}      Mongo.requester
 */
/*******************************************************************************************************/

module.exports = {
    ServiceAccountKey,
    FcmSendResult,
    WinstonConfig,
    BlossomLogger,
    LogLevel,
    MongoConfig,
    Mongo,
}