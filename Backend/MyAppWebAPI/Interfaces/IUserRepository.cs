using MyAppWebAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAppWebAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authentication(string userName, string password);

        void Register(string userName, string password);

        Task<bool> UserAlreadyExists(string userName);
    }
}