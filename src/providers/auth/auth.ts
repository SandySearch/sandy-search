import { Injectable } from '@angular/core' // eslint-disable-line no-unused-vars
import { AngularFireAuth } from 'angularfire2/auth' // eslint-disable-line no-unused-vars
import { AngularFireDatabase } from 'angularfire2/database' // eslint-disable-line no-unused-vars
import * as firebase from 'firebase/app' // eslint-disable-line no-unused-vars
// import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  constructor ( // eslint-disable-line no-useless-constructor
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) { }

  getUser (): firebase.User {
    return this.afAuth.auth.currentUser
  }

  loginUser (newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
  }

  anonymousLogin (): Promise<any> {
    return this.afAuth.auth.signInAnonymously()
  }

  linkAccount (email: string, password: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    )

    return this.afAuth.auth.currentUser.linkWithCredential(credential).then(
      user => {
        this.afDatabase.object(`/userProfile/${user.uid}`).update({
          email: email
        })
      },
      error => {
        console.log('There was an error linking the account', error)
      }
    )
  }

  resetPassword (email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  logoutUser (): Promise<void> {
    return this.afAuth.auth.signOut()
  }

  signupUser (newEmail: string, newPassword: string, name: string, phone: string): Promise<any> {
    console.log('name', name)
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword).then(
      user => {
        // TODO add did
        this.afDatabase.object(`/userProfile/${user.uid}`).update({
          email: newEmail,
          name: name,
          phone: phone,
          signupDate: new Date().toLocaleString(),
          confirmed: false
        })
        // then send email verification here
        // https://github.com/angular/angularfire2/issues/904
        //
        // let user:any = firebase.auth().currentUser
        user.sendEmailVerification().then(
          (success) => {
            console.log('please verify your email')
            // FIXME need an alert here to the user
          }
        ).catch(
          error => {
            // this.error = err;
            console.log('There was an error sending verification email to this account', error)
          }
        )
      },
      error => {
        console.log('There was an error adding this account', error)
      }
    )
  }
}
