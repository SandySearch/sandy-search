how to gen cert and sign release apks
----------------------------------------

Generate a new cert and key with keytool:

"C:\Program Files (x86)\Java\jdk1.8.0_131\bin\keytool" -genkey -v -keystore rko-release-key.keystore -alias rkosecurity -keyalg RSA -keysize 2048 -validity 10000

password = rkosecurity

Then sign the unsigned APK file:

"C:\Program Files (x86)\Java\jdk1.8.0_162\bin\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore .\rko-release-key.keystore sandysearch-007-unsigned.apk rkosecurity

Then zipalign the signed APK:

"C:\Program Files (x86)\Android\android-sdk\build-tools\23.0.3\zipalign" -v 4 sandysearch-007-signed.apk SandySearch-007.apk

or on TB2

"C:\Users\dbadmin\AppData\Local\Android\android-sdk\build-tools\23.0.3\zipalign" -v 4 aa2-222-android-release-signed.apk AquinasAlpha-222.apk

or on Silver HP

"C:\Users\mkobar\AppData\Local\Android\android-sdk\build-tools\27.0.3\zipalign" -v 4 alr3-2315-android-release-signed.apk AquinasLR3-2315.apk

or on TB7

"C:\Users\dbadmin\AppData\Local\Android\sdk\build-tools\26.0.3\zipalign" -v 4 sandysearch-007-unsigned.apk SandySearch-007.apk

Then test new app on phone.

Then upload to Google Play.

#EOF
