# CRUD demo - .NET Core + React

Small practice project to try out a React frontend talking to a .NET Core Web API. Items have a name and a price - you can add, edit, and delete them.

The backend keeps everything in memory instead of a real database, so the list resets every time you restart it.

## Stack

- Backend: ASP.NET Core (.NET 10), minimal API
- Frontend: React (Vite)

## Running it

Start the backend first:

```
cd backend
dotnet run
```

By default it runs on http://localhost:5000.

Then the frontend, in a separate terminal:

```
cd frontend
npm install
npm run dev
```


If the frontend loads but the list stays empty, check that the backend is actually running and that its CORS policy in `Program.cs` includes `http://localhost:5173`.
