export default {
  providers: [
    {
      domain: 'https://clerk.dashboard.mpesaflow.com',
      applicationID: 'convex',
    },
  ],
}

const domains = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://keen-chow-61.clerk.accounts.dev'
  } else {
    return 'https://clerk.dashboard.mpesaflow.com'
  }
}
