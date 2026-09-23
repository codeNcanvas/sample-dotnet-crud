var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("AllowReact");

var items = new List<Item>
{
    new Item { Id = 1, Name = "Notebook", Price = 4.99m }
};
var nextId = 2;

// READ all
app.MapGet("/api/items", () => items);

// READ one
app.MapGet("/api/items/{id}", (int id) =>
{
    var item = items.FirstOrDefault(i => i.Id == id);
    return item is not null ? Results.Ok(item) : Results.NotFound();
});

// CREATE
app.MapPost("/api/items", (Item newItem) =>
{
    newItem.Id = nextId++;
    items.Add(newItem);
    return Results.Created($"/api/items/{newItem.Id}", newItem);
});

// UPDATE
app.MapPut("/api/items/{id}", (int id, Item updated) =>
{
    var item = items.FirstOrDefault(i => i.Id == id);
    if (item is null) return Results.NotFound();

    item.Name = updated.Name;
    item.Price = updated.Price;
    return Results.NoContent();
});

// DELETE
app.MapDelete("/api/items/{id}", (int id) =>
{
    var item = items.FirstOrDefault(i => i.Id == id);
    if (item is null) return Results.NotFound();

    items.Remove(item);
    return Results.NoContent();
});

app.Run();

class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}
