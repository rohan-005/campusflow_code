using CampusFlow.Application.DTOs.Assets;
using CampusFlow.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CampusFlow.API.Controllers;

[Authorize]
[ApiController]
[Route("api/asset-requests")]
public class AssetRequestsController : ControllerBase
{
    private readonly AssetRequestService _service;

    public AssetRequestsController(AssetRequestService service)
    {
        _service = service;
    }

    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateAssetRequestDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        await _service.CreateRequestAsync(userId, dto);

        return Ok("Request submitted");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("pending")]
    public async Task<IActionResult> GetPending()
    {
        var requests = await _service.GetPendingAsync();
        return Ok(requests);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/approve")]
    public async Task<IActionResult> Approve(int id)
    {
        await _service.ApproveAsync(id);
        return Ok("Approved successfully");
    }
    [Authorize(Roles = "Student")]
    [HttpGet("my")]
    public async Task<IActionResult> GetMyRequests()
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        var requests = await _service.GetByUserIdAsync(userId);

        return Ok(requests);
    }
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/reject")]
    public async Task<IActionResult> Reject(int id)
    {
        await _service.RejectAsync(id);
        return Ok("Rejected successfully");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var requests = await _service.GetAllAsync();
        return Ok(requests);
    }


}