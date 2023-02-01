using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSwaggerForOcelot(builder.Configuration);
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();
app.MapControllers();

app.UseSwaggerForOcelotUI(opt =>
{
    //opt.DownstreamSwaggerEndPointBasePath = string.Empty;
    opt.PathToSwaggerGenerator = "/swagger/docs";
}, config => { config.RoutePrefix = string.Empty; });

app.UseOcelot().Wait();

app.Run();