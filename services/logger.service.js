import fs  from 'fs'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

export const logger = {
    debug(...args) {
        if (process.env.NODE_ENV === 'production') return
        _doLog('DEBUG', ...args)
    },
    info(...args) {
        _doLog('INFO', ...args)
    },
    warn(...args) {
        _doLog('WARN', ...args)
    },
    error(...args) {
        _doLog('ERROR', ...args)
    }
}

function _getTime() {
    let now = new Date()
    return now.toLocaleString('he') //define the time format
}

function _isError(e) {
    return e && e.stack && e.message
}

function _doLog(level, ...args) {

    const strs = args.map(arg => {
        if (typeof arg ===  'string') {
        } else if (_isError(arg)) {
        } else if (arg instanceof Promise) {
            arg = 'Promise'
        } else {
            console.log('STRINGIFY', arg)
            arg = JSON.stringify(arg)    
        }
        return arg
    })   

    var line = strs.join(' | ')
    line = `${_getTime()} - ${level} - ${line} \n`
    console.log(line)
    fs.appendFile('./logs/backend.log', line, (err) =>{
        if (err) console.log('FATAL: cannot write to log file')
    })
}