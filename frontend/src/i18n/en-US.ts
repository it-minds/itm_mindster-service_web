import { Locale } from "./Locale";

export const table: Locale = {
  locale: "English (US)",

  example: {
    title: "Service Table",
    byLine: "When data is loading it is displayed below",
    dataLine: "Child {{id}} of type {{type}}",

    actions: {
      addNew: "Add new Child"
    }
  },
  applicationScreen: {
    infoBoxes: {
      createTokenInfo: `Here you can create a AppToken for your application. AppTokens are used to define a scope of services that your
      application wants to use. To create a AppToken you must first write a name that needs to be unique for the given application.
      The name will be converted into a identifer string which will be used throughout the application. Next you must write a 
      description of your tokens scope. Here you should describe what actions you are going to need as well as to what purpose.`,
      BrowseTokenInfo: `This is the service library where you can see all the available services and their actions.
      Use the search bar to filter the library based on service titles. To request and view further details about a service
      click their respective card. Here you can scroll through the service description to read about what each action does and how
      it is used, and finally at the end you can put checks next to the actions you want to request.
      After you've requested your actions there will be a button at the bottom of the screen which will submit your token for review.
      The respective service owners will then be able to review your request. You can follow the process on the next page
      or from the token table on the Application Screen.`,
      SeeTokenStatusInfo: `Here you can see what actions your token contains as well as their current status. Next to each actions is a symbol showing if
      your request has been approved, rejected or still pending for review. Mouse over rejected actions to see the rejection reason.
      If all your actions have been approved you can generate your JWT. The JWT is based on your unique Application identifer and your
      unique token identifer and its approved service actions. Finally you will also need to input your App Secret in order to sign the JWT.`,
      GenerateJwtInfo: `Here you can generate your JWT if you have your AppSecret at hand. Your AppSecret is a special
      string that only can be fetched once. Mostly the AppSecret is generated shortly after your application has been made.
      If you don't have your AppSecret try and check with your fellow ApplicationOwners to see if perhaps they've already generated it. If you've lost 
      your AppSecret you need to create a Application from scratch and go through the Create Token progress again. The generated JWT can
      then be used in your application to verify that you have access to the requested services and actions.`
    }
  }
};
