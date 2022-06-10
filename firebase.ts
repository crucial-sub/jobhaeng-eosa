// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAnxU6Hx7FJ-zVTNsMKGc54YjpDID2Gfu4',
    authDomain: 'job-hang-a-sa-f0dd7.firebaseapp.com',
    projectId: 'job-hang-a-sa-f0dd7',
    storageBucket: 'job-hang-a-sa-f0dd7.appspot.com',
    messagingSenderId: '344216554127',
    appId: '1:344216554127:web:86f433b4f45d02ef1cfefa',
    measurementId: 'G-P0NBKN0SBN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
