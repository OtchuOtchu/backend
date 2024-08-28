const admin = require("firebase-admin");

// Firebase Admin 초기화 (서비스 계정 키 필요)
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firebase Authentication (ID Token 확인)
async function verifyIdToken(idToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    return uid;
  } catch (err) {
    return false;
  }
}

module.exports = {
  verifyIdToken,
};
