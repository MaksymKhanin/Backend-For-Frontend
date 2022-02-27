// This code is under Copyright (C) 2021 of Cegid SAS all right reserved

using Azure.Identity;
using Duende.Bff;
using Duende.Bff.Yarp;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsProduction())
{
    builder.Configuration.AddAzureAppConfiguration(options =>
    {
        var appConfigEndpoint = new Uri(Environment.GetEnvironmentVariable("APP_CONFIG_ENDPOINT") ?? throw new InvalidOperationException("The environment variable APP_CONFIG_ENDPOINT is missing"));
        var credential = new DefaultAzureCredential();
        var sharedLabel = Environment.GetEnvironmentVariable("APP_CONFIG_LABEL_SHARED") ?? throw new InvalidOperationException("The environment variable APP_CONFIG_LABEL_SHARED is missing");

        options.Connect(appConfigEndpoint, credential)
            .Select("ClientSecrets:Hub*", "external")
            .Select("Authorization:*", sharedLabel)
            .Select("Incoming:*", sharedLabel)
            .ConfigureKeyVault(kvOpts => kvOpts.SetCredential(credential));
    });
}


// Add services to the container.
builder.Services.AddApplicationInsightsTelemetry(builder.Configuration["APPINSIGHTS_INSTRUMENTATIONKEY"]);

builder.Services.AddControllers();
builder.Services.AddBff(options =>
{
    options.AntiForgeryHeaderName = "CustomHeaderToProtectFromXCSRF";
    options.AntiForgeryHeaderValue = "true";

}).AddRemoteApis();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "cookie";
    options.DefaultChallengeScheme = "oidc";
}).AddCookie("cookie", options =>
{
    options.ExpireTimeSpan = TimeSpan.FromHours(1);
    options.SlidingExpiration = true;
    options.Cookie.Name = "__Host-bff";
    options.Cookie.SameSite = SameSiteMode.Lax;
}).AddOpenIdConnect("oidc", options =>
{
    options.Authority = builder.Configuration["Authorization:Authority"];
    options.ClientId = "ClientId";
    options.ClientSecret = builder.Configuration["ClientSecrets:Helper1"];
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.ResponseMode = OpenIdConnectResponseMode.Query;
    options.GetClaimsFromUserInfoEndpoint = true;
    options.MapInboundClaims = false;
    options.SaveTokens = true;
    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("helper");


    options.TokenValidationParameters = new()
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseBff();
app.UseAuthorization();
app.MapBffManagementEndpoints();

app.MapRemoteBffApiEndpoint("/api/validation", $"{builder.Configuration["Incoming:BaseUrl"]}api/validation")
    .RequireAccessToken(TokenType.User);

app.MapFallbackToFile("index.html");

app.Run();
