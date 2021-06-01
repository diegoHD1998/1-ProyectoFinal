using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaRestobarSayka.Models
{
    public partial class TipoPago
    {
        public TipoPago()
        {
            Venta = new HashSet<Ventum>();
        }

        public int IdTipoPago { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Ventum> Venta { get; set; }
    }
}
