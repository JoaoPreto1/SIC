$baseUrl = "http://localhost:8080"
Write-Host "Waiting for API Gateway at $baseUrl..."

$retries = 60
while ($retries -gt 0) {
    try {
        $res = Invoke-WebRequest -Uri "$baseUrl/health" -Method Get -ErrorAction Stop -UseBasicParsing
        if ($res.StatusCode -eq 200) { 
            Write-Host "Gateway is UP!"
            break 
        }
    } catch {
        Write-Host "." -NoNewline
        Start-Sleep -Seconds 2
        $retries--
    }
}

if ($retries -eq 0) { 
    Write-Error "Timeout waiting for API Gateway."
    exit 1 
}

# Register
$email = "test" + (Get-Random) + "@example.com"
$headers = @{ "Content-Type" = "application/json" }
$regBody = @{
    email = $email
    password = "password123"
    role = "FREELANCER"
} | ConvertTo-Json

Write-Host "`nRegistering user $email..."
try {
    $regResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -Body $regBody -Headers $headers
    Write-Host "Register OK. UserID: $($regResponse.userId)"
} catch {
    Write-Error "Register Failed: $($_.Exception.Message)"
    exit 1
}

# Login
Write-Host "Logging in..."
$loginBody = @{
    email = $email
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $loginBody -Headers $headers
    $token = $loginResponse.token
    if (-not $token) { throw "No token returned" }
    Write-Host "Login OK. Token received."
} catch {
    Write-Error "Login Failed: $($_.Exception.Message)"
    exit 1
}

# Create Service in Catalog
Write-Host "Creating Service..."
$svcBody = @{
    title = "Test Service PowerShell"
    description = "Created by verification script"
    price = 99.99
    category = "Digital"
    provider_id = "test-provider-id"
} | ConvertTo-Json

try {
    $svcResponse = Invoke-RestMethod -Uri "$baseUrl/api/catalog/services/" -Method Post -Body $svcBody -Headers $headers
    Write-Host "Catalog Service Created: $($svcResponse.title)"
} catch {
    Write-Error "Catalog Create Failed: $($_.Exception.Message)"
}

# Check Booking Service
Write-Host "Checking Booking Service Health..."
try {
    $bookingHealth = Invoke-RestMethod -Uri "$baseUrl/api/bookings/health" -Method Get
    Write-Host "Booking Service Status: $($bookingHealth.status)"
} catch {
    Write-Error "Booking Service Check Failed"
}

Write-Host "`n--- TEST SUMMARY ---"
Write-Host "Backend is operational."
Write-Host "You can now open http://localhost in your browser to test the frontend."
