using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyAppWebAPI.Models.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The Name is mandatory field")]
        [StringLength(50, MinimumLength = 6)]
        // chỉ có số là lỗi, còn mình chữ hoặc cả chữ cả số thì ko sao
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Only Numerics are not allowes")]
        public string Name { get; set; }

        [Required]
        public string Country { get; set; }
    }
}