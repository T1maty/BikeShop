FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Shop.Domain/BikeShop.Shop.Domain.csproj", "BikeShop.Shop.Domain/BikeShop.Shop.Domain.csproj"]
COPY ["BikeShop.Shop.Application/BikeShop.Shop.Application.csproj", "BikeShop.Shop.Application/BikeShop.Shop.Application.csproj"]
COPY ["Bikeshop.Shop.Persistence/Bikeshop.Shop.Persistence.csproj", "BikeShop.Shop.Persistence/BikeShop.Shop.Persistence.csproj"]
COPY ["BikeShop.Shop.WebApi/BikeShop.Shop.WebApi.csproj", "BikeShop.Shop.WebApi/BikeShop.Shop.WebApi.csproj"]

COPY . .
WORKDIR "/src/BikeShop.Shop.WebApi"
RUN dotnet build "BikeShop.Shop.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Shop.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Shop.WebApi.dll"]