export default function () {
  return process.env.NODE_ENV === 'production'
    ? {
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      apiServer: process.env.REACT_APP_API_SERVER,
      authDomain: 'school-5927d.firebaseapp.com',
      databaseURL: 'https://school-5927d.firebaseio.com',
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
      ],
      projectId: 'school-5927d',
      scopes: ['https://www.googleapis.com/auth/drive']
    }
    : {
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY_DEV,
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID_DEV,
      apiServer: process.env.REACT_APP_API_SERVER_DEV,
      authDomain: 'school-dev-28e75.firebaseapp.com',
      databaseURL: 'https://school-dev-28e75.firebaseio.com',
      projectId: 'school-dev-28e75',
      storageBucket: 'school-dev-28e75.appspot.com',
      scopes: ['https://www.googleapis.com/auth/drive'],
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
      ]
    }
}
