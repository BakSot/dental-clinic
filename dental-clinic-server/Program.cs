using System.ComponentModel.DataAnnotations;
using dental_clinic_server.Data;
using dental_clinic_server.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

// Use In-Memory Database
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("DentalPmsDb"));

// Swagger for testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable JSON cycle handling
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

static IResult Validate<T>(T model)
{
    var context = new ValidationContext(model, serviceProvider: null, items: null);
    var results = new List<ValidationResult>();

    if (!Validator.TryValidateObject(model, context, results, true))
    {
        return Results.BadRequest(results.Select(r => r.ErrorMessage));
    }

    return Results.Ok();
}

// ===================== PATIENTS =====================

// GET all patients
app.MapGet("/patients", async (AppDbContext db) =>
{
    var patients = await db.Patients
        .Select(p => new
        {
            p.Id,
            p.FullName,
            p.Address,
            p.PhotoUrl
        })
        .ToListAsync();

    return Results.Ok(patients);
});

// GET patient by ID with appointments
app.MapGet("/patients/{id:int}", async (int id, AppDbContext db) =>
{
    var patient = await db.Patients
        .Where(p => p.Id == id)
        .Select(p => new
        {
            p.Id,
            p.FullName,
            p.Address,
            p.PhotoUrl,
            Appointments = p.Appointments.Select(a => new
            {
                a.Id,
                a.DateTime,
                a.Treatment,
                a.Dentist
            })
        })
        .FirstOrDefaultAsync();

    return patient is not null ? Results.Ok(patient) : Results.NotFound();
});

// POST new patient
app.MapPost("/patients", async (Patient patient, AppDbContext db) =>
{
    var validation = Validate(patient);
    if (validation is BadRequest<IEnumerable<string>> badReq)
        return badReq;

    db.Patients.Add(patient);
    await db.SaveChangesAsync();

    return Results.Created($"/patients/{patient.Id}", new
    {
        patient.Id,
        patient.FullName,
        patient.Address,
        patient.PhotoUrl
    });
});

// ===================== APPOINTMENTS =====================

// GET all appointments for a patient
app.MapGet("/appointments/{patientId:int}", async (int patientId, AppDbContext db) =>
{
    var appointments = await db.Appointments
        .Where(a => a.PatientId == patientId)
        .Select(a => new
        {
            a.Id,
            a.DateTime,
            a.Treatment,
            a.Dentist
        })
        .ToListAsync();

    return Results.Ok(appointments);
});

// POST new appointment
app.MapPost("/appointments", async (Appointment appointment, AppDbContext db) =>
{
    var validation = Validate(appointment);
    if (validation is BadRequest<IEnumerable<string>> badReq)
        return badReq;

    var patientExists = await db.Patients.AnyAsync(p => p.Id == appointment.PatientId);
    if (!patientExists) return Results.BadRequest("Invalid patientId");

    db.Appointments.Add(appointment);
    await db.SaveChangesAsync();

    return Results.Created($"/appointments/{appointment.Id}", new
    {
        appointment.Id,
        appointment.DateTime,
        appointment.Treatment,
        appointment.Dentist,
        appointment.PatientId
    });
});

app.MapGet("/appointments/options", async (AppDbContext db) =>
{
    // Define treatments (could later come from DB)
    var treatments = new[]
    {
        new { Name = "Cleaning", Duration = 30 },
        new { Name = "Filling", Duration = 45 },
        new { Name = "Extraction", Duration = 60 },
        new { Name = "Checkup", Duration = 20 },
    };

    // Define dentists (could later come from DB)
    var dentists = await db.Patients
        .SelectMany(p => p.Appointments.Select(a => a.Dentist)) // gather existing dentists
        .Distinct()
        .ToListAsync();

    // If no appointments exist yet, provide default dentists
    if (!dentists.Any())
    {
        dentists = new List<string> { "Dr. John", "Dr. Jane", "Dr. Smith" };
    }

    // Fetch appointments to calculate dentist availability
    var appointments = await db.Appointments
        .Select(a => new
        {
            a.Dentist,
            a.DateTime,
            a.Duration
        })
        .ToListAsync();

    var dentistAvailability = dentists.ToDictionary(
        d => d,
        d => appointments
            .Where(a => a.Dentist == d)
            .Select(a => new { a.DateTime, a.Duration })
            .ToList()
    );

    return Results.Ok(new
    {
        Dentists = dentists,
        Treatments = treatments,
        Availability = dentistAvailability
    });
});

app.Run();