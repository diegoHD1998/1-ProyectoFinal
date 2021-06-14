using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaRestobarSayka.Data;
using SistemaRestobarSayka.Models;

namespace SistemaRestobarSayka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RolesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Rols
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rol>>> GetRols()
        {
            var roles = await _context.Rols.ToListAsync();
            return Ok(roles);
        }

        // GET: api/Rols/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rol>> GetRol(int id)
        {
            var rol = await _context.Rols.FindAsync(id);

            if (rol == null)
            {
                return NotFound("Rol No Encontrado");
            }

            return Ok(rol);
        }

        // PUT: api/Rols/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRol(int id, Rol rol)
        {
            if (id != rol.IdRol)
            {
                return BadRequest("Los Ids de Rol No Coinciden");
            }

            _context.Entry(rol).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolExists(id))
                {
                    return NotFound("No se a Encontrado el Rol a Modificar");
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetRol", new { id = rol.IdRol }, rol);

        }

        // POST: api/Rols
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rol>> PostRol(Rol rol)
        {
            try
            {
                _context.Rols.Add(rol);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest("El Rol No fue Guardado");
            }
            

            return CreatedAtAction("GetRol", new { id = rol.IdRol }, rol);
        }

        // DELETE: api/Rols/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRol(int id)
        {
            var rol = await _context.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound("Rol No Encontrado");
            }

            try
            {
                _context.Rols.Remove(rol);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest("El Rol No fue Eliminado");
            }
            

            return Ok(id);
        }

        private bool RolExists(int id)
        {
            return _context.Rols.Any(e => e.IdRol == id);
        }
    }
}
