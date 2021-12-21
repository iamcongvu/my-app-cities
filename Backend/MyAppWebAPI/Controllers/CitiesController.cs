using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using MyAppWebAPI.Interfaces;
using MyAppWebAPI.Models.Dtos;
using MyAppWebAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAppWebAPI.Controllers
{
    [Authorize]
    public class CitiesController : BaseController
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CitiesController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _uow.CityRepository.GetAllCitiesAsync();
            //var citiesDto = from c in data
            //                select new CityDto()
            //                {
            //                    Id = c.Id,
            //                    Name = c.Name
            //                };
            var citiesDto = _mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto);
        }

        // or [HttpPost("add/{cityName}")] -> test spi: https://localhost:11111/api/citites/add/LosAngeles
        // or [HttpPost("add")] -> test api: https://localhost:11111/api/citites/add?cityName=LosAngeles
        [HttpPost("post")]
        public async Task<IActionResult> PostCity(CityDto cityDto)
        {
            //var city = new City()
            //{
            //    Name = cityDto.Name,
            //    LastUpdatedBy = 1,
            //    LastUpdatedOn = System.DateTime.Now,
            //};
            var city = _mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = System.DateTime.Now;

            _uow.CityRepository.AddCity(city);
            await _uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{cityId:int}")]
        public async Task<IActionResult> PutCity(int cityId, CityDto cityDto)
        {
            if (cityId != cityDto.Id)
            {
                return BadRequest($"Can not found city with Id: {cityId}");
            }
            var city = await _uow.CityRepository.GetCityById(cityId);
            if (city == null)
                return NotFound($"Can not found city with Id: {cityId}");

            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = System.DateTime.Now;
            _mapper.Map(cityDto, city);
            await _uow.SaveAsync();
            return StatusCode(200);
        }

        // update patch name
        [HttpPut("updateCityName/{cityId:int}")]
        public async Task<IActionResult> PutCity(int cityId, CityUpdateDto cityUpdateDto)
        {
            var city = await _uow.CityRepository.GetCityById(cityId);
            if (city == null)
                return NotFound($"Can not found city with Id: {cityId}");

            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = System.DateTime.Now;
            _mapper.Map(cityUpdateDto, city);
            await _uow.SaveAsync();
            return StatusCode(200);
        }

        // donot use HTTP Patch in .net core
        // beacause:
        // System.Text.Json: not support for Patch Json
        // No support of Json Patch in .net 5
        // no Plan for support in upcomming versions as well
        // client can perform operations as per their choice
        //[HttpPatch("update/{cityId}")]
        //public async Task UpdatePatchCity(int cityId, JsonPatchDocument<City> cityToPatch)
        //{
        //    var cityFromDb = await _uow.CityRepository.GetCityById(cityId);
        //    cityFromDb.LastUpdatedBy = 1;
        //    cityFromDb.LastUpdatedOn = System.DateTime.Now;
        //    cityToPatch.ApplyTo(cityFromDb);
        //    await _uow.SaveAsync();
        //}

        [HttpDelete("delete/{cityId:int}")]
        public async Task<IActionResult> DeleteCity(int cityId)
        {
            _uow.CityRepository.DeleteCity(cityId);
            await _uow.SaveAsync();
            return Ok();
        }
    }
}