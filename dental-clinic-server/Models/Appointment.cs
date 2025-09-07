using System.ComponentModel.DataAnnotations;

namespace dental_clinic_server.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required(ErrorMessage = "Appointment date and time is required")]
        public DateTime DateTime { get; set; }

        [Required(ErrorMessage = "Dentist is required")]
        public string Dentist { get; set; } = string.Empty;

        [Required(ErrorMessage = "Treatment is required")]
        public string Treatment { get; set; } = string.Empty;

        [Range(1, 480, ErrorMessage = "Duration must be between 1 and 480 minutes")]
        public int Duration { get; set; }
    }
}
