export const environments = {
  testonline1: {
    name: 'Test Online 1',
    script:
      'https://testcdnamisapp.misacdn.net/chat/bubble-chat/v1/index.js',
  },

  testonline2: {
    name: 'Test Online 2',
    script:
      'https://testonline2-cdn.misa.vn/chat/g2/bubble-chat/v1/index.js',
  },

  production1: {
    name: 'Production 1',
    script:
      'https://production1-cdn.misa.vn/chat/bubble-chat/v1/index.js',
  },

  production2: {
    name: 'Production 2',
    script:
      'https://production2-cdn.misa.vn/chat/bubble-chat/v1/index.js',
  },
} as const;

export type EnvironmentKey = keyof typeof environments;
