const admin = require("firebase-admin")
const { app: FireBaseAdminApp } = require("firebase-admin")

/**
 * @type {FireBaseAdminApp.App}
 */
let app = null

/**
 * @type {import('../common/JSDocs').FcmTopic}
 */
let fcmTopic = null

/**
 * FCM 모듈 초기화
 * @param {import('../common/JSDocs').FcmConfig} config
 */
const init = (config) => {
    try {
        app = admin.initializeApp({
            credential: admin.credential.cert(config.serviceAccountKey)
        }, 'blossom-logger')

        fcmTopic = config.topic
    } catch (err) {
        throw err
    }
}

/**
 * FCM 메시지 전송
 * @param {string} title   Notification 제목
 * @param {string} message Notification 내용
 * @returns {Promise<import('../common/JSDocs').FcmSendResult>}
 */
const send = async (title, message) => {
    if (app === null) {
        throw "fcm error: Call the init function first"
    }

    const result = {
        android: null,
        ios: null,
    }

    const dataAndroid = {
        topic: fcmTopic.android,
        data: {
            title: title,
            message: message,
        },
        android: {
            priority: "high"
        },
    }

    const dataIOS = {
        topic: fcmTopic.ios,
        notification: {
            title: title,
            body: message,
        },
    }

    result.android = await app.messaging().send(dataAndroid)
    result.ios = await app.messaging().send(dataIOS)

    return result
}

module.exports = {
    init,
    send,
}