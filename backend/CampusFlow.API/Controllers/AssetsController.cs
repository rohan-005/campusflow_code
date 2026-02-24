using CampusFlow.Application.DTOs.Assets;
using CampusFlow.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CampusFlow.API.Controllers;

[Authorize]
[ApiController]
[Route("api/assets")]
public class AssetsController : ControllerBase
{
    private readonly AssetService _assetService;

    public AssetsController(AssetService assetService)
    {
        _assetService = assetService;
    }

    // 🔥 Student uploads asset (Pending)
    [Authorize(Roles = "Student")]
    [HttpPost("student")]
    public async Task<IActionResult> CreateByStudent(CreateAssetDto dto)
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        await _assetService.CreateByStudentAsync(userId, dto);

        return Ok("Asset submitted for approval");
    }

    // 🔥 Admin creates directly approved asset
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateAssetDto dto)
    {
        await _assetService.CreateAsync(dto);
        return Ok("Asset created successfully");
    }

    // 🔥 Students see only approved assets
    [HttpGet("approved")]
    public async Task<IActionResult> GetApproved()
    {
        var assets = await _assetService.GetApprovedAsync();
        return Ok(assets);
    }

    // 🔥 Admin sees pending assets
    [Authorize(Roles = "Admin")]
    [HttpGet("pending")]
    public async Task<IActionResult> GetPending()
    {
        var assets = await _assetService.GetPendingAsync();
        return Ok(assets);
    }

    // 🔥 Admin approves asset
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/approve")]
    public async Task<IActionResult> Approve(int id)
    {
        await _assetService.ApproveAsync(id);
        return Ok("Asset approved successfully");
    }

    // 🔥 Admin rejects asset
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/reject")]
    public async Task<IActionResult> Reject(int id)
    {
        await _assetService.RejectAsync(id);
        return Ok("Asset rejected successfully");
    }
}