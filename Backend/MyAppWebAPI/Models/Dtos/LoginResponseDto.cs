﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAppWebAPI.Models.Dtos
{
    public class LoginResponseDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }
}