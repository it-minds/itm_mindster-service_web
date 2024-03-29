using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Moq;
using System;
using System.Collections.Generic;
using Action = Domain.Entities.Action;

namespace Application.UnitTests
{
  public static class ApplicationDbContextFactory
  {
    public static ApplicationDbContext Create()
    {
      var options = new DbContextOptionsBuilder<ApplicationDbContext>()
          .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning))
          .UseInMemoryDatabase(Guid.NewGuid().ToString())
          .Options;

      var dateTimeMock = new Mock<IDateTimeOffsetService>();
      dateTimeMock.Setup(m => m.Now)
          .Returns(new DateTimeOffset(3001, 1, 1, 1, 1, 1, TimeSpan.Zero));

      var currentUserServiceMock = new Mock<ICurrentUserService>();
      currentUserServiceMock.Setup(m => m.UserEmail)
          .Returns("test@mail.dk");

      var context = new ApplicationDbContext(options, currentUserServiceMock.Object, dateTimeMock.Object);

      context.Database.EnsureCreated();

      SeedSampleData(context);

      return context;
    }

    public static void SeedSampleData(ApplicationDbContext context)
    {
      context.ExampleParents.AddRange(
          new ExampleParent() { Id = 1, Name = "Test 1" },
          new ExampleParent() { Id = 2, Name = "Test 2" }
      );

      context.ExampleChildren.AddRange(
          new ExampleChild { Id = 1, ParentId = 1, Name = "Bread", Type = ExampleEnum.Youngest },
          new ExampleChild { Id = 2, ParentId = 1, Name = "Butter", Type = ExampleEnum.Youngest },
          new ExampleChild { Id = 3, ParentId = 1, Name = "Milk", Type = ExampleEnum.Middle },
          new ExampleChild { Id = 4, ParentId = 2, Name = "Sugar", Type = ExampleEnum.Middle },
          new ExampleChild { Id = 5, ParentId = 2, Name = "Coffee", Type = ExampleEnum.Oldest }
      );
      context.Services.AddRange(
        new Service
        {
          Id = 1,
          Title = "First",
          Description = "Desc for 1",
          State = ServiceStates.Approved,
          ServiceIdentifier = "first",
          Actions = new List<Action>
          {
            new Action {Id = 1, Title = "Title for 1",ActionIdentifier = "title_for_one",Description = "1 desc", ServiceId = 1, AdminNote = "Admin says 1"},
            new Action {Id = 2, Title = "Title for 2", ActionIdentifier = "title_for_two",Description = "2 desc", ServiceId = 1, AdminNote = "Admin says 2"}
          }
        },
        new Service
        {
          Id = 2,
          Title = "Second",
          Description = "Desc for 2",
          ServiceIdentifier = "second",
          State = ServiceStates.Pending,
          Actions = new List<Action>
          {
            new Action {Id = 3, Title = "Title for 3", ActionIdentifier = "title_for_three", Description = "3 desc", ServiceId = 2, AdminNote = "Admin says 3"},
            new Action {Id = 4, Title = "Title for 4", ActionIdentifier = "title_for_four", Description = "4 desc", ServiceId = 2, AdminNote = "Admin says 4"}
          }
        },
        new Service
        {
          Id = 3,
          Title = "Third",
          Description = "Desc for 3",
          ServiceIdentifier = "third",
          State = ServiceStates.Rejected,
          Actions = new List<Action>
          {
            new Action {Id = 5, Title = "Title for 5", ActionIdentifier = "title_for_six", Description = "5 desc", ServiceId = 3, AdminNote = "Admin says 5"},
            new Action {Id = 6, Title = "Title for 6", ActionIdentifier = "title_for_seven", Description = "6 desc", ServiceId = 3, AdminNote = "Admin says 6"}
          }
        }
        );
      context.ServiceOwners.AddRange(
        new ServiceOwner
        {
          Id = 1,
          ServiceId = 1,
          Email = "test@mail.dk"
        },
        new ServiceOwner
        {
          Id = 2,
          ServiceId = 2,
          Email = "test@mail.dk"
        },
        new ServiceOwner()
        {
          Id = 3,
          ServiceId = 1,
          Email = "iAlsoOwnService1@mail.dk"
        }
      );

      context.ActionApprovers.AddRange(
        new ActionApprover
        {
          Id = 1,
          ActionId = 1,
          Email = "test@mail.dk"
        },
        new ActionApprover
        {
          Id = 2,
          ActionId = 2,
          Email = "test@mail.dk"
        },
        new ActionApprover()
        {
          Id = 3,
          ActionId = 1,
          Email = "iAlsoOwnAction1@mail.dk"
        },
        new ActionApprover()
        {
          Id = 4,
          ActionId = 4,
          Email = "test3@mail.dk"
        }
      );

      context.Applications.AddRange(
        new ApplicationEntity { Id = 1, Title = "App 1", Description = "The First", AppIdentifier = "app_one"},
        new ApplicationEntity { Id = 2, Title = "App 2", Description = "The Second", AppIdentifier = "app_two", AppSecretGenerated = true},
        new ApplicationEntity { Id = 3, Title = "App 3", Description = "The Third" , AppIdentifier = "app_three"}
        );

      context.AppOwners.AddRange(
        new ApplicationOwner()
        {
          Id = 1,
          ApplicationId = 1,
          Email = "test@mail.dk"
        },
        new ApplicationOwner
        {
          Id = 2,
          ApplicationId = 2,
          Email = "test@mail.dk"
        },
        new ApplicationOwner
        {
          Id = 3,
          ApplicationId = 1,
          Email = "iAlsoOwnApp1@mail.dk"
        }
        );
      context.AppTokens.AddRange(
        new AppToken
          {
          Id = 1,
          ApplicationId = 1,
          Description = "Den første appToken",
          TokenIdentifier = "den_første_app_token",
          State = TokenStates.AwaitingReview,
          AppTokenActions = new List<AppTokenAction>{
              new AppTokenAction{ Id = 1, AppTokenId = 1, ActionId = 1, State = ServiceStates.Pending},
              new AppTokenAction{ Id = 2, AppTokenId = 1, ActionId = 2, State = ServiceStates.Pending},
              new AppTokenAction{ Id = 3, AppTokenId = 1, ActionId = 5, State = ServiceStates.Approved}
            }
        },
          new AppToken
          {
            Id = 2,
            ApplicationId = 2,
            Description = "Den anden appToken",
            TokenIdentifier = "den_anden_app_token",
            State = TokenStates.Reviewed,
            AppTokenActions = new List<AppTokenAction>
            {
              new AppTokenAction{ Id = 4, AppTokenId = 2, ActionId = 1, State = ServiceStates.Approved},
              new AppTokenAction{ Id = 5, AppTokenId = 2, ActionId = 3, State = ServiceStates.Rejected}
            }
          }
        );

      context.SaveChanges();
    }

    public static void Destroy(ApplicationDbContext context)
    {
      context.Database.EnsureDeleted();

      context.Dispose();
    }
  }
}
