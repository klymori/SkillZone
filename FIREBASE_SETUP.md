# Firebase Setup Guide for SkillZone

This guide will help you set up Firebase for the SkillZone project.

## Prerequisites

1. Create a Firebase account at [https://firebase.google.com/](https://firebase.google.com/)
2. Install the Firebase CLI: `npm install -g firebase-tools`

## Setting up Firebase Project

### 1. Create a new Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter "SkillZone" as the project name
4. Follow the setup wizard to complete project creation

### 2. Enable Firebase Authentication

1. In the Firebase Console, navigate to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the following sign-in methods:
   - Email/Password
   - Google

### 3. Set up Cloud Firestore

1. In the Firebase Console, navigate to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for now (we'll update rules later)
4. Select a location closest to your users

### 4. Set up Cloud Storage

1. In the Firebase Console, navigate to "Storage" in the left sidebar
2. Click "Get started"
3. Follow the setup wizard to complete Storage configuration

### 5. Get Firebase Configuration

The project is already configured with the following Firebase settings:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyByc-b2FXaHofUObvjcG3v-I0_CGFSnmy4",
  authDomain: "skillzone-klymori.firebaseapp.com",
  projectId: "skillzone-klymori",
  storageBucket: "skillzone-klymori.appspot.com",
  messagingSenderId: "160727170773",
  appId: "1:160727170773:web:9f034e0bfdfac6b4be2c5c",
  measurementId: "G-GDBGL51SRM"
};
```

These values are already set in the `.env` file, so no additional configuration is needed.

### 6. Deploy Firestore Security Rules

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
4. Select "Firestore" and "Storage" when prompted
5. Deploy the rules: `firebase deploy --only firestore:rules`

## Testing the Setup

1. Start the development server: `npm run dev`
2. Navigate to the login/registration pages
3. Test user registration and login
4. Verify that user data is stored in Firestore
5. Test course creation and retrieval
6. Test review and like functionality

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Make sure all environment variables are set correctly
2. **Permission denied**: Check that Firestore rules are deployed correctly
3. **Authentication errors**: Verify that the correct sign-in methods are enabled

### Debugging Tips

1. Check the browser console for error messages
2. Use the Firebase Console to monitor database operations
3. Enable Firebase debugging by setting `window.firebase = firebase` in the console

## Security Considerations

1. Never commit Firebase configuration to version control
2. Use environment variables for sensitive configuration
3. Regularly review and update Firestore security rules
4. Monitor Firebase usage and set up billing alerts

## Next Steps

1. Implement Firebase Functions for server-side logic
2. Set up Firebase Hosting for production deployment
3. Configure Firebase Analytics for user behavior tracking
4. Implement Firebase Cloud Messaging for notifications