export interface Locale {
  locale: string; // !Must not be deleted. Used for providing the locale in the native language

  entityVariables: {
    name: string;
    identifier: string;
    description: string;
    title: string;
    actions: string;
    adminNote: string;
  };
  commonButtons: {
    close: string;
    submit: string;
    showMore: string;
    copy: string;
  };
  entityNames: {
    single: {
      application: string;
      service: string;
      action: string;
      token: string;
      user: string;
      approver: string;
      owner: string;
    };
    plural: {
      applications: string;
      services: string;
      actions: string;
      tokens: string;
      users: string;
      approvers: string;
      owners: string;
    };
  };
  SelectorTabs: {
    recent: string;
    starred: string;
    all: string;
  };
  applicationScreen: {
    serviceLibrary: {
      searchForService: string;
      amountOfActions: string;
      requested: string;
      requestAccess: string;
    };

    modalHeaders: {
      addOwners: string;
      selectApp: string;
      createNewToken: string;
      serviceLibrary: string;
      tokenStatus: string;
      getJwt: string;
      generateAppSecret: string;
      hereIsYourAppSecret: string;
    };
    buttons: {
      createApp: string;
      toServicePage: string;
      addOwners: string;
      createToken: string;
    };
    tokens: {
      actions: {
        browseServices: string;
        requestReview: string;
        checkStatus: string;
        generateJwt: string;
        requestActions: string;
      };
      infoBoxes: {
        createTokenInfo: string;
        BrowseTokenInfo: string;
        SeeTokenStatusInfo: string;
        GenerateJwtInfo: string;
      };
      appSecret: {
        appSecretPlaceholder: string;
        appSecretWarningBar: string;
        appSecretWarning: string;
        generateSecret: string;
      };
    };
  };
  serviceScreen: {
    modalHeaders: {
      selectService: string;
    };
    buttons: {
      createNewService: string;
      toAppPage: string;
      addOwners: string;
      createNewAction: string;
    };
    actions: {
      viewApprovers: string;
      viewApproversHeader: string;
      addApprovers: string;
      addApproversHeader: string;
      addApproversInfo: string;
      copyApproversToAnotherAction: string;
      copyApproversHeader: string;
      copyApprovers: string;
    };
  };

  example: {
    title: string;
    byLine: string;
    dataLine: string;

    actions: {
      addNew: string;
    };
  };
}
