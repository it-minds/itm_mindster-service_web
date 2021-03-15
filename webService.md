
# Domain

```plantuml

class User
{
  ID
  Username
}

class Service
{
  Id
  Title
  Description
  Actions[]
  State
}

class Action
{
  Id
  Title
  Description
  AdminNote
  ServiceId
}

class Application
{
  Id
  Title
  Description
}
class AppToken
{
  Id
  ApplicationId
  AppTokenActions[]
}
class AppTokenAction
{
  Id
  AppTokenId
  ActionId
  State
  RejectionReason
}

Application "1"-->"0..*" AppToken
AppToken "1"-->"0..*" AppTokenActions
Service "1"-->"0..*" Action
```
