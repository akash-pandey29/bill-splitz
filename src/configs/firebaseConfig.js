const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const firebaseErrors = {
    'Firebase: Error (auth/user-not-found).': 'User does not exist in our system',
    'Firebase: Error (auth/email-already-exists).': 'Email already exist',
    'Firebase: Error (auth/claims-too-large).': 'Claim is too large',
    'Firebase: Error (auth/id-token-expired).': 'Token Expired',
    'Firebase: Error (auth/id-token-revoked).': 'Toked Revoked',
    'Firebase: Error (auth/insufficient-permission).': 'You do not have permission for this',
    'Firebase: Error (auth/internal-error).': 'Server Error! Please Try again',
    'Firebase: Error (auth/invalid-argument).': 'Please provide valid arguments',
    'Firebase: Error (auth/invalid-claims).': 'Invalid Claim',
    'Firebase: Error (auth/invalid-password).': 'Password is not valid. It should be a string with atleast 6 characters',
    'Firebase: Error (auth/email-already-in-use).': 'This email is already in use',
    'Firebase: Error (auth/uid-already-exists).': 'This record already exist in the system'
};

export default firebaseConfig;
