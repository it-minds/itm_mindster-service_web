import { Locale } from "./Locale";

export const table: Locale = {
  locale: "Dansk",

  example: {
    title: "Service tabel",
    byLine: "Når dataen er indhentet vises den her",
    dataLine: "{{type}} Barn {{id}} ",

    actions: {
      addNew: "Tilføj et nyt barn"
    }
  },
  entityVariables: {
    name: "Navn",
    identifier: "Identifikator",
    description: "Beskrivelse",
    title: "Titel",
    actions: "Handlinger",
    adminNote: "Admin note"
  },
  commonButtons: {
    close: "Luk",
    submit: "Indsend",
    showMore: "Vis mere",
    showLess: "Vis mindre",
    copy: "Kopier",
    yes: "Ja",
    no: "Nej"
  },
  googleSearch: {
    addOwner: "Tilføj ejer",
    addOwnerText:
      "Tilføj en ny ejer ved at søge efter personen nedenunder og derefter trykke på deres navn",
    addApprover: "Tilføj godkender",
    addApproverText:
      "Tilføj en godkender ved at søge efter personen nedenunder og derefter trykke på deres navn",
    searchPlaceholder: "Søg efter en It-Minds medarbejder"
  },
  alerts: {
    approvers: {
      header: "Bekræft godkendere der skal tilføjes",
      text: "Er du sikker på at du vill tilføje disse godkendere til din action?"
    },
    serviceOwners: {
      header: "Bekræft ejere der skal tilføjes",
      text: "Er du sikker på at du vill tilføje disse godkendere til din service?"
    },
    appOwners: {
      header: "Bekræft ejere der skal tilføjes",
      text: "Er du sikker på at du vill tilføje disse godkendere til din applikation?"
    }
  },
  entityNames: {
    single: {
      application: "Applikation",
      service: "Service",
      action: "Handling",
      token: "Token",
      user: "Bruger",
      approver: "Godkender",
      owner: "Ejer"
    },
    plural: {
      applications: "Applikationer",
      services: "Services",
      actions: "Handlinger",
      tokens: "Tokens",
      users: "Brugere",
      approvers: "Godkendere",
      owners: "Ejere"
    }
  },
  SelectorTabs: {
    recent: "Nylige",
    starred: "Stjernemærket",
    all: "Alle"
  },
  applicationScreen: {
    serviceLibrary: {
      searchForService: "Søg efter en Service",
      amountOfActions: "Antal handlinger",
      requested: "Anmodet",
      requestAccess: "Anmod om adgang"
    },
    modalHeaders: {
      addOwners: "Tilføj ejere",
      selectApp: "Vælg applikation",
      createNewToken: "Opret ny Token",
      serviceLibrary: "Service Bibliotek",
      tokenStatus: "Status for: ",
      getJwt: "Få JWT'en for din godkendte token;",
      generateAppSecret: "Er du sikker på at du gerne vil generere din applikations AppSecret?",
      hereIsYourAppSecret: "Her er din AppSecret"
    },
    buttons: {
      createApp: "Opret ny applikation",
      toServicePage: "Service siden",
      addOwners: "Tilføj ejerer;",
      createToken: "Opret ny token;"
    },
    tokens: {
      actions: {
        browseServices: "Find services",
        requestReview: "Anmod om gennemgang",
        checkStatus: "Se status",
        generateJwt: "Generer JWT",
        requestActions: "Andmod om handlinger"
      },
      infoBoxes: {
        createTokenInfo: `(Danish)Here you can create a AppToken for your application. AppTokens are used to define a scope of services that your
        application wants to use. To create a AppToken you must first write a name that needs to be unique for the given application.
        The name will be converted into a identifer string which will be used throughout the application. Next you must write a 
        description of your tokens scope. Here you should describe what actions you are going to need as well as to what purpose.`,
        BrowseTokenInfo: `(DANISH)This is the service library where you can see all the available services and their actions.
        Use the search bar to filter the library based on service titles. To request and view further details about a service
        click their respective card. Here you can scroll through the service description to read about what each action does and how
        it is used, and finally at the end you can put checks next to the actions you want to request.
        After you've requested your actions there will be a button at the bottom of the screen which will submit your token for review.
        The respective service owners will then be able to review your request. You can follow the process on the next page
        or from the token table on the Application Screen.`,
        SeeTokenStatusInfo: `(DANISH)Here you can see what actions your token contains as well as their current status. Next to each actions is a symbol showing if
        your request has been approved, rejected or still pending for review. Mouse over rejected actions to see the rejection reason.
        If all your actions have been approved you can generate your JWT. The JWT is based on your unique Application identifer and your
        unique token identifer and its approved service actions. Finally you will also need to input your App Secret in order to sign the JWT.`,
        GenerateJwtInfo: `(DANISH)Here you can generate your JWT if you have your AppSecret at hand. Your AppSecret is a special
        string that only can be fetched once. Mostly the AppSecret is generated shortly after your application has been made.
        If you don't have your AppSecret try and check with your fellow ApplicationOwners to see if perhaps they've already generated it. If you've lost 
        your AppSecret you need to create a Application from scratch and go through the Create Token progress again. The generated JWT can
        then be used in your application to verify that you have access to the requested services and actions.`
      },
      appSecret: {
        appSecretPlaceholder: "Du fik denne da du oprettede applikationen",
        appSecretWarningBar: `Du har ikke generet en AppSecret til denne applikation. Dette er nødvendigt før du kan oprette tokens
        og derfra JWT's`,
        appSecretWarning: `Dette kan kun gøres en gang og du er selv ansvarlig for at holde din secret sikker og hemmelig.
        Du bruger AppSecret'en til at signere dine tokens for derefter at få genereret en JWT`,
        generateSecret: "Generer AppSecret"
      }
    }
  },
  serviceScreen: {
    modalHeaders: {
      selectService: "Vælg Service",
      addOwners: "Tilføj ejere til: {{service}}",
      addAction: "Opret ny handling"
    },
    buttons: {
      createNewService: "Opret service",
      toAppPage: "Applikation side",
      addOwners: "Tilføj ejere",
      createNewAction: "Opret handling"
    },
    actions: {
      viewApprovers: "Vis godkendere",
      viewApproversHeader: "Handlings godkendere for: {{title}}",
      addApprovers: "Tilføj godkendere",
      addApproversHeader: "Tilføj godkendere til: {{title}}",
      copyApproversToAnotherAction: "Kopier godkendere til en anden handling",
      copyApproversHeader: "Kopier følgende godkendere fra: {{title}}",
      copyApprovers: "Kopier godkendere"
    },
    pendingTokens: {
      header: "Tokens der afventer svar",
      cardTitle: "Token: {{identifier}} med {{count}} handlinger",
      reviewToken: "Gennemgå",
      reviewModal: {
        header: "Godkend eller afvis handlingerne for token: {{identifier}}",
        responses: {
          pending: "Afventer",
          approved: "Godkendt",
          rejected: "Afvist"
        },
        response: "Svar",
        rejectionReason: "Årsag til afvisning"
      }
    }
  }
};
