FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Identity.WebApi/BikeShop.Identity.WebApi.csproj", "BikeShop.Identity.WebApi/"]
RUN dotnet restore "BikeShop.Identity.WebApi/BikeShop.Identity.WebApi.csproj"
COPY . .
WORKDIR "/src/BikeShop.Identity.WebApi"
RUN dotnet build "BikeShop.Identity.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Identity.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Identity.WebApi.dll"]
