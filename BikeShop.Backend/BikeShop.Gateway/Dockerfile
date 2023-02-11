FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Gateway.csproj", "./"]
RUN dotnet restore "BikeShop.Gateway.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "BikeShop.Gateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Gateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Gateway.dll"]
