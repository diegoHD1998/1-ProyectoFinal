using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaRestobarSayka.Models
{
    public partial class Mesa
    {
        public Mesa()
        {
            Pedidos = new HashSet<Pedido>();
        }

        public int IdMesa { get; set; }
        public string Nombre { get; set; }
        public int ZonaIdZona { get; set; }

        public virtual Zona ZonaIdZonaNavigation { get; set; }
        public virtual ICollection<Pedido> Pedidos { get; set; }
    }
}
