using MyAppWebAPI.Models.Dtos;
using MyAppWebAPI.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAppWebAPI.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetAllCitiesAsync();

        Task<City> GetCityById(int cityId);

        void AddCity(City city);

        void DeleteCity(int cityId);
    }
}