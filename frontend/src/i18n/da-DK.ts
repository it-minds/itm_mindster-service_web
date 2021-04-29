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
  applicationScreen: {
    createTokenInfo: `Here you can create your AppToken for your application. First you must write a name for your App Token that should 
    be unique for the given application. The name will be converted into a identifer string which will be used throughout the application.
    The Token descriptions should define what actions you want to include in the your token and to what purpose.`,
    BrowseTokenInfo: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec 
    accumsan velit, ut vulputate est. Proin ut nisi purus. Donec vitae ullamcorper mi, 
    quis pretium ligula. Nulla maximus sagittis ligula eget hendrerit. Fusce ornare quam r
    isus, in pharetra diam convallis vitae. Integer pretium, mauris id fringilla lacinia, nis
    l ex lacinia urna, vel tincidunt ante tellus et lorem. Integer et arcu quis erat placerat

    Quisque rutrum ante et ligula convallis finibus. Interdum et malesuada fames ac`,
    SeeTokenStatusInfo: `Vestibulum at diam vitae urna eleifend ornare eget
     vitae libero. Sed eleifend turpis sed massa mattis, a scelerisque risus 
     posuere. Quisque laoreet magna vitae risus faucibus, ac aliquet erat malesuada. 
     Curabitur elit sem, dictum ac aliquet sed, vulputate at quam. Fusce congue quam 
     non neque mollis blandit. Vestibulum finibus nibh in gravida consectetur. Mauris
      id aliquet eros, sed sollicitudin turpis. Nulla volutpat pellentesque ex, aliquet
       eleifend enim faucibus eu. Quisque feugiat congue lacus, euismod ullamcorper justo
        bibendum sed. In vel facilisis mauris. Morbi laoreet dolor odio, in tristique orci
         placerat a.`,
    GenerateJwtInfo: `Vestibulum at diam vitae urna eleifend ornare eget
    vitae libero. Sed eleifend turpis sed massa mattis, a scelerisque risus 
    posuere. Quisque laoreet magna vitae risus faucibus, ac aliquet erat malesuada. 
    Curabitur elit sem, dictum ac aliquet sed, vulputate at quam. Fusce congue quam 
    non neque mollis blandit. Vestibulum finibus nibh in gravida consectetur. Mauris
     id aliquet eros, sed sollicitudin turpis. Nulla volutpat pellentesque ex, aliquet
      eleifend enim faucibus eu. Quisque feugiat congue lacus, euismod ullamcorper justo
       bibendum sed. In vel facilisis mauris. Morbi laoreet dolor odio, in tristique orci
        placerat a.`
  }
};
