using AutoMapper;
using MyAppWebAPI.Models.Dtos;
using MyAppWebAPI.Models.Entities;

namespace MyAppWebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();
            //CreateMap<CityDto, City>();
        }
    }
}