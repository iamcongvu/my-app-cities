using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MyAppWebAPI.Interfaces;
using MyAppWebAPI.Models.Dtos;
using MyAppWebAPI.Models.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MyAppWebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _configuration;

        public AccountController(IUnitOfWork uow, IConfiguration configuration)
        {
            _uow = uow;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _uow.UserRepository.Authentication(loginRequestDto.UserName, loginRequestDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            var loginResponse = new LoginResponseDto()
            {
                UserName = loginRequestDto.UserName,
                Token = CreateJWT(user),
            };
            return Ok(loginResponse);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(LoginRequestDto loginRequestDto)
        {
            if (await _uow.UserRepository.UserAlreadyExists(loginRequestDto.UserName))
            {
                return BadRequest("User already exists, please try something else");
            }
            _uow.UserRepository.Register(loginRequestDto.UserName, loginRequestDto.Password);
            await _uow.SaveAsync();
            return StatusCode(201);
        }

        private string CreateJWT(User user)
        {
            var keySecret = _configuration.GetSection("AppSettings:key").Value;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keySecret));
            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };
            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}