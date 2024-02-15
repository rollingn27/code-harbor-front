const useLogger = () => {
  const log = (...messages) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...messages)
    }
  }

  const errorLog = (...messages) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(...messages)
    }
  }

  return {
    log,
    errorLog
  }
}

export default useLogger
