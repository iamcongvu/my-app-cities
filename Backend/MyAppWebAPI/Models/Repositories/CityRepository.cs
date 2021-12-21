using Microsoft.EntityFrameworkCore;
using MyAppWebAPI.Interfaces;
using MyAppWebAPI.Models.Dtos;
using MyAppWebAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAppWebAPI.Models.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly MyAppDbContext _context;

        public CityRepository(MyAppDbContext context)
        {
            _context = context;
        }

        public void AddCity(City city)
        {
            _context.Cities.Add(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = _context.Cities.Find(cityId);
            _context.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetAllCitiesAsync()
        {
            return await _context.Cities.ToListAsync();
        }

        public async Task<City> GetCityById(int cityId)
        {
            return await _context.Cities.FindAsync(cityId);
        }
    }
}