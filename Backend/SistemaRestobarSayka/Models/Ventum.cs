using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaRestobarSayka.Models
{
    public partial class Ventum
    {
        public Ventum()
        {
            Pedidos = new HashSet<Pedido>();
        }

        public int IdVenta { get; set; }
        public DateTime Fecha { get; set; }
        public int MontoTotal { get; set; }
        public string Estado { get; set; }
        public int Propina { get; set; }
        public string FolioBoleta { get; set; }
        public int TipoPagoIdTipoPago { get; set; }

        public virtual TipoPago TipoPagoIdTipoPagoNavigation { get; set; }
        public virtual ICollection<Pedido> Pedidos { get; set; }
    }
}
