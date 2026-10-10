# Deploying EL’s Mobile Car Detailing

## Deploy to Render with Docker

This is an ASP.NET Core app, so use Render's Docker runtime rather than its Node.js runtime. In the Render web service settings, configure:

- **Root Directory:** `ElsDetailing` (the folder containing `ElsDetailing.csproj` and `Dockerfile`)
- **Runtime / Language:** Docker
- **Dockerfile Path:** `Dockerfile`
- **Docker Context Directory:** `.`

The Dockerfile builds the app with the .NET 10 SDK image, runs it with the .NET 10 ASP.NET runtime image, and listens on `0.0.0.0:10000`, Render's default web-service port. No Node build or start command is needed. If Render's settings instead use the repository root as the context, set the Dockerfile path to `ElsDetailing/Dockerfile` and the context directory to `ElsDetailing`.

## Before publishing

- Choose an ASP.NET Core host that supports .NET 10.
- Set up the domain name you want customers to use.
- Add the live website URL to the Google Business Profile when it is available.
- Confirm that the listed phone numbers, email addresses, prices, service descriptions, and Google review details are still correct.

## Build a production publish folder

Install the .NET 10 SDK, then run this from the folder containing `ElsDetailing.csproj`:

```powershell
dotnet publish -c Release
```

Deploy the **contents of `bin/Release/net10.0/publish`** to a host that runs ASP.NET Core 10. Do not deploy the `bin/Debug` or `obj` folders. The `bin`, `obj`, and local publish output are excluded from Git by `.gitignore`.

## Production settings

- Run with `ASPNETCORE_ENVIRONMENT=Production` (the default when no environment is specified).
- Configure the host with the actual public domain in `AllowedHosts`, for example `your-domain.example;www.your-domain.example`.
- Enable HTTPS and point the domain’s DNS records at the host. The app redirects HTTP to HTTPS and enables HSTS outside Development.
- Do not put credentials or private API keys in the source files. Configure any future secrets through the hosting provider’s environment-variable or secret settings.

## After deployment

Open the live website on a phone and desktop. Check the navigation, service links, phone and email links, Instagram, Google reviews, images, and HTTPS certificate. The phone links use `tel:` and email links use `mailto:`, so those actions depend on the visitor’s device or browser having a calling or email app configured.
