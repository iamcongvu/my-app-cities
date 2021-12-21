using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyAppWebAPI.Extensions;
using MyAppWebAPI.Helpers;
using MyAppWebAPI.Interfaces;
using MyAppWebAPI.Middlewares;
using MyAppWebAPI.Models;
using System.Net;
using System.Text;

namespace MyAppWebAPI
{
    public class Startup
    {
        private readonly string MyAppSpecificOrigins = "MyAppSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MyAppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAppWebAPI", Version = "v1" });
            });
            services.AddCors(options =>
            {
                options.AddPolicy(MyAppSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins(Configuration["AllowOrigins"])
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            var keySecret = Configuration.GetSection("AppSettings:key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keySecret));
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = key,
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.ConfigureExceptionHandler(env);

            //app.ConfigureBuiltinExceptionHandler(env);
            //app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(MyAppSpecificOrigins);
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyAppWebAPI v1"));
        }
    }
}