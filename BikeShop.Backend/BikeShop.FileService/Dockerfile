FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.FileService.Api/BikeShop.FileService.Api.csproj", "BikeShop.FileService.Api/"]
RUN dotnet restore "BikeShop.FileService.Api/BikeShop.FileService.Api.csproj"

COPY . .
WORKDIR "/src/BikeShop.FileService.Api"
RUN dotnet build "BikeShop.FileService.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.FileService.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.FileService.Api.dll"]
