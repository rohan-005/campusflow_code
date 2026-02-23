using CampusFlow.Application.DTOs;
using CampusFlow.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/resources")]
public class ResourcesController : ControllerBase
{
    private readonly IResourceService _service;
    private readonly IWebHostEnvironment _env;

    public ResourcesController(IResourceService service, IWebHostEnvironment env)
    {
        _service = service;
        _env = env;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }

    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<IActionResult> Upload(
        [FromForm] CreateResourceDto dto,
        IFormFile? file)
    {
        string filePath = "";

        if (file is not null)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var fullPath = Path.Combine(uploadsFolder, uniqueName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            filePath = "/uploads/" + uniqueName;
        }

        var result = await _service.UploadAsync(dto, filePath, GetUserId());
        return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("pending")]
    public async Task<IActionResult> GetPending()
    {
        return Ok(await _service.GetPendingAsync());
    }

    [HttpGet("approved")]
    public async Task<IActionResult> GetApproved()
    {
        return Ok(await _service.GetApprovedAsync());
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/approve")]
    public async Task<IActionResult> Approve(int id)
    {
        await _service.ApproveAsync(id, GetUserId());
        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/reject")]
    public async Task<IActionResult> Reject(int id)
    {
        await _service.RejectAsync(id, GetUserId());
        return Ok();
    }
}