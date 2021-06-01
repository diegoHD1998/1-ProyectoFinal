using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaRestobarSayka.Models
{
    public partial class Boletum
    {
        public int IdBoleta { get; set; }
        public string Folio { get; set; }
        public string FormaDePago { get; set; }
    }
}
