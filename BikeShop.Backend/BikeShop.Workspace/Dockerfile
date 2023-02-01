FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Workspace.Domain/BikeShop.Workspace.Domain.csproj", "BikeShop.Workspace.Domain/BikeShop.Workspace.Domain.csproj"]
COPY ["BikeShop.Workspace.Application/BikeShop.Workspace.Application.csproj", "BikeShop.Workspace.Application/BikeShop.Workspace.Application.csproj"]
COPY ["BikeShop.Workspace.Persistence/BikeShop.Workspace.Persistence.csproj", "BikeShop.Workspace.Persistence/BikeShop.Workspace.Persistence.csproj"]
COPY ["BikeShop.Workspace.WebApi/BikeShop.Workspace.WebApi.csproj", "BikeShop.Workspace.WebApi/BikeShop.Workspace.WebApi.csproj"]

COPY . .
WORKDIR "/src/BikeShop.Workspace.WebApi"
RUN dotnet build "BikeShop.Workspace.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Workspace.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Workspace.WebApi.dll"]
