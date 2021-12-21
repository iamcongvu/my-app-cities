using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MyAppWebAPI.Errors;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Net;

namespace MyAppWebAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
                                IWebHostEnvironment env)
        {
            _logger = logger;
            _next = next;
            _env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                ApiError respone;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                var exceptionType = ex.GetType();
                string message;
                if (exceptionType == typeof(Exception))
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not role"; 
                }else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Some unknown error orrcured";
                }
                if (_env.IsDevelopment())
                {
                    respone = new ApiError((int)statusCode, ex.Message, ex.StackTrace.ToString());
                }
                else
                {
                    respone = new ApiError((int)statusCode, message);
                }
                _logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(respone.ToString());
            }
        }
    }
}