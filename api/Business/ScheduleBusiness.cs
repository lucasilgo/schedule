using System;
using System.Collections.Generic;
using System.Linq;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Business
{
    public class ScheduleBusiness
    {
        private ScheduleContext _context;

        public ScheduleBusiness(ScheduleContext context)
        {
            _context = context;
        }

        public IEnumerable<Schedule> GetAll(string search)
        {
            return _context.Schedule
                .Where(s => !String.IsNullOrEmpty(search) ? s.PatientName.Contains(search) : true)
                .OrderBy(s => s.Start).ToList();
        }

        public ActionResult<Schedule> GetById(int? id)
        {
            if (id != null)
            {
                return _context.Schedule.Where(
                        s => s.Id == id
                    ).FirstOrDefault();
            }
            return null;
        }

        public ActionResult<Schedule> Add(Schedule schedule)
        {
            _context.Schedule.Add(schedule);
            _context.SaveChanges();
            return schedule;
        }

        public ActionResult<Schedule> Edit(Schedule schedule)
        {
            Schedule scheduleExists = _context.Schedule.Where(
                s => s.Id == schedule.Id
            ).FirstOrDefault();
            if (scheduleExists != null)
            {
                scheduleExists.Copy(schedule);
                _context.SaveChanges();
                return scheduleExists;
            }
            return null;
        }

        public void Delete(Schedule schedule)
        {
            _context.Schedule.Remove(schedule);
            _context.SaveChanges();
        }

        public List<string> Validate(Schedule schedule)
        {
            List<string> conflicts = new List<string>();

            // Rule 1: "O sistema não deve permitir o agendamento de duas ou mais consultas no mesmo range de datas."
            Schedule conflictedSchedule = _context.Schedule.Where(
                s => ((s.Start >= schedule.Start && s.Start <= schedule.Finish) ||
                    (s.Finish >= schedule.Start && s.Finish <= schedule.Finish)) && (s.Id != schedule.Id)
            ).FirstOrDefault();
            if (conflictedSchedule != null)
            {
                conflicts.Add("\nO agendamento possui conflito com a consulta do paciente " + conflictedSchedule.PatientName + ".");
            }

            // Rule 2: "A data final não pode ser menor que a data inicial."
            if (schedule.Finish < schedule.Start)
            {
                conflicts.Add("\nA data final não pode ser menor que a data inicial.");
            }

            return conflicts;
        }
    }
}