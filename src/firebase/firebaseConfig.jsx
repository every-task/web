import { initializeApp } from 'firebase/app'


const firebaseConfig = {

    apiKey: "AIzaSyCwhCHHNySbcWeFXV0wTyPzUmhs-l6_1Hk",
    authDomain: "tseee-87629.firebaseapp.com",
    projectId: "tseee-87629",
    storageBucket: "tseee-87629.appspot.com",
    messagingSenderId: "225943910033",
    appId: "1:225943910033:web:54f026c3026d16575e7130",
    measurementId: "G-S8LM22STSL"


}

// 파이어 베이스 스토리지에 앱을 생성하면 자동으로 부여되는 환경설정.
//  apikey 자체는 공개되어도 큰 상관없음. 다만 입력에 대해 보안규칙을 반드시 설정해둘것!!!
// 특히 write 와 관련된 부분을 언제나 allow 해서는 안됨.


export default firebaseConfig