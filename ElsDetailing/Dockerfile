FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["ElsDetailing.csproj", "./"]
RUN dotnet restore "ElsDetailing.csproj"

COPY . .
RUN dotnet publish "ElsDetailing.csproj" --configuration Release --no-restore --output /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ElsDetailing.dll"]
