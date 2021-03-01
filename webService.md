
# Domain

```plantuml
class User
{
  ID
  Username
}

class Service
{
  Title
  Description
  Actions[]
  State
}

class Action
{
  Title
  Description
  AdminNote
}

class Application
{
  Title
  Description
}


Service "1"-->"0..*" Action


```
