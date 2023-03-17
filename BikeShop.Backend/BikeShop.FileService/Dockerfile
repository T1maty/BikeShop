FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.FileService.Domain/BikeShop.FileService.Domain.csproj", "BikeShop.FileService.Domain/BikeShop.FileService.Domain.csproj"]
COPY ["BikeShop.FileService.Application/BikeShop.FileService.Application.csproj", "BikeShop.FileService.Application/BikeShop.FileService.Application.csproj"]
COPY ["BikeShop.FileService.Persistence/BikeShop.FileService.Persistence.csproj", "BikeShop.FileService.Persistence/BikeShop.FileService.Persistence.csproj"]
COPY ["BikeShop.FileService.WebApi/BikeShop.FileService.WebApi.csproj", "BikeShop.FileService.WebApi/BikeShop.FileService.WebApi.csproj"]

COPY . .
WORKDIR "/src/BikeShop.FileService.WebApi"
RUN dotnet build "BikeShop.FileService.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.FileService.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.FileService.WebApi.dll"]
