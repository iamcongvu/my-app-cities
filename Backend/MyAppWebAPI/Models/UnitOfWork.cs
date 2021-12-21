using MyAppWebAPI.Interfaces;
using MyAppWebAPI.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAppWebAPI.Models
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MyAppDbContext _context;

        public UnitOfWork(MyAppDbContext context)
        {
            _context = context;
        }

        public ICityRepository CityRepository => new CityRepository(_context);

        public IUserRepository UserRepository => new UserRepository(_context);

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}