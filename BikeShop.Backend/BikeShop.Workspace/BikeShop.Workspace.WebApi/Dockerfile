FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Workspace.WebApi/BikeShop.Workspace.WebApi.csproj", "BikeShop.Workspace.WebApi/"]
RUN dotnet restore "BikeShop.Workspace.WebApi/BikeShop.Workspace.WebApi.csproj"
COPY . .
WORKDIR "/src/BikeShop.Workspace.WebApi"
RUN dotnet build "BikeShop.Workspace.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Workspace.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Workspace.WebApi.dll"]
