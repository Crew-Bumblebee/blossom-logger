const fcm = require('./module/fcm.js')
const mongo = require('./module/mongodb.js')
const winston = require('./module/winston.js')

/**
 * @type {import('./common/JSDocs').BlossomLogger}
 */
let logger = null

/**
 * Blossom Logger 생성 
 * @param {import('./common/JSDocs').FcmConfig}         fcmConfig FCM 설정값
 * @param {import('./common/JSDocs').MongoConfig}       mongoConfig mongoDB 설정값
 * @param {import('./common/JSDocs').WinstonConfig}     winstonConfig winston logger 설정값 
 */
const init = async (fcmConfig, mongoConfig, winstonConfig) => {
    try {
        fcm.init(fcmConfig)
        await mongo.init(mongoConfig)

        logger = winston.init(winstonConfig)
    } catch (err) {
        throw err
    }
}

module.exports = {
    init,
    /**
     * Fatal error 로그를 기록합니다.
     * @param {string} string - 로그할 문자열
     * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
     */
    fatal: (string, ...meta) => {
        if (logger === null) {
            throw "logger error: Call the init function first"
        }
 
        logger.fatal(string, meta)
    },

    /**
     * Error 로그를 기록합니다.
     * @param {string} string - 로그할 문자열
     * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
     */
    error: (string, ...meta) => {
        if (logger === null) {
            throw "logger error: Call the init function first"
        }

        logger.error(string, meta)
    },

    /**
     * Warning 로그를 기록합니다.
     * @param {string} string - 로그할 문자열
     * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
     */
    warning: (string, ...meta) => {
        if (logger === null) {
            throw "logger error: Call the init function first"
        }

        logger.warning(string, meta)
    },

    /**
     * Alert 로그를 기록합니다.
     * @param {string} string - 로그할 문자열
     * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
     */
    alert: (string, ...meta) => {
        if (logger === null) {
            throw "logger error: Call the init function first"
        }

        logger.alert(string, meta)
    },

    /**
     * Info 로그를 기록합니다.
     * @param {string} string - 로그할 문자열
     * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
     */
    info: (string, ...meta) => {
        if (logger === null) {
            throw "logger error: Call the init function first"
        }

        logger.info(string, meta)
    },

    /**
     * Debug 로그를 기록합니다.
     * @param {string} string - 로그할 문자열
     * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
     */
    debug: (string, ...meta) => {
        if (logger === null) {
            throw "logger error: Call the init function first"
        }

        logger.debug(string, meta)
    },

    /**
     * Trace 로그를 기록합니다.
     * @param {string} string - 로그할 문자열
     * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
     */
    trace: (string, ...meta) => {
        if (logger === null) {
            throw "logger error: Call the init function first"
        }

        logger.trace(string, meta)
    },
}