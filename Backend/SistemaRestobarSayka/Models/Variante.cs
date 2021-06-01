using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaRestobarSayka.Models
{
    public partial class Variante
    {
        public Variante()
        {
            OpcionVariantes = new HashSet<OpcionVariante>();
        }

        public int IdVariante { get; set; }
        public string Nombre { get; set; }
        public int ProductoIdProducto { get; set; }

        public virtual Producto ProductoIdProductoNavigation { get; set; }
        public virtual ICollection<OpcionVariante> OpcionVariantes { get; set; }
    }
}
