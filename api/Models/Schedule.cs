using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Schedule")]
    public class Schedule
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public DateTime? PatientBirth { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? Finish { get; set; }
        public string Notes { get; set; }

        public void Copy(Schedule schedule)
        {
            this.PatientName = schedule.PatientName;
            this.PatientBirth = schedule.PatientBirth;
            this.Start = schedule.Start;
            this.Finish = schedule.Finish;
            this.Notes = schedule.Notes;
        }
    }
}