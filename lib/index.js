const fcm = require('./module/fcm.js')
const mongo = require('./module/mongodb.js')
const winston = require('./module/winston.js')

/**
 * Blossom Logger 생성 
 * @param {import('./common/JSDocs').FcmConfig}         fcmConfig FCM 설정값
 * @param {import('./common/JSDocs').MongoConfig}       mongoConfig mongoDB 설정값
 * @param {import('./common/JSDocs').WinstonConfig}     winstonConfig winston logger 설정값 
 * @returns {Promise<import('./common/JSDocs').BlossomLogger>}
 */
const createLogger = async (fcmConfig, mongoConfig, winstonConfig) => {
    try {
        fcm.init(fcmConfig)
        await mongo.init(mongoConfig)

        return winston.init(winstonConfig)
    } catch (err) {
        throw err
    }
}

module.exports = {
    createLogger,
}