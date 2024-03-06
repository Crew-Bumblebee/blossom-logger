const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, colorize, splat } = format
const winstonDaily = require('winston-daily-rotate-file')

const { LOG_LEVEL } = require('../common/define.js')

const mongo = require('./mongodb.js')
const fcm = require('./fcm.js')

/**
 * winston 모듈 초기화
 * @param {import('../common/JSDocs').WinstonConfig} config 
 * @returns {import('../common/JSDocs').BlossomLogger} 반환된 로거 객체
 */
const init = (config) => {
    try {
        const levels = [
            { level: LOG_LEVEL.FATAL,   color: "red" },
            { level: LOG_LEVEL.ERROR,   color: "red" },
            { level: LOG_LEVEL.WARNING, color: "yellow" },
            { level: LOG_LEVEL.ALERT,   color: "green" },
            { level: LOG_LEVEL.INFO,    color: "blue" },
            { level: LOG_LEVEL.DEBUG,   color: "white" },
            { level: LOG_LEVEL.TRACE,   color: "cyan" },
        ]
        
        const myCustomLevels = {
            levels: () => {
                const list = {}
        
                let index = 0
        
                for (const level of levels) {
                    list[level.level] = index
                    index += 1
                }
        
                return list
            },
            colors: () => {
                const list = {}
        
                for (const level of levels) {
                    list[level.level] = level.color
                }
        
                return list
            }
        };
        
        const consoleFormat = combine(
            colorize({ colors: myCustomLevels.colors() }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            splat(),
            printf(({ level, message, timestamp }) => {
                switch (level) {
                    case LOG_LEVEL.FATAL:
                    case LOG_LEVEL.ERROR:
                    case LOG_LEVEL.WARNING:
                    case LOG_LEVEL.ALERT:
                        try {
                            mongo.insertLog(message, level)
                            fcm.send(`[${level.toUpperCase()}] ${config.projectName}`, message)
                        } catch (err) {
                            // Handle error
                        }
                        break
        
                    default:
                        break
                }
        
                return `[${timestamp}] [${level}] : ${message}`
            })
        );
        
        const fileFormat = combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            splat(),
            printf(({ level, message, timestamp }) => {
                switch (level) {
                    case LOG_LEVEL.FATAL:
                    case LOG_LEVEL.ERROR:
                    case LOG_LEVEL.WARNING:
                    case LOG_LEVEL.ALERT:
                        try {
                            mongo.insertLog(message, level)
                            fcm.send(`[${level.toUpperCase()}] ${config.projectName}`, message)
                        } catch (err) {
                            // Handle error
                        }
                        break
        
                    default:
                        break
                }
        
                return `[${timestamp}] [${level}] : ${message}`
            })
        );
        
        const logger = createLogger({
            levels: myCustomLevels.levels(),
            format: fileFormat,
            transports: [
                new winstonDaily({
                    level: config.logLevel, // 최하위 레벨에선
                    datePattern: 'YYYY-MM-DD-HH', // 파일 날짜 형식
                    dirname: config.logPath, // 파일 경로
                    filename: `${config.projectName}-%DATE%.log`, // 파일 이름
                    maxFiles: config.logLevelMaxFiles, // 최근 336개 로그 파일을 남김
                    zippedArchive: config.logZipArchive,
                }),
                new winstonDaily({
                    level: LOG_LEVEL.INFO, 
                    datePattern: 'YYYY-MM-DD',
                    dirname: `${config.logPath}/info`,
                    filename: `${config.projectName}-%DATE%.log`,
                    maxFiles: config.infoLevelMaxFiles,
                    zippedArchive: config.logZipArchive,
                }),
                new winstonDaily({
                    level: LOG_LEVEL.ERROR,
                    datePattern: 'YYYY-MM-DD',
                    dirname: `${config.logPath}/error`,
                    filename: `${config.projectName}-%DATE%.log`, 
                    maxFiles: config.errorLevelMaxFiles,
                    zippedArchive: config.logZipArchive,
                }),
            ],
        })
        
        logger.add(new transports.Console({
            level: config.logLevel,
            format: consoleFormat,
        }))
    
        return {
            /**
             * Fatal error 로그를 기록합니다.
             * @param {string} string - 로그할 문자열
             * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
             */
            fatal: (string, ...meta) => {
                logger.fatal(string, meta)
            },
    
            /**
             * Error 로그를 기록합니다.
             * @param {string} string - 로그할 문자열
             * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
             */
            error: (string, ...meta) => {
                logger.error(string, meta)
            },
    
            /**
             * Warning 로그를 기록합니다.
             * @param {string} string - 로그할 문자열
             * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
             */
            warning: (string, ...meta) => {
                logger.warning(string, meta)
            },
    
            /**
             * Alert 로그를 기록합니다.
             * @param {string} string - 로그할 문자열
             * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
             */
            alert: (string, ...meta) => {
                logger.alert(string, meta)
            },
    
            /**
             * Info 로그를 기록합니다.
             * @param {string} string - 로그할 문자열
             * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
             */
            info: (string, ...meta) => {
                logger.info(string, meta)
            },
    
            /**
             * Debug 로그를 기록합니다.
             * @param {string} string - 로그할 문자열
             * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
             */
            debug: (string, ...meta) => {
                logger.debug(string, meta)
            },
    
            /**
             * Trace 로그를 기록합니다.
             * @param {string} string - 로그할 문자열
             * @param  {...any} meta - 추가적인 메타 데이터 (선택 사항)
             */
            trace: (string, ...meta) => {
                logger.trace(string, meta)
            },
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    init,
}