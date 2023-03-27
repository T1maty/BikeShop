FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Payments.Domain/BikeShop.Payments.Domain.csproj", "BikeShop.Payments.Domain/BikeShop.Payments.Domain.csproj"]
COPY ["BikeShop.Payments.Application/BikeShop.Payments.Application.csproj", "BikeShop.Payments.Application/BikeShop.Payments.Application.csproj"]
COPY ["BikeShop.Payments.Persistence/BikeShop.Payments.Persistence.csproj", "BikeShop.Payments.Persistence/BikeShop.Payments.Persistence.csproj"]
COPY ["BikeShop.Payments.WebApi/BikeShop.Payments.WebApi.csproj", "BikeShop.Payments.WebApi/BikeShop.Payments.WebApi.csproj"]

COPY . .
WORKDIR "/src/BikeShop.Payments.WebApi"
RUN dotnet build "BikeShop.Payments.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Payments.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Payments.WebApi.dll"]
