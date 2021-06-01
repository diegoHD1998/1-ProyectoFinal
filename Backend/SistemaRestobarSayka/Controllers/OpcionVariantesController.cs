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
    public class OpcionVariantesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OpcionVariantesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/OpcionVariantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OpcionVariante>>> GetOpcionVariantes()
        {
            return await _context.OpcionVariantes.ToListAsync();
        }

        // GET: api/OpcionVariantes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OpcionVariante>> GetOpcionVariante(int id)
        {
            var opcionVariante = await _context.OpcionVariantes.FindAsync(id);

            if (opcionVariante == null)
            {
                return NotFound();
            }

            return opcionVariante;
        }

        // PUT: api/OpcionVariantes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOpcionVariante(int id, OpcionVariante opcionVariante)
        {
            if (id != opcionVariante.IdOpcionV)
            {
                return BadRequest();
            }

            _context.Entry(opcionVariante).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpcionVarianteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OpcionVariantes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OpcionVariante>> PostOpcionVariante(OpcionVariante opcionVariante)
        {
            _context.OpcionVariantes.Add(opcionVariante);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOpcionVariante", new { id = opcionVariante.IdOpcionV }, opcionVariante);
        }

        // DELETE: api/OpcionVariantes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOpcionVariante(int id)
        {
            var opcionVariante = await _context.OpcionVariantes.FindAsync(id);
            if (opcionVariante == null)
            {
                return NotFound();
            }

            _context.OpcionVariantes.Remove(opcionVariante);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OpcionVarianteExists(int id)
        {
            return _context.OpcionVariantes.Any(e => e.IdOpcionV == id);
        }
    }
}
