FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Service.WebApi/BikeShop.Service.WebApi.csproj", "BikeShop.Service.WebApi/"]
RUN dotnet restore "BikeShop.Service.WebApi/BikeShop.Service.WebApi.csproj"
COPY . .
WORKDIR "/src/BikeShop.Service.WebApi"
RUN dotnet build "BikeShop.Service.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Service.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Service.WebApi.dll"]
