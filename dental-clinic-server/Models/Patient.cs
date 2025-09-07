using System.ComponentModel.DataAnnotations;

namespace dental_clinic_server.Models
{
    public class Patient
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Full name is required")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; } = string.Empty;

        public string? PhotoUrl { get; set; }

        public List<Appointment> Appointments { get; set; } = new();
    }
}
