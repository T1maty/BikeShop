FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Products.Domain/BikeShop.Products.Domain.csproj", "BikeShop.Products.Domain/BikeShop.Products.Domain.csproj"]
COPY ["BikeShop.Products.Application/BikeShop.Products.Application.csproj", "BikeShop.Products.Application/BikeShop.Products.Application.csproj"]
COPY ["BikeShop.Products.Persistence/BikeShop.Products.Persistence.csproj", "BikeShop.Products.Persistence/BikeShop.Products.Persistence.csproj"]
COPY ["BikeShop.Products.WebApi/BikeShop.Products.WebApi.csproj", "BikeShop.Products.WebApi/BikeShop.Products.WebApi.csproj"]

COPY . .
WORKDIR "/src/BikeShop.Products.WebApi"
RUN dotnet build "BikeShop.Products.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Products.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Products.WebApi.dll"]
