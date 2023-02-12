FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BikeShop.Payments.WebApi/BikeShop.Payments.WebApi.csproj", "BikeShop.Payments.WebApi/"]
RUN dotnet restore "BikeShop.Payments.WebApi/BikeShop.Payments.WebApi.csproj"
COPY . .
WORKDIR "/src/BikeShop.Payments.WebApi"
RUN dotnet build "BikeShop.Payments.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BikeShop.Payments.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BikeShop.Payments.WebApi.dll"]
