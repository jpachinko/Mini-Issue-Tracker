using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IssuesLogsAPI.Context;
using IssuesLogsAPI.Models;

namespace IssuesLogsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminIssueLogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminIssueLogsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AdminIssueLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IssueLog>>> GetIssueLog()
        {
            return await _context.IssueLog.ToListAsync();
        }

        // GET: api/AdminIssueLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IssueLog>> GetIssueLog(long id)
        {
            var issueLog = await _context.IssueLog.FindAsync(id);

            if (issueLog == null)
            {
                return NotFound();
            }

            return issueLog;
        }

        // PUT: api/AdminIssueLogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIssueLog(long id, IssueLog issueLog)
        {
            if (id != issueLog.ID)
            {
                return BadRequest();
            }

            _context.Entry(issueLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IssueLogExists(id))
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

        // POST: api/AdminIssueLogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IssueLog>> PostIssueLog(IssueLog issueLog)
        {
            _context.IssueLog.Add(issueLog);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetIssueLog", new { id = issueLog.ID }, issueLog);
            return CreatedAtAction(nameof(GetIssueLog), new { id = issueLog.ID }, issueLog); //error security on compile time
        }

        // DELETE: api/AdminIssueLogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssueLog(long id)
        {
            var issueLog = await _context.IssueLog.FindAsync(id);
            if (issueLog == null)
            {
                return NotFound();
            }

            _context.IssueLog.Remove(issueLog);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IssueLogExists(long id)
        {
            return _context.IssueLog.Any(e => e.ID == id);
        }
    }
}
