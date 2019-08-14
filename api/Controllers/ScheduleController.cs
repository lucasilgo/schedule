using System.Collections.Generic;
using api.Business;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private ScheduleBusiness _business;

        public ScheduleController(ScheduleBusiness business)
        {
            _business = business;
        }

        [HttpGet("search/{search?}")]
        public IActionResult Get(string search)
        {
            return Ok(_business.GetAll(search));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            ActionResult<Schedule> schedule = _business.GetById(id);
            if (schedule == null)
            {
                return NotFound();
            }
            return Ok(schedule.Value);
        }

        [HttpPost]
        public IActionResult Add(Schedule schedule)
        {
            List<string> conflicts = _business.Validate(schedule);
            if (conflicts.Count > 0)
            {
                return BadRequest(conflicts);
            }

            ActionResult<Schedule> newSchedue = _business.Add(schedule);
            if (newSchedue == null)
            {
                return BadRequest();
            }

            return Ok(newSchedue);
        }

        [HttpPut]
        public IActionResult Edit(Schedule schedule)
        {
            List<string> conflicts = _business.Validate(schedule);
            if (conflicts.Count > 0)
            {
                return BadRequest(conflicts);
            }

            ActionResult<Schedule> modSchedue = _business.Edit(schedule);
            if (modSchedue == null)
            {
                return BadRequest();
            }

            return Ok(modSchedue);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int? id)
        {
            ActionResult<Schedule> schedule = _business.GetById(id);
            if (schedule.Value == null)
            {
                return NotFound("Consulta não encontrada");
            }
            _business.Delete(schedule.Value);
            return Ok();
        }
    }
}