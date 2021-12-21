using Microsoft.EntityFrameworkCore;
using MyAppWebAPI.Interfaces;
using MyAppWebAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MyAppWebAPI.Models.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MyAppDbContext _context;

        public UserRepository(MyAppDbContext context)
        {
            _context = context;
        }

        public async Task<User> Authentication(string userName, string passwordText)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null || user.PasswordKey == null)
                return null;

            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey))
                return null;

            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i])
                        return false;
                }
                return true;
            };
        }

        public void Register(string userName, string password)
        {
            byte[] passwordHash, passwordKey;
            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            };
            var user = new User();
            user.UserName = userName;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;

            _context.Users.Add(user);
        }

        public async Task<bool> UserAlreadyExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName);
        }
    }
}