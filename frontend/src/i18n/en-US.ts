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
      createTokenInfo: `Here you can create your AppToken for your application. First you must write a name for your App Token that should 
      be unique for the given application. The name will be converted into a identifer string which will be used throughout the application.
      The Token description should define what actions you want to include in the your token and to what purpose.`,
      BrowseTokenInfo: `This is the service library. Here you can see all the available services and their actions.
      Use the search bar to filter the library based on titles. To request and view further details about a service
      click their respective card. Here you can scroll to the service description and put checkmarks next to the
      actions you want to request. When you've requested at least 1 action you can submit you application for review.
      The respective service owners will then be able to review your request and you can follow along on the next page. `,
      SeeTokenStatusInfo: `Here you can see what actions your token contains. Next to each actions is a symbol showing if
      your request has been approved, rejected or still pending review. Mouse over rejected actions to see the rejection reason.
      If all your actions have been approved you can generate your JWT. Just make sure you have your AppSecret at hand, since you will
      need this to sign the JWT.`,
      GenerateJwtInfo: `Here you can generate your JWT if you have your AppSecret at hand. Your AppSecret is a special
      string that only can be fetched once. Mostly the AppSecret is generated shortly after your application has been made.
      If you don't have your AppSecret try and check with your fellow ApplicationOwners if there are any. If you've lost 
      your AppSecret you need to create a Application from scratch and go through the Create Token progress again.`
    }
  }
};
