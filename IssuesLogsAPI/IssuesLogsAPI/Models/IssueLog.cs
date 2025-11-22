using System.ComponentModel.DataAnnotations;

namespace IssuesLogsAPI.Models
{
    public class IssueLog
    {
        [Key]
        public long ID { get; set; }
        public string? Project { get; set; }
        public string? Module { get; set; }
        public string? ErrorDescription { get; set; }
        public string? Type { get; set; }
        public string? State { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateResolved { get; set; }
    }
}
