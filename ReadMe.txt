Bff Client .Net6

How to use template for your project.

1) Rename sln file and folders
2) Open .sln file in Visual Studio
3) You may receive message "One or more projects may be loaded not correctly"
   Then open .sln file and change name of .csproj file respectively
4) Perhaps old folders may not disappear from Solution explorer. Thus delete them.
5) About how to configure bff you can read here: https://docs.duendesoftware.com/identityserver/v5/bff/
6) Open bff client in Visual Studio Code.
7) Open Bff.csproj. Ensure your SPARoot is the same as your bff-client folder. 
   In Bff.csproj may be some more places where bff-client folder name is specified. So if you changed it previously,
   change it here as well.
7) Make sure that project can be loaded. Run it from Visual Studio!
8) While loading it will show: 
   Your connection is not private. Press "Advanced" -> "Procees to localhost"
   Important! "Launching the SPA proxy..." 
   "This page will automatically redirect to https://localhost:44448 when the SPA proxy is ready." must be shown.
   "Starting the development server" must be displayed.Otherwise proxy middleware is configured incorrectly!
9) If you face some problems with proxy, check package.json name and scripts section. 
   Check name of bff-client throughout the project.
10) If still not works try to delete node_modules and run "npm install" from VS terminal.
11) After you make sure that back-end renamings work, continue renaming front-end.
12) Rename all files and keywords. Therefore press Ctrl+Shift+F -> rename all words.
13) Load project again and check if it works.
    Now you renamed everything.
14) Go to appsettings.dev.json and specify
    "Authorization":"Authority" -> URL of auth server	
    "ClientSecrets":"Helper1" -> client secret (64 symbols. looks like token)
    "Incoming":"BaseUrl" -> Base URL of remote api.
15) Go to Program.cs and change:
    app.MapRemoteBffApiEndpoint where first part is name of local api, which is called by client;
    second part is address of remote api ("Incoming":"BaseUrl" + api name)
    AddOpenIdConnect change  options.ClientId to client ID of your authentication server.
16) All your requests must contain header "CustomHeaderToProtectFromXCSRF" with value "true".
17) Log in. And make sure your request runs successfully

For prod duende need license key





Instruction how to setup bff middleware from scratch:

Create .Net6 app with React.
Create new react app with "create-react-app" command inside.
Add files aspnetcore-https; aspnetcore-react; .env.development(specify port); .env.development.local; .env; setupProxy.js;
In BFF.csproj specify "SpaProxyServerUrl" - https://localhost:44448; "SpaRoot" - bff-client\