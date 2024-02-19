const useLogger = () => {
  const log = (...messages) => {
    if (process.env.NODE_ENV === 'development') {
      const caller = new Error().stack.split('\n')[2].trimEnd()
      console.log(`[${caller}]`, ...messages)
    }
  }

  const errorLog = (...messages) => {
    if (process.env.NODE_ENV === 'development') {
      const caller = new Error().stack.split('\n')[2].trimEnd()
      console.error(...messages)
    }
  }

  return {
    log,
    errorLog
  }
}

export default useLogger
