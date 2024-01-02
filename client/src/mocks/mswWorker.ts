export const initMSW = async (isMSWEnv: string = 'false') => {
  if (isMSWEnv !== 'true') return

  const { worker } = await import('@/mocks/browser')
  await worker.start({
    onUnhandledRequest(request, print) {
      if (request.url.includes('/api/')) {
        print.error()
      }
      // Otherwise, do not print anything
    }
  })
  console.groupCollapsed('[MSW] mocked Requests -----------------------------------------')
  console.log(worker.listHandlers().map((handler) => handler.info.header))
  console.groupEnd()
}
