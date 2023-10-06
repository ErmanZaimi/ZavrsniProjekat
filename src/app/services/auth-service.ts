import { Injectable, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

interface User {
    uid: string;
    email: string;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    userData: any;
    userVerification: any;
    user: any;
    authState$ = this.angularFireAuth.authState;

    constructor(
        public angularFireStore: AngularFirestore,
        public angularFireAuth: AngularFireAuth,
        public router: Router,
    ) {
        this.authState$.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem("user", JSON.stringify(this.userData));
            }
            else {
                localStorage.setItem("user", 'null');
            }
        });
    }
 

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem("user")!);
        return user !== null && user.emailVerified !== false ? true : false;
    }

    getToken() {
        const user = JSON.parse(localStorage.getItem("user")!);
        const token = user !== null ? user.stsTokenManager.accessToken : null;
        return token;
    }

    signUp(email: string, password: string) {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.SendVerificationMail();
                this.userVerification = result.user;
            })
            .catch((error) => {
                window.alert(error.message);
            })
    }

    LogIn(email: string, password: string) {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.user?.emailVerified) {
                    this.router.navigate(['']);
                    this.setUserData(result.user);
                }
                else {
                    alert("Please verify your email address.")
                }
            })
            .catch((error) => {
                alert(error.message);
                alert("Invalid email or password")
            })
    }

    logOut() {
        return this.angularFireAuth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                this.router.navigate(['login']);
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    }

    setUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
            `users/${user.uid}`
        );
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    SendVerificationMail() {
        return this.angularFireAuth.currentUser
            .then((user) => {
                if (user) return user.sendEmailVerification();
                return
            })
            .then(() => {
                this.router.navigate(['verify-email-address']);
            });
         
    }

}


