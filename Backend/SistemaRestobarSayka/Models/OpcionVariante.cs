﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaRestobarSayka.Models
{
    public partial class OpcionVariante
    {
        public int IdOpcionV { get; set; }
        public string Nombre { get; set; }
        public int Precio { get; set; }
        public int VarianteIdVariante { get; set; }

        public virtual Variante VarianteIdVarianteNavigation { get; set; }
    }
}
