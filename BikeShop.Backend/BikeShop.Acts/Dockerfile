FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Acts.Domain/BikeShop.Acts.Domain.csproj", "BikeShop.Acts.Domain/BikeShop.Acts.Domain.csproj"]
COPY ["BikeShop.Acts.Application/BikeShop.Acts.Application.csproj", "BikeShop.Acts.Application/BikeShop.Acts.Application.csproj"]
COPY ["BikeShop.Acts.Persistenсe/BikeShop.Acts.Persistenсe.csproj", "BikeShop.Acts.Persistenсe/BikeShop.Acts.Persistenсe.csproj"]
COPY ["BikeShop.Acts.WebApi/BikeShop.Acts.WebApi.csproj", "BikeShop.Acts.WebApi/BikeShop.Acts.WebApi.csproj"]

COPY . .
WORKDIR "/src/BikeShop.Acts.WebApi"
RUN dotnet build "BikeShop.Acts.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Acts.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Acts.WebApi.dll"]
