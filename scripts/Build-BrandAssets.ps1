Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicRoot = Join-Path $projectRoot 'public'
$sourcePath = Join-Path $publicRoot 'logo.jpg'
$iconRoot = Join-Path $publicRoot 'icons'
$source = [System.Drawing.Image]::FromFile($sourcePath)

try {
  $assets = @(
    @{ Size = 128; Path = (Join-Path $iconRoot 'favicon-128x128.png') },
    @{ Size = 96; Path = (Join-Path $iconRoot 'favicon-96x96.png') },
    @{ Size = 32; Path = (Join-Path $iconRoot 'favicon-32x32.png') },
    @{ Size = 16; Path = (Join-Path $iconRoot 'favicon-16x16.png') }
  )

  foreach ($asset in $assets) {
    $size = $asset.Size
    $canvas = [System.Drawing.Bitmap]::new($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    try {
      $graphics.Clear([System.Drawing.Color]::White)
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $scale = [Math]::Min(($size * 0.94) / $source.Width, ($size * 0.94) / $source.Height)
      $width = [int][Math]::Round($source.Width * $scale)
      $height = [int][Math]::Round($source.Height * $scale)
      $left = [int][Math]::Round(($size - $width) / 2)
      $top = [int][Math]::Round(($size - $height) / 2)
      $graphics.DrawImage($source, $left, $top, $width, $height)
      $canvas.Save($asset.Path, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $graphics.Dispose()
      $canvas.Dispose()
    }
  }

  # An ICO file can contain the same PNG image used by modern browsers.
  $faviconPng = [System.IO.File]::ReadAllBytes((Join-Path $iconRoot 'favicon-32x32.png'))
  $stream = [System.IO.File]::Create((Join-Path $publicRoot 'favicon.ico'))
  $writer = [System.IO.BinaryWriter]::new($stream)
  try {
    $writer.Write([uint16]0)
    $writer.Write([uint16]1)
    $writer.Write([uint16]1)
    $writer.Write([byte]32)
    $writer.Write([byte]32)
    $writer.Write([byte]0)
    $writer.Write([byte]0)
    $writer.Write([uint16]1)
    $writer.Write([uint16]32)
    $writer.Write([uint32]$faviconPng.Length)
    $writer.Write([uint32]22)
    $writer.Write($faviconPng)
  } finally {
    $writer.Dispose()
  }
} finally {
  $source.Dispose()
}
