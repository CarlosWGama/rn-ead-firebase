import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCagNME6xmXGvvzDh2Vq1UItkFncDoU6FM",
  authDomain: "cesmac-ws.firebaseapp.com",
  databaseURL: "https://cesmac-ws.firebaseio.com",
  projectId: "cesmac-ws",
  storageBucket: "cesmac-ws.appspot.com",
  messagingSenderId: "779438039625",
  appId: "1:779438039625:web:9b521e5303191b4f2e1598",
  measurementId: "G-VXJZ0W4MK8"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage)});
export const db = getFirestore();