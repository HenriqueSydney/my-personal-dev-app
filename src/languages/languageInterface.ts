export interface Translations {
  globals: {
    welcome: string
    job: string
    jobDescription: string
    resume: string
    year: string
    profile: string
    search: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    sendButtonLabel: string
    newsLatterLabel: string
    userImageAlt: string
  }
  notFound: {
    notFoundMessage: string
    goToHomePage: string
  }
  homeScreen: {
    projectListTitle: string
    postList: {
      title: string
      readMorePostsButtonLabel: string
    }
    contactContainer: {
      title: string
      contactEmailPlaceholder: string
      messageSendSuccessMessage: string
    }
  }
  loginScreen: {
    header: string
    title: string
    headerImageAlt: string
    fieldSetTitle: string
    passwordLabel: string
    loginButtonLabel: string
    signUpButtonLabel: string
  }
  signUpScreen: {
    header: string
    passwordLabel: string
    confirmPasswordLabel: string
    signUpButtonLabel: string
    selectPictureMenuOptionTitle: string
    takePictureMenuOptionTitle: string
    signUpSuccessMessage: string
  }
  profile: {
    signOutLabel: string
    updateProfileButtonLabel: string
    deleteAccountButtonLabel: string
    changePasswordLabel: string
    oldPasswordLabel: string
    newPasswordLabel: string
    confirmPasswordLabel: string
    updatePasswordLabel: string
    updatePasswordSuccessMessage: string
    updateProfileSuccessMessage: string
  }
  resumeScreen: {
    title: string
    headerImageAlt: string
    profileTitle: string
    employmentsTitle: string
    educationTitle: string
    languageFluencyTitle: string
  }
  blogScreen: {
    title: string
    headerImageAlt: string
  }
  postScreen: {
    readTime: string
  }
  sharedMessages: {
    missMatchPasswords: string
    photoSelectionCanceled: string
    askForPhotoSelection: string
    errors: {
      userAlreadyExists: string
      genericError: string
      userNotFound: string
      wrongCredentials: string
      urlOpeningFails: string
    }
  }
  cameraApi: {
    noPermission: string
    askPermissionTitle: string
    askPermissionMessage: string
    authorizedButtonLabel: string
    captureError: string
    captureSuccessMessage: string
    retakePictureButtonLabel: string
    usePictureButtonLabel: string
  }
}
