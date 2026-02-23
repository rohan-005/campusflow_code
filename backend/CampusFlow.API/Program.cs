using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Application.Interfaces.Services;
using CampusFlow.Domain.Entities;
using CampusFlow.Domain.Enums;
using CampusFlow.Infrastructure.Data;
using CampusFlow.Infrastructure.Repositories;
using CampusFlow.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --------------------------------------------------
// DATABASE
// --------------------------------------------------
builder.Services.AddDbContext<CampusFlowDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// --------------------------------------------------
// SERVICES (Dependency Injection)
// --------------------------------------------------
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();

// Resource Module
builder.Services.AddScoped<IResourceRepository, ResourceRepository>();

// Asset Module
builder.Services.AddScoped<IAssetRepository, AssetRepository>();
builder.Services.AddScoped<IAssetRequestRepository, AssetRequestRepository>();
builder.Services.AddScoped<AssetService>();
builder.Services.AddScoped<AssetRequestService>();

builder.Services.AddControllers();

// --------------------------------------------------
// JWT AUTHENTICATION
// --------------------------------------------------
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

// --------------------------------------------------
// SWAGGER
// --------------------------------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --------------------------------------------------
// CORS
// --------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

// --------------------------------------------------
// MIDDLEWARE PIPELINE
// --------------------------------------------------
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// --------------------------------------------------
// DEFAULT ADMIN SEEDING (BCrypt)
// --------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CampusFlowDbContext>();

    // Apply migrations automatically
    context.Database.Migrate();

    if (!context.Users.Any(u => u.Email == "admin@campusflow.com"))
    {
        var admin = new User
        {
            Name = "System Admin",
            StudentId = "ADMIN001",
            Email = "admin@campusflow.com",
            Role = UserRole.Admin,
            CreatedAt = DateTime.UtcNow,
            IsActive = true,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123")
        };

        context.Users.Add(admin);
        context.SaveChanges();
    }
}

app.Run();