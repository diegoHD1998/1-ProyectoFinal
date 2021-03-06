using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SistemaRestobarSayka.Models;

#nullable disable

namespace SistemaRestobarSayka.Data
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Boleta> Boleta { get; set; }
        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Impresora> Impresoras { get; set; }
        public virtual DbSet<Mesa> Mesas { get; set; }
        public virtual DbSet<Modificador> Modificadors { get; set; }
        public virtual DbSet<OpcionModificador> OpcionModificadors { get; set; }
        public virtual DbSet<OpcionVariante> OpcionVariantes { get; set; }
        public virtual DbSet<Pedido> Pedidos { get; set; }
        public virtual DbSet<Producto> Productos { get; set; }
        public virtual DbSet<ProductoModificador> ProductoModificadors { get; set; }
        public virtual DbSet<ProductoPedido> ProductoPedidos { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }
        public virtual DbSet<TipoPago> TipoPagos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Variante> Variantes { get; set; }
        public virtual DbSet<Venta> Venta { get; set; }
        public virtual DbSet<Zona> Zonas { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Boleta>(entity =>
            {
                entity.HasKey(e => e.IdBoleta);

                entity.Property(e => e.IdBoleta).HasColumnName("Id_boleta");

                entity.Property(e => e.Folio).IsRequired();

                entity.Property(e => e.FormaDePago).IsRequired();
            });

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasKey(e => e.IdCategoria);

                entity.Property(e => e.IdCategoria).HasColumnName("Id_categoria");

                entity.Property(e => e.Color).IsRequired();

                entity.Property(e => e.Descripcion).IsRequired();

                entity.Property(e => e.Estado).IsRequired();

                entity.Property(e => e.Nombre).IsRequired();

                entity.Property(e => e.Tipo).IsRequired();
            });

            modelBuilder.Entity<Impresora>(entity =>
            {
                entity.HasKey(e => e.IdImpresora);

                entity.ToTable("Impresora");

                entity.Property(e => e.IdImpresora).HasColumnName("Id_impresora");

                entity.Property(e => e.IpImpresora)
                    .IsRequired()
                    .HasColumnName("IP_impresora");

                entity.Property(e => e.Nombre).IsRequired();
            });

            modelBuilder.Entity<Mesa>(entity =>
            {
                entity.HasKey(e => e.IdMesa);

                entity.ToTable("Mesa");

                entity.HasIndex(e => e.ZonaIdZona, "IX_FK_MesaZona");

                entity.Property(e => e.IdMesa).HasColumnName("Id_mesa");

                entity.Property(e => e.Nombre).IsRequired();

                entity.Property(e => e.ZonaIdZona).HasColumnName("ZonaId_zona");

                entity.HasOne(d => d.ZonaIdZonaNavigation)
                    .WithMany(p => p.Mesas)
                    .HasForeignKey(d => d.ZonaIdZona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MesaZona");
            });

            modelBuilder.Entity<Modificador>(entity =>
            {
                entity.HasKey(e => e.IdModificador);

                entity.ToTable("Modificador");

                entity.Property(e => e.IdModificador).HasColumnName("Id_modificador");

                entity.Property(e => e.Nombre).IsRequired();
            });

            modelBuilder.Entity<OpcionModificador>(entity =>
            {
                entity.HasKey(e => e.IdOpcionM);

                entity.ToTable("OpcionModificador");

                entity.HasIndex(e => e.ModificadorIdModificador, "IX_FK_ModificadorOpcionModificador");

                entity.Property(e => e.IdOpcionM).HasColumnName("Id_opcionM");

                entity.Property(e => e.ModificadorIdModificador).HasColumnName("ModificadorId_modificador");

                entity.Property(e => e.Nombre).IsRequired();

                entity.Property(e => e.Orden).IsRequired();

                entity.HasOne(d => d.ModificadorIdModificadorNavigation)
                    .WithMany(p => p.OpcionModificadors)
                    .HasForeignKey(d => d.ModificadorIdModificador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ModificadorOpcionModificador");
            });

            modelBuilder.Entity<OpcionVariante>(entity =>
            {
                entity.HasKey(e => e.IdOpcionV);

                entity.ToTable("OpcionVariante");

                entity.HasIndex(e => e.VarianteIdVariante, "IX_FK_OpcionVarianteVariante");

                entity.Property(e => e.IdOpcionV).HasColumnName("Id_opcionV");

                entity.Property(e => e.Nombre).IsRequired();

                entity.Property(e => e.VarianteIdVariante).HasColumnName("VarianteId_variante");

                entity.HasOne(d => d.VarianteIdVarianteNavigation)
                    .WithMany(p => p.OpcionVariantes)
                    .HasForeignKey(d => d.VarianteIdVariante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OpcionVarianteVariante");
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(e => e.IdPedido);

                entity.ToTable("Pedido");

                entity.HasIndex(e => e.MesaIdMesa, "IX_FK_PedidoMesa");

                entity.HasIndex(e => e.UsuarioIdUsuario, "IX_FK_PedidoUsuario");

                entity.HasIndex(e => e.VentaIdVenta, "IX_FK_PedidoVenta");

                entity.Property(e => e.IdPedido).HasColumnName("Id_pedido");

                entity.Property(e => e.Estado).IsRequired();

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.Property(e => e.MesaIdMesa).HasColumnName("MesaId_mesa");

                entity.Property(e => e.UsuarioIdUsuario).HasColumnName("UsuarioId_usuario");

                entity.Property(e => e.VentaIdVenta).HasColumnName("Venta_Id_venta");

                entity.HasOne(d => d.MesaIdMesaNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.MesaIdMesa)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PedidoMesa");

                entity.HasOne(d => d.UsuarioIdUsuarioNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.UsuarioIdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PedidoUsuario");

                entity.HasOne(d => d.VentaIdVentaNavigation)
                    .WithMany(p => p.Pedidos)
                    .HasForeignKey(d => d.VentaIdVenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PedidoVenta");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.IdProducto);

                entity.ToTable("Producto");

                entity.HasIndex(e => e.CategoriaIdCategoria, "IX_FK_ProductoCategoria");

                entity.Property(e => e.IdProducto).HasColumnName("Id_producto");

                entity.Property(e => e.CategoriaIdCategoria).HasColumnName("CategoriaId_categoria");

                entity.Property(e => e.Descripcion).IsRequired();

                entity.Property(e => e.Estado).IsRequired();

                entity.Property(e => e.Imagen).IsRequired();

                entity.Property(e => e.Nombre).IsRequired();

                entity.HasOne(d => d.CategoriaIdCategoriaNavigation)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.CategoriaIdCategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductoCategoria");
            });

            modelBuilder.Entity<ProductoModificador>(entity =>
            {
                entity.HasKey(e => new { e.ProductoIdProducto, e.ModificadorIdModificador });

                entity.ToTable("ProductoModificador");

                entity.HasIndex(e => e.ModificadorIdModificador, "IX_FK_ProductoModificador_Modificador");

                entity.Property(e => e.ProductoIdProducto).HasColumnName("Producto_Id_producto");

                entity.Property(e => e.ModificadorIdModificador).HasColumnName("Modificador_Id_modificador");

                entity.HasOne(d => d.ModificadorIdModificadorNavigation)
                    .WithMany(p => p.ProductoModificadors)
                    .HasForeignKey(d => d.ModificadorIdModificador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductoModificador_Modificador");

                entity.HasOne(d => d.ProductoIdProductoNavigation)
                    .WithMany(p => p.ProductoModificadors)
                    .HasForeignKey(d => d.ProductoIdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductoModificador_Producto");
            });

            modelBuilder.Entity<ProductoPedido>(entity =>
            {
                entity.HasKey(e => new { e.ProductoIdProducto, e.PedidoIdPedido });

                entity.ToTable("ProductoPedido");

                entity.HasIndex(e => e.PedidoIdPedido, "IX_FK_ProductoPedido_Pedido");

                entity.Property(e => e.ProductoIdProducto).HasColumnName("Producto_Id_producto");

                entity.Property(e => e.PedidoIdPedido).HasColumnName("Pedido_Id_pedido");

                entity.Property(e => e.Hora).HasColumnType("datetime");

                entity.HasOne(d => d.PedidoIdPedidoNavigation)
                    .WithMany(p => p.ProductoPedidos)
                    .HasForeignKey(d => d.PedidoIdPedido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductoPedido_Pedido");

                entity.HasOne(d => d.ProductoIdProductoNavigation)
                    .WithMany(p => p.ProductoPedidos)
                    .HasForeignKey(d => d.ProductoIdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductoPedido_Producto");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.IdRol);

                entity.ToTable("Rol");

                entity.Property(e => e.IdRol).HasColumnName("Id_rol");

                entity.Property(e => e.Nombre).IsRequired();
            });

            modelBuilder.Entity<TipoPago>(entity =>
            {
                entity.HasKey(e => e.IdTipoPago);

                entity.ToTable("TipoPago");

                entity.Property(e => e.IdTipoPago).HasColumnName("Id_tipoPago");

                entity.Property(e => e.Nombre).IsRequired();
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.ToTable("Usuario");

                entity.HasIndex(e => e.RolIdRol, "IX_FK_UsuarioRol");

                entity.Property(e => e.IdUsuario).HasColumnName("Id_usuario");

                entity.Property(e => e.Apellido).IsRequired();

                entity.Property(e => e.Direccion).IsRequired();

                entity.Property(e => e.Email).IsRequired();
                entity.HasIndex(e => e.Email).IsUnique();

                entity.Property(e => e.Estado).IsRequired();

                entity.Property(e => e.Nombre).IsRequired();

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.RolIdRol).HasColumnName("RolId_rol");

                entity.Property(e => e.Telefono).IsRequired();

                entity.Property(e => e.UserName).IsRequired();

                entity.HasOne(d => d.RolIdRolNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.RolIdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsuarioRol");
            });

            modelBuilder.Entity<Variante>(entity =>
            {
                entity.HasKey(e => e.IdVariante);

                entity.ToTable("Variante");

                entity.HasIndex(e => e.ProductoIdProducto, "IX_FK_VarianteProducto");

                entity.Property(e => e.IdVariante).HasColumnName("Id_variante");

                entity.Property(e => e.Nombre).IsRequired();

                entity.Property(e => e.ProductoIdProducto).HasColumnName("ProductoId_producto");

                entity.HasOne(d => d.ProductoIdProductoNavigation)
                    .WithMany(p => p.Variantes)
                    .HasForeignKey(d => d.ProductoIdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VarianteProducto");
            });

            modelBuilder.Entity<Venta>(entity =>
            {
                entity.HasKey(e => e.IdVenta);

                entity.HasIndex(e => e.TipoPagoIdTipoPago, "IX_FK_VentaTipoPago");

                entity.Property(e => e.IdVenta).HasColumnName("Id_venta");

                entity.Property(e => e.Estado).IsRequired();

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.Property(e => e.FolioBoleta).IsRequired();

                entity.Property(e => e.TipoPagoIdTipoPago).HasColumnName("TipoPagoId_tipoPago");

                entity.HasOne(d => d.TipoPagoIdTipoPagoNavigation)
                    .WithMany(p => p.Venta)
                    .HasForeignKey(d => d.TipoPagoIdTipoPago)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VentaTipoPago");
            });

            modelBuilder.Entity<Zona>(entity =>
            {
                entity.HasKey(e => e.IdZona);

                entity.ToTable("Zona");

                entity.Property(e => e.IdZona).HasColumnName("Id_zona");

                entity.Property(e => e.Color).IsRequired();

                entity.Property(e => e.Estado).IsRequired();

                entity.Property(e => e.Nombre).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
