using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaRestobarSayka.Models
{
    public partial class Producto
    {
        public Producto()
        {
            ProductoModificadors = new HashSet<ProductoModificador>();
            ProductoPedidos = new HashSet<ProductoPedido>();
            Variantes = new HashSet<Variante>();
        }

        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int Precio { get; set; }
        public string Imagen { get; set; }
        public string Estado { get; set; }
        public int CategoriaIdCategoria { get; set; }

        public virtual Categoria CategoriaIdCategoriaNavigation { get; set; }
        public virtual ICollection<ProductoModificador> ProductoModificadors { get; set; }
        public virtual ICollection<ProductoPedido> ProductoPedidos { get; set; }
        public virtual ICollection<Variante> Variantes { get; set; }
    }
}
