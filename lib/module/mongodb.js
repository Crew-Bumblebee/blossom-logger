const { MongoClient } = require('mongodb')

/**
 * @type {import('../common/JSDocs').Mongo}
 */
let mongo = null

/**
 * 현재 날짜를 가져오는 함수 (YYYY-MM-DD HH:mm:ss.SSS)
 * @returns {string}
 */
const getFormattedDate = () => {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
}

/**
 * mongo 모듈 초기화
 * @param {import('../common/JSDocs').MongoConfig} config 
 */
const init = async (config) => {
    try {
        const url = `mongodb://${config.username}:${config.password}@${config.host}:27017/${config.database}` // 아이디와 비밀번호를 포함한 연결 문자열
        const client = new MongoClient(url)
        await client.connect()
        const db = client.db(config.database)
        const collection = db.collection(config.collection)
    
        mongo = {
            url: url,
            client: client,
            db: db,
            collection: collection,
            requester: config.requester
        }
    } catch (err) {
        throw err
    }
}

/**
 * mongoDB 에 로그 추가
 * @param {string} message  로그 내용
 * @param {import('../common/JSDocs').LogLevel} logLevel 로그 수준
 */
const insertLog = async (message, logLevel) => {
    if (mongo === null) {
        throw "mongo error: Call the init function first"
    }

    await mongo.collection.insertOne({
        requester: mongo.requester,
        logLevel: logLevel,
        message: message,
        date: getFormattedDate(),
    })
}

module.exports = {
    init,
    insertLog,
}